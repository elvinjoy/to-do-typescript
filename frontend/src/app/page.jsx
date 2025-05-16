'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

const API_URL = 'http://localhost:5000/api/todos';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(API_URL, { title });
      setTitle('');
      fetchTodos();
    } catch (err) {
      console.error('Add failed:', err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/${id}`, { completed: !completed });
      fetchTodos();
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>📝 To-Do App</h1>
      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div>
        {todos.map((todo) => (
          <div key={todo._id} className={styles.todoBox}>
            <span
              className={todo.completed ? styles.completedText : ''}
            >
              {todo.title}
            </span>
            <div className={styles.todoActions}>
              <button
                className={styles.completeButton}
                onClick={() => toggleTodo(todo._id, todo.completed)}
              >
                {todo.completed ? 'Undo' : 'Completed'}
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
