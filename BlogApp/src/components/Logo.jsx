function Logo({ width = '140px', showText = true }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        width={width}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_10px_30px_rgba(56,189,248,0.35)]"
      >
        <defs>
          <linearGradient id="logoGradient" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="55%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <linearGradient id="logoAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ecfeff" />
            <stop offset="100%" stopColor="#cffafe" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="112" height="112" rx="28" fill="url(#logoGradient)" />
        <path
          d="M36 80c0-16 12-28 28-28h16c4.4 0 8 3.6 8 8s-3.6 8-8 8H70c-4.4 0-8 3.6-8 8s3.6 8 8 8h10"
          stroke="white"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36 40h38c3.3 0 6 2.7 6 6v0c0 3.3-2.7 6-6 6H36c-3.3 0-6-2.7-6-6v0c0-3.3 2.7-6 6-6z"
          fill="url(#logoAccent)"
          stroke="white"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="92" cy="36" r="8" fill="#ecfeff" stroke="white" strokeWidth="3" />
      </svg>
      {showText && (
        <span className="hidden sm:inline-block font-black text-xl tracking-tight text-slate-800">
          <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Post
          </span>
          <span className="text-teal-400">Mee</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
