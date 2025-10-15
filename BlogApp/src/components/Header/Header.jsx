import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../../store/themeSlice';
import { Container, Logo, LogoutBtn } from '../index';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 blur-3xl h-[140px] dark:from-slate-800/40 dark:via-transparent dark:to-purple-800/30" />
        <Container>
          <nav className="relative flex items-center justify-between gap-6 rounded-2xl border border-slate-200/70 bg-white/85 px-6 py-3 shadow-lg shadow-sky-100/40 backdrop-blur-xl transition-colors duration-300 dark:border-slate-700/70 dark:bg-slate-900/80 dark:shadow-slate-900/40">
            <Link
              to="/"
              className="flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Logo width="56px" />
            </Link>

            <ul className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-200">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={() => navigate(item.slug)}
                      className="group relative overflow-hidden rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                    >
                      <span className="absolute inset-0 -z-10 scale-95 rounded-xl bg-gradient-to-r from-sky-100 via-indigo-100 to-purple-100 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 dark:from-slate-700/60 dark:via-purple-800/50 dark:to-purple-900/40" />
                      {item.name}
                    </button>
                  </li>
                ) : null,
              )}
              <li key="theme-toggle">
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                  aria-label="Toggle dark mode"
                >
                  <span className="absolute inset-0 -z-10 scale-95 rounded-xl bg-gradient-to-r from-slate-100 via-indigo-100 to-slate-200 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900" />
                  {themeMode === 'dark' ? (
                    <>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0012 17a7 7 0 009-4.21z" />
                      </svg>
                      <span className="hidden sm:inline">Light</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v2m3.536.464l-1.414 1.414M21 12h-2m-.464 3.536l-1.414-1.414M12 19v2m-3.536-.464l1.414-1.414M5 12H3m.464-3.536l1.414 1.414"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span className="hidden sm:inline">Dark</span>
                    </>
                  )}
                </button>
              </li>
              {authStatus && (
                <li key="logout" className="pl-1">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
