import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaMoon, FaSun } from 'react-icons/fa';
import '../App.css';

export default function IndexPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });
  const [taskInput, setTaskInput] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        name: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const updateTask = (taskId, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleKeyPress = (e, taskId) => {
    if (e.key === 'Enter') {
      const newName = e.target.value.trim();
      if (newName !== '') {
        updateTask(taskId, newName);
      }
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className={darkMode ? 'dark-mode' : ''} style={{ minHeight: '100vh' }}>
      <header>
        <button onClick={toggleDarkMode} className="toggle-mode-btn">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>
      <form className="task-form" onSubmit={handleSubmit}>
        <h4>task manager</h4>
        <div className="form-control">
          <input
            type="text"
            name="name"
            className="task-input"
            placeholder="e.g. wash dishes"
            value={editingTask !== null ? tasks.find((task) => task.id === editingTask)?.name : taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button type="submit" className="btn submit-btn">
            Submit
          </button>
        </div>
      </form>
      {loading ? (
        <section className="tasks-container">
          <p className="loading-text">Loading...</p>
        </section>
      ) : (
        <section className="tasks-container">
          {tasks.length === 0 ? (
            <p className="empty-tasks">No tasks found.</p>
          ) : (
            <ul className="tasks">
              {tasks.map((task) => (
                <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`} >
                  {editingTask === task.id ? (
                    <input
                      type="text"
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, task.id)}
                    />
                  ) : (
                    <>
                      <span className={`single-task ${task.completed ? 'completed' : ''}`}>
                        <span
                          className={`${task.completed ? 'completed' : ''}`}
                          onClick={() => handleTaskCompletion(task.id)}
                        >
                          {task.name}
                        </span>
                        <div className="task-links">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleTaskCompletion(task.id)}
                          />
                          <button onClick={() => setEditingTask(task.id)} className="edit-link">
                            <FaEdit />
                          </button>
                          <button onClick={() => deleteTask(task.id)} className="delete-btn">
                            <FaTrash />
                          </button>
                        </div>
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
