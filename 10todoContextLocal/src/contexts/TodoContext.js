import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Todo msg",
      isCompleted: false,
    }
  ],
  addTodo : (id) => {},
  updateTodo : (id,todo) => {},
  deleteTodo : (id) => {},
  toggleTodo: (id) => {}
});


export const useTodoContext = () => {
  return useContext(TodoContext);
}


export const TodoProvider = TodoContext.Provider;
