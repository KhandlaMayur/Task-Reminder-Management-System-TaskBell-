import React from 'react';

const Feature = ({ title, children, icon }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{children}</p>
  </div>
);

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2>Features</h2>
        <div className="features-grid">
          <Feature title="Smart Reminders" icon="🔔">Get real-time notifications via browser or email.</Feature>
          <Feature title="Task Management" icon="📝">Create, update, prioritize, and track tasks easily.</Feature>
          <Feature title="Productivity Analytics" icon="📊">Visual reports to track your performance.</Feature>
          <Feature title="Secure & Reliable" icon="🔒">JWT authentication and encrypted data storage.</Feature>
        </div>
      </div>
    </section>
  );
}
