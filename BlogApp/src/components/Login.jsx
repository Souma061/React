import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../Appwrite/auth';
import { login as authLogin } from '../store/authSlice';
import { loginSchema } from '../utlis/loginSchema';
import { Button, Input, Logo } from './index.js';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ resolver: zodResolver(loginSchema), mode: 'onBlur' });

  const login = async ({ email, password }) => {
    try {
      clearErrors('root');
      const session = await authService.login({ email, password });
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(authLogin({ user }));
          navigate('/');
        } else {
          setError('root', {
            type: 'server',
            message: 'Login succeeded but user details are unavailable.',
          });
        }
      }
    } catch (error) {
      if (error?.code === 401)
        setError('root', { type: 'server', message: 'Invalid email or password.' });
      else if (error?.code === 429)
        setError('root', { type: 'server', message: 'Too many attempts. Please retry later.' });
      else
        setError('root', {
          type: 'server',
          message: error?.message || 'Something went wrong. Please try again later.',
        });
    }
  };
  return (
    <div className="flex w-full items-center justify-center bg-white py-8 transition-colors duration-200 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-100 p-10 text-slate-800 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60 dark:text-slate-400">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 transition-all duration-200 hover:underline dark:text-blue-400"
          >
            Sign Up
          </Link>
        </p>
        {errors.root?.message && (
          <p className="my-2 text-center text-sm text-red-500 dark:text-red-400">
            {errors.root.message}
          </p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-4 space-y-4">
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              error={errors.password?.message}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
