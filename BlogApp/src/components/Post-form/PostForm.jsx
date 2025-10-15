import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../../Appwrite/configurations';
import { addPost, clearError, setError, updatePost } from '../../store/PostSlice';
import { Button, Input, RTE, Select } from '../index';

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
  const postError = useSelector((state) => state.post.error);

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
      dispatch(clearError());
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

          try {
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
          } catch (creationError) {
            console.error('Error creating post:', creationError);
            if (creationError?.code === 409) {
              dispatch(
                setError(
                  'A post with this slug already exists. Change the title or slug and try again.',
                ),
              );
            } else {
              throw creationError;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      dispatch(setError(error.message || 'Failed to submit post'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap text-slate-800 transition-colors duration-200 dark:text-slate-100"
    >
      <div className="w-full px-2 lg:w-2/3">
        {postError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
            {postError}
          </div>
        )}
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
          disabled={Boolean(post)}
          readOnly={Boolean(post)}
        />
        {post && (
          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
            Slug is generated when the post is created and can’t be changed later.
          </p>
        )}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className="w-full px-2 pt-6 lg:w-1/3 lg:pt-0">
        <div className="mb-4">
          <label
            htmlFor="featuredImage"
            className="mb-1 inline-block cursor-pointer pl-1 text-slate-700 dark:text-slate-200"
          >
            Featured Image :
          </label>
          <Controller
            name="featuredImage"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-black outline-none duration-200 focus:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
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
              className="rounded-lg border border-slate-200/60 dark:border-slate-700/60"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4 cursor-pointer"
          {...register('status', { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? 'bg-green-500' : undefined}
          className="w-full cursor-pointer"
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
