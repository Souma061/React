import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {deleteTodo} from "../features/todo/todoSlice"

function SimpleTodo() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="text-2xl font-bold text-gray-800 mb-6 text-center">TODOs</div>
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
            <span className="text-gray-700 flex-1">{todo.text}</span>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="ml-3 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimpleTodo
