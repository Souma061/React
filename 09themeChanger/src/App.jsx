import { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/Theme';
import ThemeBtn from './comsponents/Theme';
import Card from './comsponents/Card';

function App() {
  const [theme,setTheme] = useState("light");

  const darkTheme = () => {
    setTheme("dark");
  }

  const lightTheme = () => {
    setTheme("light");
  }


  // Theme changeing function

  useEffect(() => {
    document.querySelector("html").classList.remove(theme === "light" ? "dark" : "light");

    document.querySelector("html").classList.add(theme);
  }, [theme])


  return (
  <ThemeProvider value={{theme, darkTheme, lightTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
      <div className="w-full">
        <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
          {/* Theme changer will go here */}
          <ThemeBtn />
        </div>

        <div className="w-full max-w-sm mx-auto">{/* Card will go here */}
          <Card />
        </div>
      </div>
    </div>
  </ThemeProvider>
  );
}

export default App;
