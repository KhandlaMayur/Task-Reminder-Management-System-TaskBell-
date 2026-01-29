import React from 'react';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">Task & Reminder</div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#tasks">Tasks</a>
          <a href="#reminders">Reminders</a>
        </nav>
        <div className="cta">
          <button className="btn primary">Create Task</button>
        </div>
      </div>
    </header>
  );
}
