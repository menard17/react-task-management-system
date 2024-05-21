import React, { useState, useEffect } from 'react';
import { Task } from '../models/Task';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskService';
import Search from '../components/Search';
import TaskList from '../components/TaskList';
import TaskEditModal from '../components/TaskEditModal';
import TaskForm from '../components/TaskForm';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleAddTask = async (task: Omit<Task, 'id'>) => {
    await createTask(task);
    fetchTasks(); // Refetch tasks after adding
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    fetchTasks(); // Refetch tasks after deleting
  };

  const handleToggleTask = async (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      await updateTask({ ...task, completed: !task.completed });
      fetchTasks(); // Refetch tasks after toggling
    }
  };

  const handleEditTask = async (task: Task) => {
    await updateTask(task);
    fetchTasks(); // Refetch tasks after editing
    setShowModal(false);
  };

  const handleOpenModal = (task: Task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTaskToEdit(null);
  };

  const filteredTasks = tasks.filter(task =>
    task.title !== undefined && task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home container mt-5">
      <h1 className="text-center mb-4">Task Management System</h1>
      <Search query={searchQuery} onSearch={setSearchQuery} />
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
        onEdit={handleOpenModal}
      />
      {taskToEdit && (
        <TaskEditModal
          show={showModal}
          task={taskToEdit}
          onSave={handleEditTask}
          onClose={handleCloseModal}
        />
      )}
      <TaskForm onAdd={handleAddTask} onEdit={handleEditTask}/>
    </div>
  );
};

export default HomePage;
