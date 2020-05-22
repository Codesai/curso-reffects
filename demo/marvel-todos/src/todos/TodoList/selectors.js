import {createSelector} from "reselect";

function filterSelector(state) {
    return state.filter;
}

function todosSelector(state) {
    return state.todos;
}

/*export default function visibleTodosSelector(state) {
    if (filterSelector(state) === 'done') {
        return todosSelector(state).filter(x => x.done);
    }
    if (filterSelector(state) === 'undone') {
        return todosSelector(state).filter(x => !x.done);
    }
    return todosSelector(state);
}*/

export default createSelector(
    [filterSelector, todosSelector],
    function (filter, todos) {
        if (filter === 'done') {
            return todos.filter(x => x.done);
        }
        if (filter === 'undone') {
            return todos.filter(x => !x.done);
        }
        return todos;
    }
);
