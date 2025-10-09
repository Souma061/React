// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import authService from '../Appwrite/auth';
// import { login as authLogin } from '../store/authSlice';
// import { Button, Input, Logo } from './index.js';

// function SignUp() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();
//   const [error, setError] = useState('');

//   const signUp = async (data) => {
//     setError('');
//     try {
//       // createAccount already calls login internally, so session is returned
//       const session = await authService.createAccount(data);
//       if (session) {
//         // Get user data from the active session
//         const user = await authService.getCurrentUser();
//         if (user) {
//           dispatch(authLogin({ user }));
//           navigate('/');
//         } else {
//           setError('Account created but unable to fetch user details');
//         }
//       } else {
//         setError('Unable to create account. Please try again.');
//       }
//     } catch (error) {
//       // Handle specific Appwrite errors
//       if (error.code === 409) {
//         setError('An account with this email already exists');
//       } else if (error.code === 400) {
//         setError('Invalid email or password format');
//       } else {
//         setError(error.message || 'Unable to create account. Please try again.');
//       }
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-12">
//       <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
//         <div className="border-b border-white/10 bg-white/5 px-10 py-6 text-center">
//           <span className="mx-auto mb-4 inline-block w-24 cursor-pointer hover:scale-105 transition-transform duration-200">
//             <Logo width="100%" />
//           </span>
//           <h2 className="text-3xl font-semibold text-white">Create your account</h2>
//           <p className="mt-3 text-sm text-white/70">
//             Already have an account?{' '}
//             <Link
//               to="/login"
//               className="font-medium text-teal-300 hover:text-teal-200 cursor-pointer underline-offset-2 hover:underline transition-colors duration-200"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>

//         <div className="px-10 py-8">
//           {error && (
//             <p className="mb-6 rounded-lg border border-red-400 bg-red-50/90 px-4 py-3 text-sm text-red-600">
//               {error}
//             </p>
//           )}

//           <form onSubmit={handleSubmit(signUp)} className="space-y-5">
//             <Input
//               label="Full name"
//               type="text"
//               placeholder="Jane Doe"
//               className="bg-white/80 cursor-text focus:cursor-text hover:bg-white/90 transition-colors duration-200"
//               {...register('name', { required: 'Name is required' })}
//             />
//             <Input
//               label="Email"
//               type="email"
//               placeholder="you@example.com"
//               className="bg-white/80 cursor-text focus:cursor-text hover:bg-white/90 transition-colors duration-200"
//               {...register('email', {
//                 required: 'Email is required',
//                 validate: {
//                   matchPattern: (v) =>
//                     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
//                     'Please enter a valid email',
//                 },
//               })}
//             />
//             <Input
//               label="Password"
//               type="password"
//               placeholder="Minimum 6 characters"
//               className="bg-white/80 cursor-text focus:cursor-text hover:bg-white/90 transition-colors duration-200"
//               {...register('password', {
//                 required: 'Password is required',
//                 validate: {
//                   minLength: (v) => v.length >= 6 || 'Password must be at least 6 characters',
//                 },
//               })}
//             />

//             <div className="pt-4">
//               <Button
//                 type="submit"
//                 className="w-full rounded-xl bg-teal-500 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400 hover:shadow-teal-400/40 cursor-pointer hover:scale-105 transform duration-200"
//               >
//                 Create Account
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../Appwrite/auth';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ mode: 'onBlur' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const signUp = async (data) => {
    setError('');
    try {
      const session = await authService.createAccount(data);
      if (!session) {
        setError('Unable to create account. Please try again.');
        return;
      }
      const user = await authService.getCurrentUser();
      if (!user) {
        setError('Account created but unable to fetch user details.');
        return;
      }
      dispatch(authLogin({ user }));
      navigate('/');
    } catch (err) {
      if (err?.code === 409) setError('An account with this email already exists.');
      else if (err?.code === 400) setError('Invalid email or password format.');
      else setError(err?.message || 'Unable to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-12">
      <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-300">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center border-b border-white/10 bg-white/5 px-10 py-10 text-center md:border-b-0 md:border-r">
            <span className="mb-6 inline-block w-24 cursor-pointer transition-transform duration-200 hover:scale-105">
              <Logo width="100%" />
            </span>
            <h2 className="text-3xl font-semibold text-white">Create your account</h2>
            <p className="mt-4 text-sm text-white/70">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-teal-300 underline-offset-2 transition-colors duration-200 hover:text-teal-200 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="px-10 py-10">
            {error && (
              <p className="mb-6 flex items-center gap-2 rounded-lg border border-red-400 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <span className="text-lg">⚠️</span>
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit(signUp)} className="space-y-5">
              <Input
                label="Full name"
                type="text"
                placeholder="Jane Doe"
                className="bg-white/80 cursor-text transition-colors duration-200 hover:bg-white/90 focus:cursor-text"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
              />

              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                className="bg-white/80 cursor-text transition-colors duration-200 hover:bg-white/90 focus:cursor-text"
                {...register('email', {
                  required: 'Email is required',
                  validate: {
                    matchPattern: (v) =>
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      'Please enter a valid email',
                  },
                })}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                className="bg-white/80 cursor-text transition-colors duration-200 hover:bg-white/90 focus:cursor-text"
                {...register('password', {
                  required: 'Password is required',
                  validate: {
                    minLength: (v) => v.length >= 6 || 'Password must be at least 6 characters',
                  },
                })}
                suffix={
                  <button
                    type="button"
                    className="text-sm font-medium text-teal-300 transition-colors duration-200 hover:text-teal-200"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                }
                error={errors.password?.message}
              />

              <Input
                label="Confirm password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                className="bg-white/80 cursor-text transition-colors duration-200 hover:bg-white/90 focus:cursor-text"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                })}
                error={errors.confirmPassword?.message}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-teal-500 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-teal-500/30 transition duration-200 hover:scale-105 hover:bg-teal-400 hover:shadow-teal-400/40 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Creating account…' : 'Create Account'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
