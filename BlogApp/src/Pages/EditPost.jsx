import React,{useEffect} from 'react'
import { Container,PostForm } from '../components'
import appwriteService from '../Appwrite/configurations'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function EditPost() {
  const [posts,setPosts] = React.useState(null)
  const [loading, setLoading] = React.useState(true);
  const {slug} = useParams()
  const navigate = useNavigate()
useEffect(() => {
  if (slug) {
    appwriteService.getPost(slug).then((post) => {
      if (post) {
        setPosts(post);
      }
      setLoading(false); // Set loading to false when the fetch is done
    });
  } else {
    navigate('/');
  }
}, [slug, navigate]);
if (loading) {
  return (
    <div className="w-full py-10 text-center">
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  );
}

return posts ? (
  <Container>
    <PostForm post={posts} />
  </Container>
) : (
  <div className="w-full py-10 text-center">
    <h1 className="text-2xl font-bold">Post not found.</h1>
  </div>
);

}

export default EditPost
