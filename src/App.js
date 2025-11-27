import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Progress from "./components/Progress";
import Done from "./components/Done";
import "./App.css";

const initialData = {
  todo: [],
  inProgress: [],
  done: []
};

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Drag and Drop Handlers
  const onDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const onDrop = (e, destColumn) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (sourceColumn === destColumn) return;

    const sourceTasks = [...tasks[sourceColumn]];
    const destTasks = [...tasks[destColumn]];

    const taskIndex = sourceTasks.findIndex((t) => t.id === taskId);
    const [movedTask] = sourceTasks.splice(taskIndex, 1);
    destTasks.push(movedTask);

    setTasks({
      ...tasks,
      [sourceColumn]: sourceTasks,
      [destColumn]: destTasks
    });
  };

  const allowDrop = (e) => e.preventDefault();

  // Add Task to Todo
  const addTask = (task) => {
    setTasks({
      ...tasks,
      todo: [...tasks.todo, task]
    });
  };

  const handleAddTask = () => {
    if (!newTaskTitle) return;
    addTask({ id: Date.now().toString(), title: newTaskTitle, desc: newTaskDesc });
    setNewTaskTitle("");
    setNewTaskDesc("");
    setShowModal(false);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Kanban Board</h1>
        <button className="add-task-btn" onClick={() => setShowModal(true)}>
          + Add Task
        </button>
      </div>

      <div className="board">
        <Todo
          tasks={tasks.todo}
          onDragStart={onDragStart}
          onDrop={onDrop}
          allowDrop={allowDrop}
        />
        <Progress
          tasks={tasks.inProgress}
          onDragStart={onDragStart}
          onDrop={onDrop}
          allowDrop={allowDrop}
        />
        <Done
          tasks={tasks.done}
          onDragStart={onDragStart}
          onDrop={onDrop}
          allowDrop={allowDrop}
        />
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Task description"
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleAddTask}>Add Task</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
