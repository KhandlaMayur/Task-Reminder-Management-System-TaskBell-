import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <strong>Task & Reminder</strong>
            <p>Built for calm and focus. Manage tasks, not chaos.</p>
          </div>
          <div>
            <h5>Links</h5>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#tasks">Tasks</a></li>
              <li><a href="#reminders">Reminders</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-copy">© 2026 Task & Reminder — All rights reserved.</div>
      </div>
    </footer>
  );
}
