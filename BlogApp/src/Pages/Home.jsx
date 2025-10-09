import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-full py-20">
          <Container>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center max-w-2xl mx-auto">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
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
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                  Welcome to Your Blog
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Your creative space awaits! Start sharing your thoughts, stories, and ideas with
                  the world.
                </p>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Ready to get started?
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Create your first post and begin your blogging journey.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/add-post"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
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
                    </a>
                    <a
                      href="/all-posts"
                      className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:scale-105 transform"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
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
                    </a>
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
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full py-12">
        <Container>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Latest Posts</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing stories, insights, and ideas from our community of writers.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((post) => (
              <div key={post.$id} className="transform hover:scale-105 transition-all duration-300">
                <PostCard {...post} />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Have something to share?
              </h3>
              <p className="text-gray-600 mb-6">
                Join our community and share your unique perspective with the world.
              </p>
              <a
                href="/add-post"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md cursor-pointer"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Write a New Post
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
