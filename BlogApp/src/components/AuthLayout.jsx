import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    console.log('AuthLayout: checking auth status:', authStatus, 'required:', authentication);
    
    // Add a small delay to ensure auth state is properly loaded
    const timer = setTimeout(() => {
      if (authentication && !authStatus) {
        console.log('Redirecting to login - authentication required but user not logged in');
        navigate('/login');
      } else if (!authentication && authStatus) {
        console.log('Redirecting to home - user is logged in but accessing guest page');
        navigate('/');
      } else {
        console.log('Auth check passed, showing content');
      }
      setLoader(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [authStatus, navigate, authentication]);

  if (loader) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default Protected;
