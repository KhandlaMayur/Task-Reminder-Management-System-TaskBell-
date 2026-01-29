import React from 'react';

function ReminderItem({ r }) {
  return (
    <div className="reminder-item">
      <div className="reminder-title">{r.title}</div>
      <div className="reminder-time">{r.time}</div>
    </div>
  );
}

export default function ReminderList({ reminders = [] }) {
  return (
    <section id="reminders" className="reminder-list">
      <h4>Upcoming Reminders</h4>
      <div className="reminders">
        {reminders.map(r => (
          <ReminderItem key={r.id} r={r} />
        ))}
      </div>
      <button className="btn ghost small">View all</button>
    </section>
  );
}
