import React, { useState, useEffect, useCallback } from 'react';

import './App.css';
import TaskList from './components/TaskList';
import NewTask from './components/NewTask';

const backendUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : process.env.TASK_SERVICE_SERVICE_HOST;
// : 'URL-DO-KUBERNETES-TASK-POD';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(function () {
    // fetch('http://172.22.158.171:31323/tasks', {
    fetch(`${backendUrl}/tasks`, {
      headers: {
        Authorization: 'Bearer abc',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        setTasks(jsonData.tasks);
      });
  }, []);

  useEffect(
    function () {
      fetchTasks();
    },
    [fetchTasks]
  );

  function addTaskHandler(task) {
    // fetch('http://172.22.158.171:31323/tasks', {
    fetch(`${backendUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer abc',
      },
      body: JSON.stringify(task),
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (resData) {
        console.log(resData);
      });
  }

  return (
    <div className="App">
      <section>
        <NewTask onAddTask={addTaskHandler} />
      </section>
      <section>
        <button onClick={fetchTasks}>Fetch Tasks</button>
        <TaskList tasks={tasks} />
      </section>
    </div>
  );
}

export default App;
