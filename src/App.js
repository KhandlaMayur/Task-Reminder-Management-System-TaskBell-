import React from 'react';
import './App.css';
import './styles/theme.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TaskList from './components/TaskList';
import ReminderList from './components/ReminderList';
import Footer from './components/Footer';

function App() {
  const tasks = [
    { id: 1, title: 'Buy groceries', due: '2026-02-02', tags: ['shopping'] },
    { id: 2, title: 'Prepare meeting notes', due: '2026-02-03', tags: ['work'] },
    { id: 3, title: 'Plan weekend trip', due: '2026-02-07', tags: ['personal'] },
  ];

  const reminders = [
    { id: 1, title: 'Doctor appointment', time: '09:00 AM' },
    { id: 2, title: 'Call Alice', time: '03:30 PM' },
  ];

  return (
    <div className="app-root">
      <Header />
      <Hero />

      <main className="container">
        <section className="content-grid">
          <div className="left-col">
            <Features />
            <TaskList tasks={tasks} />
          </div>
          <aside className="right-col">
            <ReminderList reminders={reminders} />
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
