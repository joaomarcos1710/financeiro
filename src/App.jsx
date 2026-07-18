import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import ContasFixas from './pages/ContasFixas';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="app" data-theme={theme}>
      <Routes>
        <Route path="/" element={<Dashboard theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/contas-fixas" element={<ContasFixas theme={theme} onThemeToggle={toggleTheme} />} />
      </Routes>
    </div>
  );
}

export default App;
