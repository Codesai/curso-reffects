import React from 'react';
import { subscribe } from 'reffects-store';
import TodoItem from './TodoItem';
import {dispatch} from "reffects";
import visibleTodosSelector from "./selectors";

export function TodoList({ todos, chooseFilter }) {
  return (
    <React.Fragment>
      <ul>
        {todos ? (
          todos.map(function(todo) {
            return (
              <li key={todo.id} className={`${todo.done ? 'done' : 'undone'}`}>
                <TodoItem id={todo.id} text={todo.text} isDone={todo.done} />
              </li>
            );
          })
        ) : (
          <p> No todos </p>
        )}
      </ul>
      <section>
        <button onClick={() => chooseFilter('all')}>
          All
        </button>
        <button onClick={() => chooseFilter('done')}>
          Done
        </button>
        <button onClick={() => chooseFilter('undone')}>
          Undone
        </button>
      </section>
    </React.Fragment>
  );
}

export default subscribe(
  TodoList, 
  function(state) {
    return {
      todos: visibleTodosSelector(state)
    };
  },
    {
        chooseFilter(filter) {
            dispatch({ id: 'chooseFilter', payload: filter });
        }
    }
);
