// import React, { useReducer, createContext } from "react";
// import uuid from "uuid/v4";
// import Filter from "./Filter";
// import TodoList from "./TodoList";
// import AddTodo from "./AddTodo";

// export const TodoContext = createContext(null);

// const initialTodos = [
//     {
//         id: uuid(),
//         task: "Learn React",
//         complete: true,
//     },
//     {
//         id: uuid(),
//         task: "Learn Svelte",
//         complete: true,
//     },
//     {
//         id: uuid(),
//         task: "Learn MySQL",
//         complete: false,
//     },
// ];

// const filterReducer = (state, action) => {
//     switch (action.type) {
//         case "SHOW_ALL":
//             return "ALL";
//         case "SHOW_COMPLETE":
//             return "COMPLETE";
//         case "SHOW_INCOMPLETE":
//             return "INCOMPLETE";
//         default:
//             throw new Exception();
//     }
// };

// const todoReducer = (state, action) => {
//     switch (action.type) {
//         case "DO_TODO": {
//             return state.map(todo => {
//                 if (todo.id === action.id) {
//                     return { ...todo, complete: true };
//                 } else {
//                     return todo;
//                 }
//             });
//         }
//         case "UNDO_TODO": {
//             return state.map(todo => {
//                 if (todo.id === action.id) {
//                     return { ...todo, complete: false };
//                 } else {
//                     return todo;
//                 }
//             });
//         }
//         case "ADD_TODO": {
//             return [
//                 ...state,
//                 { id: action.id, task: action.task, complete: false },
//             ];
//         }
//         default: {
//             throw new Error();
//         }
//     }
// };

// const App = () => {
//     const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
//     const [todos, dispatchTodos] = useReducer(
//         todoReducer,
//         initialTodos,
//     );

//     const filteredToDos = todos.filter(todo => {
//         if (filter === "ALL") {
//             return true;
//         }

//         if (filter === "COMPLETE" && todo.complete) {
//             return true;
//         }

//         if (filter === "INCOMPLETE" && !todo.complete) {
//             return true;
//         }

//         return false;
//     });
//     return (
//         <TodoContext.Provider value={dispatchTodos}>
//             <Filter dispatch={dispatchFilter} />
//             <TodoList todos={filteredToDos} />
//             <AddTodo />
//         </TodoContext.Provider>
//     );
// };

import React from "react";
import axios from "axios";
import Counter from "./Counter";

export const dataReducer = (state, action) => {
    if (action.type === "SET_ERROR") {
        return { ...state, list: [], error: true };
    }

    if (action.type === "SET_LIST") {
        return { ...state, list: action.list, error: null };
    }

    throw new Error();
};

const initialData = {
    list: [],
    error: null,
};

const App = () => {
    const [counter, setCounter] = React.useState(0);
    const [data, dispatch] = React.useReducer(
        dataReducer,
        initialData,
    );

    React.useEffect(() => {
        axios
            .get("http://hn.algolia.com/api/v1/search?query=react")
            .then(response => {
                dispatch({
                    type: "SET_LIST",
                    list: response.data.hits,
                });
            })
            .catch(() => {
                dispatch({ type: "SET_ERROR" });
            });
    }, []);

    return (
        <div>
            <h1>My Counter</h1>
            <Counter counter={counter} />

            <button
                type="button"
                onClick={() => setCounter(counter + 1)}
            >
                Increment
            </button>

            <button
                type="button"
                onClick={() => setCounter(counter - 1)}
            >
                Decrement
            </button>

            <h2>My Async Task</h2>

            {data.error && <div className="error">Error</div>}

            <ul>
                {data.list.map(item => (
                    <li key={item.objectID}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
