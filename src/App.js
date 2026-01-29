import React from 'react';
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

function App() {
  return (
    <div className="app-root">
      <Header />
      <Hero />
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
