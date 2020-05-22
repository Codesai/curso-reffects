import registerTodoListEvents from './events';
import {clearHandlers, getEventHandler} from 'reffects';
import { state } from "reffects-store";
import { http } from "reffects-batteries";

beforeAll(registerTodoListEvents);

afterAll(clearHandlers);

describe('events', () => {
  test('loadTodos', () => {
    const givenCoeffects = { globals: { apiUrl: 'http://someurl' } };
    const loadTodos = getEventHandler('loadTodos');

    expect(loadTodos(givenCoeffects)).toEqual(http.get({
      url: 'http://someurl',
      successEvent: ['loadTodosSucceeded'],
    }));
  });

  test('loadTodosSucceeded', () => {
    const givenCoeffects = {};
    const loadTodosSucceeded = getEventHandler('loadTodosSucceeded');

    expect(
      loadTodosSucceeded(givenCoeffects, [
        {
          results: [
            {
              id: 1,
              name: 'Kevin Bacon',
              description: 'Super sexy',
            },
            {
              id: 2,
              name: 'Alison',
              description: '',
            },
          ],
        },
      ])
    ).toEqual(
      state.set({
        todos: [
          {
            id: 1,
            text: 'Describe: Kevin Bacon',
            done: true,
          },
          {
            id: 2,
            text: 'Describe: Alison',
            done: false,
          },
        ],
      })
    );
  });

  test('filter selected', () => {
    const chooseFilter = getEventHandler('chooseFilter');

    const effects = chooseFilter({}, 'all');

    expect(effects).toEqual(state.set({ 'filter': 'all' }));
  });

  test('todoClicked when todo is done', () => {
    const id = 1;
    const todoClicked = getEventHandler('todoClicked');
    const isDone = true;
    const text = 'Lorem ipsum';
    const givenCoeffects = {
      state: {
        todos: [
          {
            id: id,
            text: 'Describe: Kevin Bacon',
            done: true,
          },
        ],
      },
    };

    expect(todoClicked(givenCoeffects, {id, isDone, text}))
        .toEqual(state.set({
              todos: [
                {
                  id: 1,
                  text: 'Describe: Kevin Bacon',
                  done: false,
                },
              ],
            })
        );
  });

  test('todoClicked when todo is undone', () => {
    const id = 1;
    const todoClicked = getEventHandler('todoClicked');
    const isDone = false;
    const text = 'Lorem ipsum';
    const givenCoeffects = {
      state: {
        todos: [
          {
            id: id,
            text: 'Describe: Kevin Bacon',
            done: false,
          },
        ],
      },
    };

    expect(todoClicked(givenCoeffects, {id, isDone, text})).toEqual(
        state.set({
          todos: [
            {
              id: 1,
              text: 'Describe: Kevin Bacon',
              done: true,
            },
          ],
        }),
    );
  });
});
