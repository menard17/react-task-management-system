import React, { useState, useEffect } from 'react';
import { Task } from '../models/Task';

interface TaskFormProps {
  onAdd: (task: Omit<Task, 'id'>) => void;
  onEdit: (task: Task) => void;
  taskToEdit: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd, onEdit, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskToEdit) {
      onEdit({ ...taskToEdit, title, description });
    } else {
      onAdd({ title, description, completed: false });
    }
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Task Description</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
