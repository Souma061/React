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
      <div className="py-8">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading posts...</p>
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
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
