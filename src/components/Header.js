import React, { useState, useEffect } from 'react';

export default function Header({ onNavigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 900) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  };

  const handleAuthClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="site-header sticky">
      <div className="container header-inner">
        <div className="left">
          <div className="logo" aria-hidden>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#4aa0a5" />
              <path d="M8 12l2.2 2.2L16 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="brand">TaskBell</div>
        </div>

        <button className="hamburger" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span className={open ? 'bar open' : 'bar'}></span>
          <span className={open ? 'bar open' : 'bar'}></span>
          <span className={open ? 'bar open' : 'bar'}></span>
        </button>

        <nav className={open ? 'nav nav-open' : 'nav'}>
          <a href="#home" onClick={(e) => handleNav(e, 'home')}>Home</a>
          <a href="#features" onClick={(e) => handleNav(e, 'features')}>Features</a>
          <a href="#how" onClick={(e) => handleNav(e, 'how')}>How It Works</a>
          <a href="#about" onClick={(e) => handleNav(e, 'about')}>About Us</a>
          <a href="#contact" onClick={(e) => handleNav(e, 'contact')}>Contact</a>
        </nav>

        <div className={open ? 'actions actions-open' : 'actions'}>
          <button className="btn ghost" onClick={() => handleAuthClick('login')}>Login</button>
          <button className="btn primary" onClick={() => handleAuthClick('register')}>Sign Up</button>
        </div>
      </div>
    </header>
  );
}
