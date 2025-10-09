import parse from 'html-react-parser';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import appwriteService from '../Appwrite/configurations';
import { Button, Container } from '../components';
import { setCurrentPost, setError, setLoading } from '../store/PostSlice';

export default function Post() {
  // const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentPost: post, loading, error } = useSelector((state) => state.post);
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
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

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const status = await appwriteService.deletePost(post.$id);
        if (status) {
          await appwriteService.deleteFile(post.featuredImage);
          dispatch(deletePost(post.$id));
          navigate('/');
        }
      } catch (error) {
        dispatch(setError(error.message || 'Failed to delete post'));
      }
    }
  };
  if (loading) {
    return (
      <div className="py-8">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading post...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <Container>
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <Link to="/" className="text-blue-600 hover:underline cursor-pointer">
              Go back to home
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="relative mx-auto mb-8 w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white/60 shadow-xl shadow-slate-200/40 backdrop-blur-sm">
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
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="mx-auto mb-6 w-full max-w-4xl px-2 text-center md:px-6">
          <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">{post.title}</h1>
        </div>
        <div className="browser-css mx-auto max-w-4xl rounded-3xl bg-white/70 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-sm">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
