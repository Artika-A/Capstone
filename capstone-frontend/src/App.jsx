import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/HomeLogin'
import HomeRegister from './pages/HomeRegister'
import TaskManager from './pages/TaskManager'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'

function App() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      setIsLoggedIn(!!jwt);
    },[]);

    const handleLogout = () => {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      navigate("/login");
    };
  

  return (
    <>
      <nav className= "navbar">
        <div className="nav-container">
          <Link to="/" className="nav-link">Home</Link>

          {isLoggedIn ? (
            <>
             <Link to ="/tasks" className="nav-link">Tasks</Link>  
             <Link to="/dashboard" className='nav-link'>Dashboard</Link>           
             <button onClick={handleLogout} className="logout-button">Logout</button>

            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link> 
              <Link to="/register" className="nav-link">Register</Link> 
            </>         
            )}
         </div>         
      </nav>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<Home />}/>
          <Route path="/register" element={<HomeRegister />}/>
          <Route path="/tasks" element={<TaskManager />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
