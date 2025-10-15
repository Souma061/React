import { Container, PostForm } from '../components';

function AddPost() {
  return (
    <div className="bg-white py-8 transition-colors duration-200 dark:bg-slate-950">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
