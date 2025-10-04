import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './Appwrite/auth';
import { Footer, Header } from './components/index.js';
// import Login from './components/Login.jsx';
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log('App.jsx :: useEffect :: err', err);
        // Still dispatch logout for failed auth
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="bg-gray-100 min-h-screen">
      <div>
        <Header />
        {/* <Login /> */}
        <Footer />
      </div>
    </div>
  ) : (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  );
}

export default App;
