import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appwriteService from '../Appwrite/configurations';
import { Container, PostCard } from '../components';
import { setError, setLoading, setPosts } from '../store/PostSlice';

function AllPost() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  useEffect(() => {
    const fetchposts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await appwriteService.listPosts();
        if (response) {
          dispatch(
            setPosts({
              posts: response.documents,
              totalPosts: response.total || 0,
            }),
          );
        }
      } catch (error) {
        dispatch(setError(error.message || 'Failed to fetch posts'));
      }
      dispatch(setLoading(false));
    };

    fetchposts();
  }, [dispatch]);
  if (loading) {
    return (
      <div className="bg-white py-8 transition-colors duration-200 dark:bg-slate-950">
        <Container>
          <div className="text-center text-gray-700 dark:text-slate-200">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400"></div>
            <p className="text-gray-600 dark:text-slate-400">Loading posts...</p>
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
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full bg-white py-10 transition-colors duration-200 dark:bg-slate-950">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id} className="col-span-1">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

// export default AllPost;

//         if (response && response.documents) {
//           setPosts(response.documents);
//         } else {
//           setPosts([]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching posts:', error);
//         setPosts([]);
//       });
//   }, []);

//   return (
//     <div className="w-full py-10">
//       <Container>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {posts.map((post) => (
//             <div key={post.$id} className="col-span-1">
//               <PostCard {...post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }

export default AllPost;
