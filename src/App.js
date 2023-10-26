import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (id) => {
    const updatedTask = tasks.find((todo, index) => index === +id);
    updatedTask.completed = !updatedTask.completed;
    setTasks([...tasks, updatedTask]);
  };
  return (
    <React.Fragment>
      <ul>
        {tasks
          .slice(0, 5)
          // .filter((i) => !i.completed)
          .map((item, index) => (
            <li
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              className="todo-row"
              key={index}
            >
              {item.title}
              <br />
              <button onClick={() => handleChange(index)}>
                {item.completed ? "Completed" : "Not Completed"}
              </button>
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
}

export default App;
