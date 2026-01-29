import React, { useState } from 'react';
import './App.css';
import './styles/theme.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import UseCases from './components/UseCases';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, login, register

  // Handle navigation from components
  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (currentPage === 'login') {
    return <Login onNavigate={handleNavigation} />;
  }

  if (currentPage === 'register') {
    return <Register onNavigate={handleNavigation} />;
  }

  return (
    <div className="app-root">
      <Header onNavigate={handleNavigation} />
      <Hero onNavigate={handleNavigation} />
      <main>
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <UseCases />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
