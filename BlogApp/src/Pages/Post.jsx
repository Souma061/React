import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import appwriteService from '../Appwrite/configurations';
import { Button, Container } from '../components';
import { deletePost as removePost, setCurrentPost, setError, setLoading } from '../store/PostSlice';

export default function Post() {
  // const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentPost: post, loading, error } = useSelector((state) => state.post);
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // useEffect(() => {
  //   if (slug) {
  //     appwriteService
  //       .getPost(slug)
  //       .then((post) => {
  //         if (post) setPost(post);
  //         else navigate('/');
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching post:', error);
  //         navigate('/');
  //       });
  //   } else navigate('/');
  // }, [slug, navigate]);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        dispatch(setLoading(true));
        try {
          const fetchedPost = await appwriteService.getPost(slug);
          if (fetchedPost) {
            dispatch(setCurrentPost(fetchedPost));
          } else {
            dispatch(setError('Post not found'));
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching post:', error);
          dispatch(setError(error.message || 'Failed to fetch post'));
          navigate('/');
        }
      };

      fetchPost(); // This line was missing!
    }
  }, [slug, navigate, dispatch]);

  // const deletePost = () => {
  //   appwriteService
  //     .deletePost(post.$id)
  //     .then((status) => {
  //       if (status) {
  //         appwriteService.deleteFile(post.featuredImage);
  //         navigate('/');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting post:', error);
  //     });
  // };

  const handleDeleteConfirmed = async () => {
    if (!post) return;
    try {
      const deleted = await appwriteService.deletePost(post.$id);
      if (deleted) {
        await appwriteService.deleteFile(post.featuredImage);
        dispatch(removePost(post.$id));
        navigate('/');
      }
    } catch (error) {
      dispatch(setError(error.message || 'Failed to delete post'));
    } finally {
      setShowConfirmDelete(false);
    }
  };

  const handleDeleteClick = () => setShowConfirmDelete(true);

  const handleCancelDelete = () => setShowConfirmDelete(false);
  if (loading) {
    return (
      <div className="bg-white py-8 transition-colors duration-200 dark:bg-slate-950">
        <Container>
          <div className="text-center text-gray-700 dark:text-slate-200">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400"></div>
            <p className="text-gray-600 dark:text-slate-400">Loading post...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-8 transition-colors duration-200 dark:bg-slate-950">
        <Container>
          <div className="text-center text-gray-700 dark:text-slate-200">
            <p className="mb-4 text-red-600 dark:text-red-400">Error: {error}</p>
            <Link
              to="/"
              className="cursor-pointer text-blue-600 hover:underline dark:text-blue-400"
            >
              Go back to home
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="bg-white py-8 transition-colors duration-200 dark:bg-slate-950">
      <Container>
        <div className="relative mx-auto mb-8 w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 shadow-xl shadow-slate-200/40 backdrop-blur-sm transition-colors duration-200 dark:border-slate-700/70 dark:bg-slate-900/70 dark:shadow-slate-900/50">
          {post.featuredImage ? (
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="h-80 w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02] md:h-[26rem]"
              onError={(e) => {
                console.error('Image failed to load:', e);
                console.log('File View URL:', appwriteService.getFileView(post.featuredImage));
                console.log('Featured Image ID:', post.featuredImage);
                // Try fallback to download URL
                e.target.src = appwriteService.getFileDownload(post.featuredImage);
              }}
              onLoad={() => {
                console.log('Image loaded successfully with getFileView');
              }}
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-slate-800">
              <span className="text-gray-500 dark:text-slate-400">No image available</span>
            </div>
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="mx-auto mb-6 w-full max-w-4xl px-2 text-center md:px-6">
          <h1 className="text-3xl font-bold text-slate-800 md:text-4xl dark:text-slate-100">
            {post.title}
          </h1>
        </div>
        <div className="browser-css mx-auto max-w-4xl rounded-3xl bg-white/70 p-6 text-slate-800 shadow-lg shadow-slate-200/40 backdrop-blur-sm transition-colors duration-200 dark:bg-slate-900/70 dark:text-slate-100 dark:shadow-slate-900/40">
          {parse(post.content)}
        </div>
      </Container>
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-slate-800 shadow-xl transition-colors duration-200 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-900/60">
            <h2 className="mb-2 text-lg font-semibold">Confirm deletion</h2>
            <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
              This action cannot be undone. The post and its media will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                bgColor="bg-gray-200 dark:bg-slate-800"
                textColor="text-slate-700 dark:text-slate-200"
                onClick={handleCancelDelete}
              >
                Cancel
              </Button>
              <Button bgColor="bg-red-500" onClick={handleDeleteConfirmed}>
                Delete post
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
