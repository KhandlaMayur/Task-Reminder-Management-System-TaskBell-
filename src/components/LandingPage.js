import React, { useState, useEffect } from 'react';
import '../styles/landing.css';

export default function LandingPage({ onNavigate, userName = 'Mayur' }) {
  const [tasksCreated, setTasksCreated] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: userName,
    email: 'mayur@example.com',
    mobile: '+1234567890',
    photo: 'https://via.placeholder.com/80'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempDetails, setTempDetails] = useState({ ...userDetails });
  const [tasks, setTasks] = useState([]);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isSetReminderModalOpen, setIsSetReminderModalOpen] = useState(false);
  const [isViewTasksModalOpen, setIsViewTasksModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'Medium',
    category: 'Work',
    status: 'Pending',
    repeat: 'None',
    attachments: [],
    estimatedTime: '',
    notes: '',
    subtasks: [],
    reminder: null
  });
  const [newReminder, setNewReminder] = useState({
    taskId: '',
    type: 'One-time',
    date: '',
    time: '',
    notifyBefore: '15 min',
    message: ''
  });
  const [taskFilters, setTaskFilters] = useState({
    search: '',
    priority: '',
    status: '',
    category: '',
    sortBy: 'dueDate'
  });
  const [viewMode, setViewMode] = useState('list');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  const progressData = {
    tasksCompletedToday: tasks.filter(t => t.status === 'Completed').length,
    timeSaved: '2.5 hours',
    pendingWorkload: tasks.filter(t => t.status !== 'Completed').length > 5 ? 'High' : tasks.filter(t => t.status !== 'Completed').length > 2 ? 'Medium' : 'Low',
    bestTime: 'Mornings',
    productivityScore: Math.round((tasks.filter(t => t.status === 'Completed').length / Math.max(tasks.length, 1)) * 100),
    streak: 3,
    lastSync: '2 minutes ago',
    activityTimeline: [
      { time: '10:30 AM', action: 'Task "Review code" completed' },
      { time: '9:45 AM', action: 'Reminder triggered for "Team meeting"' },
      { time: '8:00 AM', action: 'Priority auto-updated for "Project deadline"' }
    ]
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadPhoto = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserDetails({ ...userDetails, photo: e.target.result });
        setTempDetails({ ...tempDetails, photo: e.target.result });
        setSelectedFile(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    // Load dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    document.body.classList.toggle('dark-mode', savedDarkMode);
  }, []);

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('sessionActive');
    if (onNavigate) onNavigate('home');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  };

  const handleEdit = () => {
    setTempDetails({ ...userDetails });
    setEditMode(true);
  };

  const handleSave = () => {
    setUserDetails({ ...tempDetails });
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempDetails({ ...userDetails });
    setEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setTempDetails({ ...tempDetails, [field]: value });
  };

  const handleCreateTask = () => {
    setIsCreateTaskModalOpen(true);
  };

  const handleSetReminder = () => {
    setIsSetReminderModalOpen(true);
  };

  const handleViewTasks = () => {
    setIsViewTasksModalOpen(true);
  };

  const handleViewProgress = () => {
    setIsProgressModalOpen(true);
  };

  const handleSaveTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      alert('Title and Due Date are required');
      return;
    }
    const task = { ...newTask, id: Date.now() };
    setTasks([...tasks, task]);
    setTasksCreated(tasksCreated + 1);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
      priority: 'Medium',
      category: 'Work',
      status: 'Pending',
      repeat: 'None',
      attachments: [],
      estimatedTime: '',
      notes: '',
      subtasks: [],
      reminder: null
    });
    setIsCreateTaskModalOpen(false);
  };

  const handleSaveReminder = () => {
    const task = tasks.find(t => t.id === newReminder.taskId);
    if (task) {
      const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, reminder: newReminder } : t);
      setTasks(updatedTasks);
    }
    setNewReminder({
      taskId: '',
      type: 'One-time',
      date: '',
      time: '',
      notifyBefore: '15 min',
      message: ''
    });
    setIsSetReminderModalOpen(false);
  };

  const handleTaskAction = (action, taskId) => {
    if (action === 'complete') {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'Completed' } : t));
    } else if (action === 'delete') {
      setTasks(tasks.filter(t => t.id !== taskId));
    } else if (action === 'edit') {
      alert('Edit feature coming soon!');
    } else if (action === 'reminder') {
      setNewReminder({ ...newReminder, taskId: taskId.toString() });
      setIsSetReminderModalOpen(true);
    }
  };

  const filteredTasks = tasks.filter(task => {
    return (
      task.title.toLowerCase().includes(taskFilters.search.toLowerCase()) &&
      (taskFilters.priority === '' || task.priority === taskFilters.priority) &&
      (taskFilters.status === '' || task.status === taskFilters.status) &&
      (taskFilters.category === '' || task.category === taskFilters.category)
    );
  }).sort((a, b) => {
    if (taskFilters.sortBy === 'dueDate') {
      return new Date(a.dueDate + ' ' + a.dueTime) - new Date(b.dueDate + ' ' + b.dueTime);
    } else if (taskFilters.sortBy === 'priority') {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  return (
    <div className="landing-page">
      {/* Header with Account Drawer */}
      <header className="landing-header">
        <div className="landing-container">
          <div className="landing-brand">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#4aa0a5" />
              <path d="M8 12l2.2 2.2L16 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>TaskBell</span>
          </div>
          <button className="btn btn-ghost account-btn" onClick={toggleDrawer}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="landing-container">
          <h2>Welcome to {userName} in Taskbell</h2>
        </div>
      </section>

      <main className="landing-main">
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

      {/* Account Drawer */}
      {isDrawerOpen && (
        <div className="account-drawer-overlay" onClick={toggleDrawer}>
          <div className="account-drawer" onClick={(e) => e.stopPropagation()}>
            {/* User Info Section */}
            <div className="drawer-user-info">
              <img src={userDetails.photo} alt="User" className="user-photo" />
              <div className="user-details">
                <h3>{userDetails.name}</h3>
                <p>{userDetails.mobile}</p>
              </div>
            </div>

            {/* Account Details Section */}
            <div className="drawer-account-details">
              <h4>Account Details</h4>
              {editMode ? (
                <div className="edit-form">
                  <label>
                    Name:
                    <input
                      type="text"
                      value={tempDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={tempDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </label>
                  <label>
                    Mobile:
                    <input
                      type="tel"
                      value={tempDetails.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                    />
                  </label>
                  <label>
                    Profile Photo:
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {selectedFile && <button onClick={handleUploadPhoto}>Upload</button>}
                  </label>
                  <div className="edit-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="view-details">
                  <p><strong>Name:</strong> {userDetails.name}</p>
                  <p><strong>Email:</strong> {userDetails.email}</p>
                  <p><strong>Mobile:</strong> {userDetails.mobile}</p>
                  <button onClick={handleEdit}>Edit</button>
                </div>
              )}
            </div>

            {/* Account Statistics */}
            <div className="drawer-account-stats">
              <h4>Account Statistics</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{tasksCreated}</span>
                  <span className="stat-label">Tasks Created</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Reminders Set</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Completed Tasks</span>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="drawer-preferences">
              <h4>Preferences</h4>
              <label className="preference-item">
                <input type="checkbox" defaultChecked />
                <span>Email Notifications</span>
              </label>
              <label className="preference-item">
                <input type="checkbox" defaultChecked />
                <span>Push Notifications</span>
              </label>
              <label className="preference-item">
                <input type="checkbox" defaultChecked />
                <span>Auto-save Drafts</span>
              </label>
            </div>

            {/* Dark Mode Toggle */}
            <div className="drawer-theme-toggle">
              <label className="theme-switch">
                <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                <span className="slider"></span>
              </label>
              <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>

            {/* Logout Button */}
            <button className="drawer-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {isCreateTaskModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateTaskModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Task</h3>
            <form className="task-form">
              <label>
                Task Title *
                <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
              </label>
              <label>
                Description
                <textarea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
              </label>
              <div className="form-row">
                <label>
                  Due Date *
                  <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} required />
                </label>
                <label>
                  Due Time
                  <input type="time" value={newTask.dueTime} onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })} />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Priority
                  <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                    <option value="Low">Low 🟢</option>
                    <option value="Medium">Medium 🟡</option>
                    <option value="High">High 🔴</option>
                  </select>
                </label>
                <label>
                  Category
                  <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Study">Study</option>
                    <option value="Health">Health</option>
                  </select>
                </label>
              </div>
              <label>
                Status
                <select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
              <label>
                Repeat
                <select value={newTask.repeat} onChange={(e) => setNewTask({ ...newTask, repeat: e.target.value })}>
                  <option value="None">None</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </label>
              <label>
                Estimated Time
                <input type="text" value={newTask.estimatedTime} onChange={(e) => setNewTask({ ...newTask, estimatedTime: e.target.value })} placeholder="e.g., 1 hr" />
              </label>
              <label>
                Notes
                <textarea value={newTask.notes} onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })} />
              </label>
              <label>
                Subtasks
                <div className="subtasks">
                  {newTask.subtasks.map((sub, index) => (
                    <input key={index} type="text" value={sub} onChange={(e) => {
                      const updated = [...newTask.subtasks];
                      updated[index] = e.target.value;
                      setNewTask({ ...newTask, subtasks: updated });
                    }} />
                  ))}
                  <button type="button" onClick={() => setNewTask({ ...newTask, subtasks: [...newTask.subtasks, ''] })}>Add Subtask</button>
                </div>
              </label>
              <label>
                Attachments
                <input type="file" multiple onChange={(e) => setNewTask({ ...newTask, attachments: Array.from(e.target.files) })} />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={handleSaveTask}>Save Task</button>
                <button type="button" onClick={() => setIsCreateTaskModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Set Reminder Modal */}
      {isSetReminderModalOpen && (
        <div className="modal-overlay" onClick={() => setIsSetReminderModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Set Reminder</h3>
            <form className="reminder-form">
              <label>
                Select Task
                <select value={newReminder.taskId} onChange={(e) => setNewReminder({ ...newReminder, taskId: e.target.value })}>
                  <option value="">Choose a task</option>
                  {tasks.map(task => (
                    <option key={task.id} value={task.id}>{task.title}</option>
                  ))}
                </select>
              </label>
              <label>
                Reminder Type
                <select value={newReminder.type} onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}>
                  <option value="One-time">One-time</option>
                  <option value="Repeating">Repeating</option>
                </select>
              </label>
              <div className="form-row">
                <label>
                  Date
                  <input type="date" value={newReminder.date} onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })} />
                </label>
                <label>
                  Time
                  <input type="time" value={newReminder.time} onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })} />
                </label>
              </div>
              <label>
                Notify Before
                <select value={newReminder.notifyBefore} onChange={(e) => setNewReminder({ ...newReminder, notifyBefore: e.target.value })}>
                  <option value="5 min">5 min</option>
                  <option value="15 min">15 min</option>
                  <option value="1 hour">1 hour</option>
                  <option value="1 day">1 day</option>
                </select>
              </label>
              <label>
                Message
                <input type="text" value={newReminder.message} onChange={(e) => setNewReminder({ ...newReminder, message: e.target.value })} placeholder="Reminder message" />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={handleSaveReminder}>Set Reminder</button>
                <button type="button" onClick={() => setIsSetReminderModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Tasks Modal */}
      {isViewTasksModalOpen && (
        <div className="modal-overlay" onClick={() => setIsViewTasksModalOpen(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <h3>All Tasks</h3>
            <div className="task-filters">
              <input type="text" placeholder="Search tasks..." value={taskFilters.search} onChange={(e) => setTaskFilters({ ...taskFilters, search: e.target.value })} />
              <select value={taskFilters.priority} onChange={(e) => setTaskFilters({ ...taskFilters, priority: e.target.value })}>
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select value={taskFilters.status} onChange={(e) => setTaskFilters({ ...taskFilters, status: e.target.value })}>
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <select value={taskFilters.category} onChange={(e) => setTaskFilters({ ...taskFilters, category: e.target.value })}>
                <option value="">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
                <option value="Health">Health</option>
              </select>
              <select value={taskFilters.sortBy} onChange={(e) => setTaskFilters({ ...taskFilters, sortBy: e.target.value })}>
                <option value="dueDate">Sort by Due Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
              <div className="view-modes">
                <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>List</button>
                <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>Grid</button>
              </div>
            </div>
            <div className={`task-list ${viewMode}`}>
              {filteredTasks.length === 0 ? (
                <p>No tasks found. Start by creating your first task.</p>
              ) : (
                filteredTasks.map(task => (
                  <div key={task.id} className="task-card">
                    <h4>{task.title}</h4>
                    <p>Due: {task.dueDate} {task.dueTime}</p>
                    <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                    <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
                    {task.reminder && <span className="reminder-icon">🔔</span>}
                    <div className="task-actions">
                      <button onClick={() => handleTaskAction('complete', task.id)}>Complete</button>
                      <button onClick={() => handleTaskAction('edit', task.id)}>Edit</button>
                      <button onClick={() => handleTaskAction('delete', task.id)}>Delete</button>
                      <button onClick={() => handleTaskAction('reminder', task.id)}>Reminder</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="modal-actions">
              <button onClick={() => setIsViewTasksModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Dashboard Modal */}
      {isProgressModalOpen && (
        <div className="modal-overlay" onClick={() => setIsProgressModalOpen(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Productivity Dashboard</h3>
            <div className="progress-dashboard">
              {/* Daily Productivity Summary */}
              <div className="progress-section">
                <h4>📊 Daily Productivity Summary</h4>
                <div className="summary-card">
                  <p>You completed <strong>{progressData.tasksCompletedToday}</strong> tasks today. Great progress!</p>
                  <p>Time saved: <strong>{progressData.timeSaved}</strong></p>
                  <p>Pending workload: <span className={`workload-${progressData.pendingWorkload.toLowerCase()}`}>{progressData.pendingWorkload}</span></p>
                </div>
              </div>

              {/* Smart Suggestions & Tips */}
              <div className="progress-section">
                <h4>🧠 Smart Suggestions & Tips</h4>
                <div className="tips-card">
                  <p>{progressData.bestTime} are your most productive time.</p>
                  <p>Consider reordering tasks by priority for better efficiency.</p>
                  <p>Optimize reminders by setting them 15 minutes before deadlines.</p>
                </div>
              </div>

              {/* Focus & Distraction Control */}
              <div className="progress-section">
                <h4>🎯 Focus & Distraction Control</h4>
                <div className="focus-controls">
                  <button className="focus-btn">Start Focus Mode (Pomodoro)</button>
                  <button className="break-btn">Set Break Reminder</button>
                  <button className="silent-btn">Silent Notifications</button>
                </div>
              </div>

              {/* Productivity Health Indicator */}
              <div className="progress-section">
                <h4>💪 Productivity Health Indicator</h4>
                <div className="health-card">
                  <div className="score-circle">
                    <span className="score">{progressData.productivityScore}%</span>
                    <span className="label">Productivity Score</span>
                  </div>
                  <p>Consistency Score: 85%</p>
                  <p>Overdue Risk: Low</p>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="progress-section">
                <h4>📅 Activity Timeline</h4>
                <div className="timeline">
                  {progressData.activityTimeline.map((activity, index) => (
                    <div key={index} className="timeline-item">
                      <span className="time">{activity.time}</span>
                      <span className="action">{activity.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Preferences & Controls */}
              <div className="progress-section">
                <h4>⚙️ Personal Preferences & Controls</h4>
                <div className="preferences-grid">
                  <label>
                    Working Hours: <input type="text" defaultValue="9 AM - 6 PM" />
                  </label>
                  <label>
                    Notification Intensity: <select defaultValue="medium">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </label>
                  <label>
                    Reminder Frequency: <select defaultValue="standard">
                      <option value="minimal">Minimal</option>
                      <option value="standard">Standard</option>
                      <option value="frequent">Frequent</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Motivation & Gamification */}
              <div className="progress-section">
                <h4>🎉 Motivation & Gamification</h4>
                <div className="motivation-card">
                  <p>🎉 {progressData.streak}-day productivity streak!</p>
                  <p>🏆 Achievement: Task Master (Complete 10 tasks)</p>
                  <p>🎯 Weekly Goal: 80% completion rate</p>
                </div>
              </div>

              {/* System Intelligence Status */}
              <div className="progress-section">
                <h4>🤖 System Intelligence Status</h4>
                <div className="system-status">
                  <p>✅ Reminder engine running</p>
                  <p>✅ Notification delivery: 98% success</p>
                  <p>🔄 Last system sync: {progressData.lastSync}</p>
                </div>
              </div>

              {/* Learning & Help Section */}
              <div className="progress-section">
                <h4>📚 Learning & Help Section</h4>
                <div className="help-section">
                  <p><strong>How to use Focus Mode:</strong> Click the button to start a 25-minute focused work session.</p>
                  <p><strong>Productivity Tip:</strong> Break large tasks into smaller subtasks for better progress tracking.</p>
                  <p><strong>Best Practice:</strong> Review your daily summary every evening to plan for tomorrow.</p>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setIsProgressModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <p>&copy; 2026 TaskBell. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
