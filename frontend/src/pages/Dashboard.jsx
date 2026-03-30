import { useEffect, useState } from "react";
import API from "../services/api";
import '../App.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle('')
    fetchTasks();
  };

  const deleteTask = async id => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container" style={{width: '500px'}}>
      <h2> Dashboard </h2>
      <button onClick={logout}>Logout</button>
      <input 
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
      />
      <button onClick={addTask}>Add</button>
      <div style={{marginTop: '20px'}}>
        {tasks.map(t => (
        <div 
          key={t._id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '10px',
            background: '#eee',
            borderRadius: '6px'
          }}
        >
          <span> {t.title} </span>
          <button 
            onClick={() => deleteTask(t._id)} 
            style={{ width: '120px', height: '40px' }}
          > Delete </button>
        </div>
      ))}
      </div>
      
    </div>
  );
}