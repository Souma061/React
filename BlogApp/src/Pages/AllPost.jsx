import { useEffect, useState } from 'react';
import appwriteService from '../Appwrite/configurations';
import { Container, PostCard } from '../components';

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService
      .listPosts()
      .then((response) => {
        if (response && response.documents) {
          setPosts(response.documents);
        } else {
          setPosts([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setPosts([]);
      });
  }, []);

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

export default AllPost;
