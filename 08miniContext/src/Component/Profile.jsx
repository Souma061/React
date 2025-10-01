import { useContext } from 'react';
import userContext from '../Context/UserContext';

function Profile() {
  const { user } = useContext(userContext);

  if (!user) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-300">
        <h2 className="text-2xl font-semibold text-white">No profile yet</h2>
        <p className="mt-2 text-sm text-slate-400">
          Add your details in the login card above and click
          <span className="mx-1 rounded-lg bg-slate-800 px-2 py-1 font-semibold text-blue-300">
            Log in
          </span>
          to reveal a personalized profile preview.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-white">Profile spotlight</h2>
      <p className="mt-3 text-sm text-slate-400">Here’s what you just submitted:</p>
      <dl className="mt-6 space-y-4 text-left">
        <div>
          <dt className="text-xs uppercase tracking-[0.4em] text-slate-500">Username</dt>
          <dd className="mt-1 text-xl font-semibold text-sky-300">{user.username}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Profile;
