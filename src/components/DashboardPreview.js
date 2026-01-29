import React from 'react';

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="dashboard-preview">
      <div className="container">
        <h2>Everything You Need in One Dashboard</h2>
        <div className="dashboard-image-container">
          <p className="lead">View today's tasks

Upcoming reminders

Overdue alerts

Progress charts</p>
          <div className="dashboard-image">
            {/* Add your dashboard image here: <img src="/dashboard-preview.png" alt="TaskBell Dashboard Preview" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
