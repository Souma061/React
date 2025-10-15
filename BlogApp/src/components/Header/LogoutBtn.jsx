import { useDispatch } from 'react-redux';
import authService from '../../Appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logOut()
      .then(() => {
        dispatch(logout());
        window.location.reload();
      })
      .catch((err) => {
        console.log('LogoutBtn.jsx :: logoutHandler :: err', err);
      });
  };
  return (
    <button
      className="transform rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-red-600 hover:to-red-700 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 dark:shadow-slate-900/60"
      onClick={logoutHandler}
    >
      <span className="flex items-center">
        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
        Logout
      </span>
    </button>
  );
}

export default LogoutBtn;
