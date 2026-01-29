import React from 'react';

export default function UseCases() {
  return (
    <section id="use-cases" className="use-cases">
      <div className="container">
        <h2>Use Cases</h2>
        <div className="cases-grid">
          <div className="case-card">
            <h4>👨‍🎓 For Students</h4>
            <ul>
              <li>Assignment reminders</li>
              <li>Exam schedules</li>
            </ul>
          </div>
          <div className="case-card">
            <h4>👨‍💼 For Professionals</h4>
            <ul>
              <li>Meetings</li>
              <li>Project deadlines</li>
            </ul>
          </div>
          <div className="case-card">
            <h4>👥 For Teams</h4>
            <ul>
              <li>Shared tasks</li>
              <li>Collaborative reminders</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
