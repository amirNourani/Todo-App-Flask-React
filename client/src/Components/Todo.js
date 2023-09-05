import React, { useState } from "react";
import Form from "./Form";
import { apiDeleteTodo } from "./APIService";

function Todo(props) {
  const [todo, setTodo] = useState(props.todo);
  const className = props.className ? props.className : "p-2 m-3";
  const [editedTodo, setEditedTodo] = useState(null);

  const editTodo = (todo) => {
    setEditedTodo(todo);
  };

  const handleUpdateTodo = (todo) => {
    setTodo(todo);
    setEditedTodo(false);
  };
  const handleDeleteTodo = () => {
    props.deleteTodo(todo);
  };

  return (
    <React.Fragment>
      <div className={className}>
        <h5>Title: {todo.title}</h5>
        <p className="mx-5 my-4">Description: {todo.body}</p>
        <p className="mx-2">Date: {todo.date}</p>
        <div className="row mx-2">
          <div className="col-1 my-1 mx-2">
            <button className="btn btn-primary" onClick={() => editTodo(todo)}>
              Update
            </button>
          </div>
          <div className="col my-1 mx-2">
            <button
              className="btn btn-danger"
              onClick={() => apiDeleteTodo(todo.id, handleDeleteTodo)}
            >
              Done
            </button>
          </div>
        </div>
        {editedTodo && (
          <Form todo={editedTodo} handleUpdateTodo={handleUpdateTodo} />
        )}
        <hr />
      </div>
    </React.Fragment>
  );
}

export default Todo;
