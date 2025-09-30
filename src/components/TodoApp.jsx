import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateTask } from "../redux/taskslice";

export default function TodoApp() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!task) return;
    if (editIndex !== null) {
      dispatch(updateTask({ index: editIndex, newTask: task }));
      setEditIndex(null);
    } else {
      dispatch(addTask(task));
    }
    setTask("");
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };
  const handleDelete = (index) => {
    confirm('Are you Sure')
    dispatch(deleteTask(index));
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-5xl font-extrabold mb-8 text-purple-400 drop-shadow-lg">Redux To-Do App</h1>


      <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full max-w-md">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Task"
         className="input input-bordered input-lg w-full rounded-xl p-5 bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700 focus:outline-indigo-400 shadow-md"
        />
        <button   className="btn btn-lg p-5 rounded-2xl  bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-105 transition-transform"
        
         onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="w-full max-w-md space-y-4">
        {tasks.map((t, index) => (
          <li key={index} className="flex justify-between items-center p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"

          >
            <span  className="text-lg text-gray-200 font-medium" > {t}</span>
           
            <div className="flex gap-8">
             <button onClick={() => handleEdit(index)}  className="btn btn-soft btn-warning text-white hover:scale-110 transition-transform">Edit</button>
            <button className="btn btn-sm btn-error text-white hover:scale-110 transition-transform"
             onClick={() => handleDelete(index)}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
