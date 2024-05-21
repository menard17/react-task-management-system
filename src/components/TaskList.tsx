import React from 'react';
import { Task } from '../models/Task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            {task.title}
          </div>
          <div>
            <button className="btn btn-success btn-sm m-1" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
