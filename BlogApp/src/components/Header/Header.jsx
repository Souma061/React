import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Logo, LogoutBtn } from '../index';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
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
  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 blur-3xl h-[140px]" />
        <Container>
          <nav className="relative flex items-center justify-between gap-6 rounded-2xl border border-slate-200/70 bg-white/85 px-6 py-3 shadow-lg shadow-sky-100/40 backdrop-blur-xl">
            <Link
              to="/"
              className="flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Logo width="56px" />
            </Link>

            <ul className="flex items-center gap-1.5 text-sm">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="group relative overflow-hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:text-slate-900"
                    >
                      <span className="absolute inset-0 -z-10 scale-95 rounded-xl bg-gradient-to-r from-sky-100 via-indigo-100 to-purple-100 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
                      {item.name}
                    </button>
                  </li>
                ) : null,
              )}
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
