import React, { useState, useContext } from "react";
import uuid from "uuid/v4";
import { TodoContext } from "./App";

const AddTodo = () => {
    const dispatch = useContext(TodoContext);
    const [newTask, setNewTask] = useState("");

    const handleChangeInput = event => {
        setNewTask(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (newTask) {
            dispatch({
                type: "ADD_TODO",
                id: uuid(),
                task: newTask,
            });
        }

        setNewTask("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTask}
                onChange={handleChangeInput}
            />
            <button type="submit">Add ToDo item</button>
        </form>
    );
};

export default AddTodo;
