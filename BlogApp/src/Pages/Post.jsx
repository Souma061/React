import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import appwriteService from '../Appwrite/configurations';
import { Button, Container } from '../components';

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.user);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate('/');
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
          navigate('/');
        });
    } else navigate('/');
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService
      .deletePost(post.$id)
      .then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {post.featuredImage ? (
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-xl max-w-full h-auto"
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
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
