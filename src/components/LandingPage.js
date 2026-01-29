import React, { useState } from 'react';
import '../styles/landing.css';

export default function LandingPage({ onNavigate, userName = 'Mayur' }) {
  const [tasksCreated, setTasksCreated] = useState(0);

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('sessionActive');
    if (onNavigate) onNavigate('home');
  };

  const handleCreateTask = () => {
    alert('Create Task feature coming soon!');
  };

  const handleSetReminder = () => {
    alert('Set Reminder feature coming soon!');
  };

  const handleViewTasks = () => {
    alert('View Tasks feature coming soon!');
  };

  const handleViewProgress = () => {
    alert('View Progress feature coming soon!');
  };

  return (
    <div className="landing-page">
      {/* Header with Logout */}
      <header className="landing-header">
        <div className="landing-container">
          <div className="landing-brand">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#4aa0a5" />
              <path d="M8 12l2.2 2.2L16 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>TaskBell</span>
          </div>
          <button className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="landing-main">
        {/* 1️⃣ Welcome Section */}
        <section className="landing-section welcome-section">
          <div className="landing-container">
            <div className="welcome-content">
              <h2 className="welcome-heading">👋 Welcome, {userName}</h2>
              <p className="welcome-subtitle">You're all set to start managing your tasks and reminders efficiently.</p>
            </div>
          </div>
        </section>

        {/* 2️⃣ Action Cards Section */}
        <section className="landing-section action-cards-section">
          <div className="landing-container">
            <h3 className="section-title">What You Can Do Here</h3>
            <div className="action-cards-grid">
              {/* Card 1: Create Task */}
              <div className="action-card">
                <div className="card-icon">📝</div>
                <h4>Create Your First Task</h4>
                <p>Add tasks with priority and deadlines</p>
                <button className="btn btn-primary" onClick={handleCreateTask}>
                  Create Task
                </button>
              </div>

              {/* Card 2: Set Reminder */}
              <div className="action-card">
                <div className="card-icon">⏰</div>
                <h4>Set a Reminder</h4>
                <p>Get notified before deadlines</p>
                <button className="btn btn-primary" onClick={handleSetReminder}>
                  Set Reminder
                </button>
              </div>

              {/* Card 3: View Tasks */}
              <div className="action-card">
                <div className="card-icon">📋</div>
                <h4>View All Tasks</h4>
                <p>See and manage your task list</p>
                <button className="btn btn-primary" onClick={handleViewTasks}>
                  View Tasks
                </button>
              </div>

              {/* Card 4: Track Progress */}
              <div className="action-card">
                <div className="card-icon">📊</div>
                <h4>Track Your Progress</h4>
                <p>Monitor completed and pending tasks</p>
                <button className="btn btn-primary" onClick={handleViewProgress} disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3️⃣ Getting Started Steps */}
        <section className="landing-section getting-started-section">
          <div className="landing-container">
            <h3 className="section-title">Getting Started</h3>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1️⃣</div>
                <div className="step-content">
                  <h4>Create a task</h4>
                  <p>Add your first task with a title, description, and deadline.</p>
                </div>
              </div>

              <div className="step-arrow">→</div>

              <div className="step">
                <div className="step-number">2️⃣</div>
                <div className="step-content">
                  <h4>Assign a reminder</h4>
                  <p>Set up notifications for your tasks to never miss deadlines.</p>
                </div>
              </div>

              <div className="step-arrow">→</div>

              <div className="step">
                <div className="step-number">3️⃣</div>
                <div className="step-content">
                  <h4>Receive notifications</h4>
                  <p>Stay organized with real-time alerts and stay on top of your work.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4️⃣ System Highlights */}
        <section className="landing-section highlights-section">
          <div className="landing-container">
            <h3 className="section-title">Why TaskBell?</h3>
            <div className="highlights-grid">
              <div className="highlight">
                <div className="highlight-icon">🔔</div>
                <h4>Real-time Notifications</h4>
                <p>Get instant alerts when tasks are due</p>
              </div>

              <div className="highlight">
                <div className="highlight-icon">🔒</div>
                <h4>Secure User Data</h4>
                <p>Your data is encrypted and protected</p>
              </div>

              <div className="highlight">
                <div className="highlight-icon">⚡</div>
                <h4>Fast & Responsive</h4>
                <p>Lightning-quick performance on all devices</p>
              </div>

              <div className="highlight">
                <div className="highlight-icon">🌙</div>
                <h4>Dark & Light Mode</h4>
                <p>Switch between themes anytime</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5️⃣ Empty State Message */}
        {tasksCreated === 0 && (
          <section className="landing-section empty-state-section">
            <div className="landing-container">
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>You haven't created any tasks yet</h3>
                <p>Start by creating your first task to see everything in action.</p>
                <button className="btn btn-primary" onClick={handleCreateTask}>
                  ➕ Create Task
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 6️⃣ Call to Action */}
        <section className="landing-section cta-section">
          <div className="landing-container">
            <div className="cta-content">
              <h3>Ready to get organized?</h3>
              <p>Start managing your tasks and boost your productivity today</p>
              <button className="btn btn-primary btn-large" onClick={handleCreateTask}>
                Start Managing Tasks
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <p>&copy; 2026 TaskBell. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
