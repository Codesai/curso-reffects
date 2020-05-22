import visibleTodosSelector from "./selectors";

describe('Selectors', () => {
    test('shows all todos', () => {
        const todos = visibleTodosSelector.resultFunc(
            'all',
            [
                {id: 1011334, text: "Describe: 3-D Man", done: false},
                {id: 1017100, text: "Describe: A-Bomb (HAS)", done: true},
                {id: 1009144, text: "Describe: A.I.M.", done: true},
            ]
        );

        expect(todos).toEqual([
            {id: 1011334, text: "Describe: 3-D Man", done: false},
            {id: 1017100, text: "Describe: A-Bomb (HAS)", done: true},
            {id: 1009144, text: "Describe: A.I.M.", done: true},
        ]);
    });
    test('shows done todos', () => {
        const todos = visibleTodosSelector({
            filter: 'done',
            todos: [
                {id: 1011334, text: "Describe: 3-D Man", done: false},
                {id: 1017100, text: "Describe: A-Bomb (HAS)", done: true},
                {id: 1009144, text: "Describe: A.I.M.", done: true},
            ]
        });

        expect(todos).toEqual([
            {id: 1017100, text: "Describe: A-Bomb (HAS)", done: true},
            {id: 1009144, text: "Describe: A.I.M.", done: true},
        ]);
    });
    test('shows undone todos', () => {
        const todos = visibleTodosSelector({
            filter: 'undone',
            todos: [
                {id: 1011334, text: "Describe: 3-D Man", done: false},
                {id: 1017100, text: "Describe: A-Bomb (HAS)", done: true},
                {id: 1009144, text: "Describe: A.I.M.", done: true},
            ]
        });

        expect(todos).toEqual([
            {id: 1011334, text: "Describe: 3-D Man", done: false},
        ]);
    });
});