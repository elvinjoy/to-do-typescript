'use client';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'gray' : 'black',
          cursor: 'pointer'
        }}
        onClick={() => onToggle(todo._id, !todo.completed)}
      >
        {todo.title}
      </span>
      <button
        style={{ background: 'red', color: 'white', border: 'none', padding: '0 8px' }}
        onClick={() => onDelete(todo._id)}
      >
        X
      </button>
    </div>
  );
}
