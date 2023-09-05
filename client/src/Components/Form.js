import React, { useState, useEffect } from "react";
import { apiUpdateTodo, apiCreateTodo } from "./APIService";

function Form(props) {
  const [title, setTitle] = useState(props.todo.title);
  const [body, setBody] = useState(props.todo.body);

  useEffect(() => {
    setTitle(props.todo.title);
    setBody(props.todo.body);
  }, [props.todo]);

  const updateTodo = () => {
    apiUpdateTodo(props.todo.id, { title, body }, props.handleUpdateTodo);
  };

  const addTodo = () => {
    apiCreateTodo({ title, body }, props.handleAddTodo);
  };

  return (
    <div className="row px-5 mx-5 mb-5 g-3 align-items-center">
      {props.todo ? (
        <div className="px-auto">
          <label htmlFor="title" className="col-form-label m-2">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Please Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <label htmlFor="body" className="col-form-label m-2">
            Description:
          </label>
          <textarea
            className="form-control"
            placeholder="Please Enter Description"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
          ></textarea>

          {props.todo.id ? (
            <button className="btn btn-success mt-3" onClick={updateTodo}>
              Update Task
            </button>
          ) : (
            <button className="btn btn-success mt-3" onClick={addTodo}>
              Add Task
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Form;
