import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../Appwrite/configurations';
import { Container, PostForm } from '../components';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }

    const loadPost = async () => {
      try {
        const fetchedPost = await appwriteService.getPost(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="w-full bg-white py-10 text-center text-slate-700 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-200">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full bg-white py-10 text-center text-slate-700 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-200">
        <h1 className="text-2xl font-bold">Post not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 transition-colors duration-200 dark:bg-slate-950">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
