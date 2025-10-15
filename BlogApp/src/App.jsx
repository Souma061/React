import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import authService from './Appwrite/auth';
import { Footer, Header } from './components/index.js';
// import Login from './components/Login.jsx';
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

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

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', themeMode);
    }
  }, [themeMode]);

  if (!loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 text-slate-700 transition-colors duration-300 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <div className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent dark:border-blue-400"></div>
        <h2 className="mb-2 text-xl font-semibold">Loading...</h2>
        <p className="text-slate-500 dark:text-slate-400">Preparing your blog experience</p>
      </div>
    </div>
  );
}

export default App;
