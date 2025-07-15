import React, { useState } from 'react';
import './App.css'; // Adjust path if needed (e.g., '../../App.css')

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface ToDoListProps {
  todos: Todo[];
  onAdd: (text: string) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onAdd, onDelete, onToggleComplete, onEdit }) => {
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  const startEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text); // Initialize with task text
  };

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      onEdit(id, editText.trim()); // Propagate edit to parent
      setEditId(null);
      setEditText('');
    } else {
      alert('Task text cannot be empty!');
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') saveEdit(id);
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {editId === todo.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, todo.id)}
                  autoFocus
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onDoubleClick={() => startEdit(todo.id, todo.text)}
                title="Double click to edit" // Add tooltip on hover
              >
                {todo.text}
              </span>
            )}
            {/* Conditionally render buttons based on edit mode */}
            {editId !== todo.id && (
              <div className="button-group">
                <button onClick={() => onToggleComplete(todo.id)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;