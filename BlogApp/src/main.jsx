import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// import { Login, Protected, Signup } from './components/index.js';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Protected from './components/AuthLayout.jsx';

import './index.css';
import AddPost from './Pages/AddPost.jsx';
import AllPosts from './Pages/AllPost.jsx';
import EditPost from './Pages/EditPost.jsx';
import Home from './Pages/Home.jsx';
import Post from './Pages/Post.jsx';
import store from './store/store.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <Protected authentication>
            {' '}
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: '/add-post',
        element: (
          <Protected authentication>
            {' '}
            <AddPost />
          </Protected>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Protected authentication>
            {' '}
            <EditPost />
          </Protected>
        ),
      },
      {
        path: '/post/:slug',
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </StrictMode>,
);
