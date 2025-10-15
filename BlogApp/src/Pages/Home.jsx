import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import appwriteService from '../Appwrite/configurations';
import { Container, PostCard } from '../components';
import { setError, setLoading, setPosts } from '../store/PostSlice';

function Home() {
  // const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  // useEffect(() => {
  //   appwriteService.listPosts().then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //     } else {
  //       setPosts([]);
  //     }
  //   });
  // }, []);
  useEffect(() => {
    const fetchposts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await appwriteService.listPosts();
        if (response && Array.isArray(response.documents)) {
          dispatch(
            setPosts({
              posts: response.documents,
              totalPosts: response.total || response.documents.length || 0,
            }),
          );
        } else {
          dispatch(
            setPosts({
              posts: [],
              totalPosts: 0,
            }),
          );
        }
      } catch (error) {
        dispatch(setError(error?.message || 'Failed to fetch posts'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchposts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white transition-colors duration-200 dark:bg-slate-950">
        <div className="text-center text-gray-700 dark:text-slate-200">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="text-gray-600 dark:text-slate-400">Loading posts...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white transition-colors duration-200 dark:bg-slate-950">
        <div className="text-center text-gray-700 dark:text-slate-200">
          <p className="mb-4 text-red-600 dark:text-red-400">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 transition-colors duration-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="w-full py-20">
          <Container>
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
              <div className="mx-auto max-w-2xl text-center text-slate-800 dark:text-slate-100">
                <div className="mb-8">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <svg
                      className="h-12 w-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-800 md:text-5xl dark:text-slate-100">
                  Welcome to Your Blog
                </h1>
                <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-slate-400">
                  Your creative space awaits! Start sharing your thoughts, stories, and ideas with
                  the world.
                </p>
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900">
                  <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-slate-100">
                    Ready to get started?
                  </h2>
                  <p className="mb-6 text-gray-500 dark:text-slate-400">
                    Create your first post and begin your blogging journey.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                      to="/add-post"
                      className="inline-flex cursor-pointer items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-purple-700"
                    >
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        ></path>
                      </svg>
                      Create Your First Post
                    </Link>
                    <Link
                      to="/all-posts"
                      className="inline-flex transform cursor-pointer items-center rounded-lg border-2 border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700"
                    >
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        ></path>
                      </svg>
                      View All Posts
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 transition-colors duration-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full py-12">
        <Container>
          {/* Hero Section */}
          <div className="mb-16 text-center text-slate-800 dark:text-slate-100">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl dark:text-slate-100">
              Latest Posts
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-slate-400">
              Discover amazing stories, insights, and ideas from our community of writers.
            </p>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <div key={post.$id} className="transform transition-all duration-300 hover:scale-105">
                <PostCard {...post} />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 text-slate-800 shadow-lg transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-slate-100">
                Have something to share?
              </h3>
              <p className="mb-6 text-gray-600 dark:text-slate-400">
                Join our community and share your unique perspective with the world.
              </p>
              <Link
                to="/add-post"
                className="inline-flex cursor-pointer items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-purple-700"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Write a New Post
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
