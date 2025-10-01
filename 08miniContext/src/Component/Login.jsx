// import React  from "react";
import { useContext, useState } from 'react';
import userContext from '../Context/UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser } = useContext(userContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Please add both a username and password to continue.');
      return;
    }

    setUser({ username, password });
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-6 rounded-2xl bg-slate-900/70 p-8 shadow-xl backdrop-blur"
    >
      <header className="space-y-1">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Welcome back</p>
        <h2 className="text-3xl font-semibold text-white">Sign in to your profile</h2>
        <p className="text-sm text-slate-400">
          Use a friendly username and any password to populate the profile below.
        </p>
      </header>

      <label className="space-y-2 text-left text-sm font-medium text-slate-200">
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. sarah_dev"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </label>

      <label className="space-y-2 text-left text-sm font-medium text-slate-200">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Keep it memorable"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </label>

      {errorMessage && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="mt-2 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!username || !password}
      >
        Log in
      </button>
    </form>
  );
}

export default Login;
