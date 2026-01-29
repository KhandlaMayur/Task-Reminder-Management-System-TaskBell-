import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-left">
          <h1>Keep your tasks tidy — remember what matters.</h1>
          <p className="lead">A minimal, clean task and reminder manager designed for focus and calm.</p>
          <div className="hero-actions">
            <button className="btn primary">Get Started</button>
            <button className="btn ghost">Learn More</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-mock">
            {/* Placeholder for a decorative image or mockup */}
          </div>
        </div>
      </div>
    </section>
  );
}
