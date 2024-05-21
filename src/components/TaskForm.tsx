import React, { useState, useEffect } from 'react';
import { Task } from '../models/Task';

interface TaskFormProps {
  onAdd: (task: Omit<Task, 'id'>) => void;
  onEdit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd, onEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ title, description, completed: false });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="form-group text-center">
          <h3 className="text-center m-2">Task Title</h3>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="form-group">
          <input
            id="taskTitle"
            type="text"
            className="form-control"
            placeholder="Add tasks..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
    </div>
  </form>
  );
};

export default TaskForm;
