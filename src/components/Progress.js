// Progress.js
import React from "react";

const Progress = ({ tasks, onDragStart, onDrop, allowDrop }) => {
  return (
    <div
      className="column"
      onDrop={(e) => onDrop(e, "inProgress")}
      onDragOver={allowDrop}
    >
      <h2>In Progress</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
            draggable
            onDragStart={(e) => onDragStart(e, task.id, "inProgress")}
          >
            <h4>{task.title}</h4>
            <p>{task.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
