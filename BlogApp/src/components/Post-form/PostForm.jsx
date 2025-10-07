import { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../../Appwrite/configurations';
import { Button, Input, RTE, Select } from '../index';
import { addPost, updatePost, setError } from '../../store/PostSlice';

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  // const watchedTitle = watch('title', '');

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');

    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      console.log('=== FORM SUBMISSION STARTED ===');
      console.log('Form data:', data);
      console.log('Featured Image:', data.featuredImage);
      console.log('User data:', userData);

      if (post) {
        // UPDATE MODE
        console.log('UPDATE MODE');
        let file = null;

        if (data.featuredImage && data.featuredImage[0]) {
          console.log('Uploading new image...');
          file = await appwriteService.uploadFile(data.featuredImage[0]);
          if (file && post.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }
        }

        const updatedPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (updatedPost) {
          dispatch(updatePost(updatedPost));
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        // CREATE MODE
        console.log('CREATE MODE');

        if (!data.featuredImage || !data.featuredImage[0]) {
          dispatch(setError('Please select a featured image for your post'));
          return;
        }

        console.log('File to upload:', data.featuredImage[0]);
        console.log('Uploading file...');

        const file = await appwriteService.uploadFile(data.featuredImage[0]);
        console.log('Upload result:', file);

        if (file) {
          const fileId = file.$id;
          console.log('Creating post with:', {
            title: data.title,
            slug: data.slug,
            content: data.content,
            featuredImage: fileId,
            status: data.status,
            userId: userData.$id,
          });

          const newPost = await appwriteService.createPost({
            ...data,
            featuredImage: fileId,
            userId: userData.$id,
          });

          console.log('Post creation result:', newPost);

          if (newPost) {
            dispatch(addPost(newPost));
            navigate(`/post/${newPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      dispatch(setError(error.message || 'Failed to submit post'));
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 cursor-text"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 cursor-text"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues('content')} />
      </div>
      <div className="w-1/3 px-2">
        <div className="mb-4">
          <label htmlFor="featuredImage" className="inline-block mb-1 pl-1 cursor-pointer">
            Featured Image :
          </label>
          <Controller
            name="featuredImage"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 cursor-pointer"
                onChange={(e) => field.onChange(e.target.files)}
              />
            )}
          />
        </div>
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4 cursor-pointer"
          {...register('status', { required: true })}
        />
        <Button type="submit" bgColor={post ? 'bg-green-500' : undefined} className="w-full cursor-pointer">
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
