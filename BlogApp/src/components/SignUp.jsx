import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../Appwrite/auth';
import { login as authLogin } from '../store/authSlice';
import { signUpSchema } from '../utlis/signupSchema';
import { Button, Input, Logo } from './index.js';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ mode: 'onBlur', resolver: zodResolver(signUpSchema) });

  const signUp = async ({ email, password, name }) => {
    try {
      clearErrors('root');
      await authService.createAccount({ email, password, name });
      const user = await authService.getCurrentUser();
      if (!user) {
        setError('root', {
          type: 'server',
          message: 'Account created but unable to fetch user details.',
        });
        return;
      }
      dispatch(authLogin({ user }));
      navigate('/');
    } catch (error) {
      let message = error?.message || 'Unable to create account. Please try again.';
      if (error?.code === 429) message = 'Too many requests. Please try again later.';
      else if (error?.code === 409) message = 'An account with this email already exists.';
      else if (error?.code === 400) message = 'Invalid email or password format.';
      setError('root', { type: 'server', message });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-100 px-6 py-12 transition-colors duration-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-2xl shadow-2xl transition-all duration-300 dark:border-white/10 dark:bg-white/10">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center border-b border-slate-200/70 bg-white/60 px-10 py-10 text-center transition-colors duration-200 dark:border-white/10 dark:bg-white/5 md:border-b-0 md:border-r">
            <span className="mb-6 inline-block w-24 cursor-pointer transition-transform duration-200 hover:scale-105">
              <Logo width="100%" />
            </span>
            <h2 className="text-3xl font-semibold text-slate-800 dark:text-white">
              Create your account
            </h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-white/70">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-teal-600 underline-offset-2 transition-colors duration-200 hover:text-teal-500 hover:underline dark:text-teal-300 dark:hover:text-teal-200"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="px-10 py-10">
            {errors.root?.message && (
              <p className="mb-6 flex items-center gap-2 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-600 dark:border-red-400 dark:bg-red-500/10 dark:text-red-200">
                <span className="text-lg">⚠️</span>
                {errors.root.message}
              </p>
            )}

            <form onSubmit={handleSubmit(signUp)} className="space-y-5">
              <Input
                label="Full name"
                type="text"
                placeholder="Jane Doe"
                className="cursor-text bg-white/80 transition-colors duration-200 hover:bg-white/90 focus:cursor-text dark:bg-slate-800/80 dark:hover:bg-slate-800"
                {...register('name')}
                error={errors.name?.message}
              />

              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                className="cursor-text bg-white/80 transition-colors duration-200 hover:bg-white/90 focus:cursor-text dark:bg-slate-800/80 dark:hover:bg-slate-800"
                {...register('email')}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                className="cursor-text bg-white/80 transition-colors duration-200 hover:bg-white/90 focus:cursor-text dark:bg-slate-800/80 dark:hover:bg-slate-800"
                {...register('password')}
                suffix={
                  <button
                    type="button"
                    className="text-sm font-medium text-teal-600 transition-colors duration-200 hover:text-teal-500 dark:text-teal-300 dark:hover:text-teal-200"
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
                className="cursor-text bg-white/80 transition-colors duration-200 hover:bg-white/90 focus:cursor-text dark:bg-slate-800/80 dark:hover:bg-slate-800"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-teal-500 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-teal-500/30 transition duration-200 hover:scale-105 hover:bg-teal-400 hover:shadow-teal-400/40 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-teal-500 dark:hover:bg-teal-400"
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
