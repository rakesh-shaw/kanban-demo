import React from "react";

const Todo = ({ tasks, onDragStart, onDrop, allowDrop }) => {
  return (
    <div
      className="column"
      onDrop={(e) => onDrop(e, "todo")}
      onDragOver={allowDrop}
    >
      <h2>Todo</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
            draggable
            onDragStart={(e) => onDragStart(e, task.id, "todo")}
          >
            <h4>{task.title}</h4>
            <p>{task.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
