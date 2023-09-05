import React from "react";
import { useEffect, useState } from "react";

import Todo from "./Todo";
import { apiTodoList } from "./APIService";
import Form from "./Form";
import TodoHeader from "./TodoHeader";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [todosDidSet, setTodosDidSet] = useState(false);

  useEffect(() => {
    if (todosDidSet === false) {
      const handleTodoListLookup = (response) => {
        setTodoList(response);
        setTodosDidSet(true);
      };
      apiTodoList(handleTodoListLookup);
    }
  }, [todosDidSet, todoList, setTodosDidSet]);

  const deleteTodo = (todo) => {
    const newTodoList = todoList.filter((myTodo) => {
      if (myTodo.id === todo.id) {
        return false;
      } else {
        return true;
      }
    });
    setTodoList(newTodoList);
  };

  const handleAddTodo = (todo) => {
    const newTodoList = [...todoList, todo];
    setTodoList(newTodoList);
  };
  return (
    <div>
      <TodoHeader />
      <Form todo={{ title: "", body: "" }} handleAddTodo={handleAddTodo} />

      {todoList.length ? (
        todoList.map((todo) => {
          return (
            <Todo
              todo={todo}
              deleteTodo={deleteTodo}
              className="p-2 m-3"
              key={todo.id}
            />
          );
        })
      ) : (
        <p className="text-center p-5 m-5">
          List is empty, add more tasks to show here
        </p>
      )}
    </div>
  );
}

export default TodoList;
