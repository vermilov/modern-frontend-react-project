import React, { useContext } from "react";
import { TodoContext } from "./App";

const TodoItem = ({ todo }) => {
    const dispatch = useContext(TodoContext);
    const handleChangeCheckBox = () => {
        dispatch({
            type: todo.complete ? "UNDO_TODO" : "DO_TODO",
            id: todo.id,
        });
    };

    return (
        <li key={todo.id}>
            <label>
                <input
                    type="checkbox"
                    checked={todo.complete}
                    onChange={handleChangeCheckBox}
                />
                {todo.task}
            </label>
        </li>
    );
};

export default TodoItem;
