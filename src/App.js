// src/App.js
import React, { useState } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = (event) => {
    event.preventDefault();

    if (newTodo.trim() !== '') {
      const todo = {
        id: new Date().getTime(),
        text: newTodo,
        completed: false,
      };

      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const deleteCheck = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filterTodo = (event) => {
    setFilter(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return true;
      case 'completed':
        return todo.completed;
      case 'uncompleted':
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="container mx-auto  bg-amber-500 min-h-screen min-w-full flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-4 text-center p-8">Todo List</h1>
      <div className="flex mb-4 justify-center">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2">
          Add Todo
        </button>
      </div>
      <select
        onChange={filterTodo}
        className="border p-2 mb-4 flex justify-center"
        defaultValue="all"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`flex items-center mb-2 ${todo.completed ? 'completed' : ''}`}>
            <span className="mr-2">{todo.text}</span>
            <button onClick={() => toggleComplete(todo.id)} className="mr-2">
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteCheck(todo.id)} className="text-red-500">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
