import React from "react";
import ReactDOM from "react-dom";
import { dispatch } from "reffects";

import "./styles.css";

import TodoList from "./todos/TodoList/TodoList";
import { startApp } from "./bootstrap";

startApp();

function App() {
  dispatch("loadTodos");

  return (
    <div className="App">
      <h1>TODOS</h1>
      <TodoList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
