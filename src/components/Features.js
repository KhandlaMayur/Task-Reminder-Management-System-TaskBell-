import React from 'react';

const Feature = ({ title, children }) => (
  <div className="feature-card">
    <h4>{title}</h4>
    <p>{children}</p>
  </div>
);

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="features-grid">
        <Feature title="Organize">Group tasks, set priorities and tag with contexts.</Feature>
        <Feature title="Reminders">Set quick reminders with time and repeat options.</Feature>
        <Feature title="Focus">Beautiful minimal UI designed to reduce noise.</Feature>
      </div>
    </section>
  );
}
