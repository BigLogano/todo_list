import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react"; // or 'react-icons/fa', etc.
import { createTodo, getAllTodos, updateTodo, deleteTodo } from "../axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  //fetch tasks from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await getAllTodos();
        setTasks(todos);
        console.log(todos);
      } catch (error) {
        console.log("failed to fetch todos", error);
      }
    };
    fetchData();
  }, []);

  //handle adding Tasks
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const todo = await createTodo({ title: newTask });
      setTasks((prev) => [...prev, todo]);
      setNewTask("");
    } catch (error) {
      console.log("failed to add todos", error);
    }
  };

  //handle task completion
  const handleToggleCompleter = async (task) => {
    try {
      const updated = await updateTodo(task._id, {
        isCompleted: !task.isCompleted,
      });
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, isCompleted: updated.isCompleted } : t
        )
      );
    } catch (error) {
      console.log("failed to update todos", error);
    }
  };

  //handle deleting tasks
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log("failed to delete todos", error);
    }
  };

  const completedTasks = tasks.filter((task) => task.isComplete).length;
  const totalTasks = tasks.length;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">To Do List</h1>
        <p className="text-gray-600">
          You have {completedTasks} out of {totalTasks} tasks
        </p>
      </div>

      {/* adding a task */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 hover:shadow-lg"
          >
            <Plus />
            <p>Add</p>
          </button>
        </div>
      </div>

      {/* task list */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleCompleter(task)}
                  className="h-5 w-5 rounded border-gray-300 focus:ring-blue-500"
                />
              </div>

              <span
                className={`text-lg ${
                  task.isCompleted
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {task.title}
              </span>

              <button
                onClick={() => handleDelete(task._id)}
                className="text-gray-500 hover:text-gray-600 transition-colors duration-200"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

//features i want to add:
//drag and dropable tasks for easy reordering
//when the enter key is pressed, the task will be added to the list if its not empty
//
