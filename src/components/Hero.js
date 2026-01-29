import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-left">
          <h1>Manage Tasks. Set Smart Reminders. Stay Productive.</h1>
          <p className="lead">A modern task and reminder management system that helps you organize work, never miss deadlines, and improve productivity.</p>
          <div className="hero-actions">
            <button className="btn primary">Get Started</button>
            <button className="btn ghost">View Demo</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-image">
            {/* Add your image here: <img src="/hero-image.png" alt="TaskBell Dashboard" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
