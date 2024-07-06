import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";

interface ToDo {
  todo_id: number;
  description: string;
}

const ToDoApp: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://todo-pern-n60f.onrender.com/api/v1/todo/all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setToDos(response.data.todos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    if (task.trim()) {
      try {
        const response = await axios.post(
          "https://todo-pern-n60f.onrender.com/api/v1/todo/add",
          { description: task },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setToDos([...toDos, response.data.newTodo]);
        setTask("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const startEditTask = (todo: ToDo) => {
    setIsEditing(todo.todo_id);
    setEditTask(todo.description);
  };

  const updateTask = async (id: number) => {
    if (editTask.trim()) {
      try {
        const response = await axios.put(
          `https://todo-pern-n60f.onrender.com/api/v1/todo/${id}/update`,
          { description: editTask },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setToDos(
          toDos.map((todo) =>
            todo.todo_id === id
              ? { ...todo, description: response.data.updatedTodo.description }
              : todo
          )
        );
        setIsEditing(null);
        setEditTask("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const removeTask = async (id: number) => {
    try {
      await axios.delete(`https://todo-pern-n60f.onrender.com/api/v1/todo/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setToDos(toDos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          To-Do List
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 flex-grow rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors">
            Add
          </button>
        </div>
        <ul>
          {toDos.map((todo) => (
            <Transition
              key={todo.todo_id}
              appear={true}
              show={true}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <li className="flex justify-between items-center mb-2 bg-gray-100 p-2 rounded-md shadow-sm">
                {isEditing === todo.todo_id ? (
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    className="border p-2 flex-grow rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Edit task"
                  />
                ) : (
                  <span>{todo.description}</span>
                )}
                <div>
                  {isEditing === todo.todo_id ? (
                    <button
                      onClick={() => updateTask(todo.todo_id)}
                      className="bg-green-500 text-white p-1 rounded-md hover:bg-green-600 transition-colors ml-2">
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditTask(todo)}
                      className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 transition-colors ml-2">
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => removeTask(todo.todo_id)}
                    className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition-colors ml-2">
                    Remove
                  </button>
                </div>
              </li>
            </Transition>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoApp;
