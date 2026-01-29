import React from 'react';

function TaskItem({ task }) {
  return (
    <div className="task-item">
      <div className="task-title">{task.title}</div>
      <div className="task-meta">Due {task.due} • {task.tags.join(', ')}</div>
    </div>
  );
}

export default function TaskList({ tasks = [] }) {
  return (
    <section id="tasks" className="task-list">
      <div className="section-head">
        <h3>Your Tasks</h3>
        <button className="btn small">New Task</button>
      </div>
      <div className="tasks">
        {tasks.map(t => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </section>
  );
}
