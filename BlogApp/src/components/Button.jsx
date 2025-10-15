function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-500',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      className={`transform rounded-lg px-4 py-2 transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${bgColor} ${textColor} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
