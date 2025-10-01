import './App.css';
import Login from './Component/Login';
import Profile from './Component/Profile';
import UserContextProvider from './Context/UserContextProvider';

function App() {
  return (
    <UserContextProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-6 py-16 md:justify-center">
          <header className="space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
              Context demo
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Share user details with React context
            </h1>
            <p className="text-base text-slate-300 md:max-w-2xl">
              Fill in the login card to instantly sync user data with the profile preview. This
              mini-project shows how context keeps your UI in lockstep without prop drilling.
            </p>
          </header>

          <section className="grid w-full gap-10 md:grid-cols-2">
            <Login />
            <Profile />
          </section>
        </main>
      </div>
    </UserContextProvider>
  );
}

export default App;
