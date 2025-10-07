import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../../Appwrite/configurations.js';
import { Button, Input, RTE, Select } from '../index.js';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'draft',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const submit = async (data) => {
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form data:', data);
    console.log('Featured Image:', data.featuredImage);
    console.log('User data:', userData);

    try {
      if (post) {
        console.log('UPDATE MODE');

        // Check if new file is uploaded
        let newFileId = null;
        if (data.featuredImage && data.featuredImage.length > 0) {
          console.log('Uploading new file for update...');
          const uploadedFile = await appwriteService.uploadFile(data.featuredImage[0]);
          if (uploadedFile) {
            newFileId = uploadedFile.$id;
            // Delete old file
            await appwriteService.deleteFile(post.featuredImage);
          }
        }

        // Update post
        const updateData = {
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage: newFileId || post.featuredImage, // Keep old image if no new one
          status: data.status,
          userId: userData.$id,
        };

        console.log('Updating post with:', updateData);
        const updatedPost = await appwriteService.updatePost(post.$id, updateData);
        console.log('Update result:', updatedPost);

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        } else {
          alert('Post update failed');
        }
      } else {
        console.log('CREATE MODE');

        // Validate file
        if (!data.featuredImage || data.featuredImage.length === 0) {
          console.log('ERROR: No file selected');
          alert('Please select a featured image');
          return;
        }

        const fileToUpload = data.featuredImage[0];
        console.log('File to upload:', fileToUpload);

        // Upload file
        console.log('Uploading file...');
        const uploadedFile = await appwriteService.uploadFile(fileToUpload);
        console.log('Upload result:', uploadedFile);

        if (!uploadedFile) {
          alert('File upload failed');
          return;
        }

        // Create post
        const postData = {
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage: uploadedFile.$id,
          status: data.status,
          userId: userData.$id, // Changed from userID to userId
        };

        console.log('Creating post with:', postData);
        const newPost = await appwriteService.createPost(postData);
        console.log('Post creation result:', newPost);

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        } else {
          alert('Post creation failed');
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error: ' + error.message);
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
    return '';
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title' && !post) {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => subscription.unsubscribe(); // for memory management and also for cleanup.it is important for interview aspect.
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className="w-1/3 px-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">Featured Image :</label>
        <Controller
          name="featuredImage"
          control={control}
          rules={{ required: !post }}
          render={({ field: { onChange, value, ...field } }) => (
            <input
              {...field}
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                onChange(e.target.files);
              }}
            />
          )}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('status', { required: true })}
        />
        <Button type="submit" bgColor={post ? 'bg-green-500' : undefined} className="w-full">
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
