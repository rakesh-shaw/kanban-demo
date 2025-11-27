// Done.js
import React from "react";

const Done = ({ tasks, onDragStart, onDrop, allowDrop }) => {
  return (
    <div
      className="column"
      onDrop={(e) => onDrop(e, "done")}
      onDragOver={allowDrop}
    >
      <h2>Done</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
            draggable
            onDragStart={(e) => onDragStart(e, task.id, "done")}
          >
            <h4>{task.title}</h4>
            <p>{task.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Done;
