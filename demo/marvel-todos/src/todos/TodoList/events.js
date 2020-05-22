import { registerEventHandler } from 'reffects';
import { state } from "reffects-store";
import { globals, http } from "reffects-batteries";

export default function registerTodoListEvents() {
  registerEventHandler(
    'loadTodos',
    function loadTodos({ globals }, payload) {
      return http.get({
        url: globals.apiUrl,
        successEvent: { id: 'loadTodosSucceeded' },
      });
    },
    [globals.get('apiUrl')]
  );

  registerEventHandler('loadTodosSucceeded', function loadTodosSucceeded(
    coeffects,
    [response]
  ) {
    function extractTodos(payload) {
      return payload.results.map(item => ({
        id: item.id,
        text: 'Describe: ' + item.name,
        done: !!item.description,
      }));
    }

    const todos = extractTodos(response);

    return state.set({ todos: todos });
  });

  registerEventHandler('chooseFilter', function chooseFilter(coeffects, payload) {
      return state.set({ filter: payload });
  });

  registerEventHandler(
    'todoClicked',
    function todoClicked(coeffects, { id, text, isDone }) {
      const {
        state: { todos },
      } = coeffects;

      function toggleTodo(idTodo, todos) {
        return todos.map(todo => {
          if (todo.id === idTodo) {
            return Object.assign({}, todo, { done: !todo.done });
          }
          return todo;
        });
      }

      const newTodos = toggleTodo(id, todos);

      return state.set({ todos: newTodos });
    },
    [state.get( { todos: 'todos' })]
  );
}
