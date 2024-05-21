// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Task } from './models/Task';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Search from './components/Search';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleAddTask = async (task: Omit<Task, 'id'>) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleTask = async (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      const updatedTask = await updateTask({ ...task, completed: !task.completed });
      setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
    }
  };

  const handleEditTask = async (task: Task) => {
    const updatedTask = await updateTask(task);
    setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
    setTaskToEdit(null);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task Management System</h1>
      <Search query={searchQuery} onSearch={setSearchQuery} />
      <TaskForm onAdd={handleAddTask} onEdit={handleEditTask} taskToEdit={taskToEdit} />
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
        onEdit={setTaskToEdit}
      />
    </div>
  );
};

export default App;
