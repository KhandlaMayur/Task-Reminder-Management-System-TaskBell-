import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how" className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <div className="how-steps-container">
          <ol className="how-steps">
            <li><strong>Step 1:</strong> Create an account</li>
            <li><strong>Step 2:</strong> Add tasks & set reminders</li>
            <li><strong>Step 3:</strong> Receive notifications</li>
            <li><strong>Step 4:</strong> Track progress on dashboard</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
