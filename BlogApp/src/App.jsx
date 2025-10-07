import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './Appwrite/auth';
import { Footer, Header } from './components/index.js';
// import Login from './components/Login.jsx';
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const user = await authService.getCurrentUser();
        if (user) {
          console.log('User authenticated:', user.email);
          dispatch(login({ user }));
        } else {
          console.log('No authenticated user found');
          dispatch(logout());
        }
      } catch (error) {
        console.log('App.jsx :: useEffect :: error', error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  ) : (
    // Loading State
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading...</h2>
        <p className="text-gray-500">Preparing your blog experience</p>
      </div>
    </div>
  );
}

export default App;
