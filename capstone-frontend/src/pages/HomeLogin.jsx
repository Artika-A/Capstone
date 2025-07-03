import { useState, useEffect } from "react";
import "./Home.css";
import { FaUser,FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:3000";


export default function Home() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();


    const login = async (e) => {
        e.preventDefault();      
        if (!email || !password) return alert("Enter email and password.");

     try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json().catch(() => { throw new Error("Invalid JSON"); });

    if (!res.ok) throw new Error(data.message || "Login failed");
    localStorage.setItem("jwt", data.token);
    window.dispatchEvent(new Event("storage"));
    navigate("/tasks")
  } catch (err) {
    alert(err.message);
  }
};

    return (
        <div>
            <div className="loginRegister">
                <h1>Welcome back!</h1>
                <p> Let’s finish what we started.</p>
                 <div className="wrapper">      
                    <h3>Let’s make things happen. Sign in!</h3>
                    <form>
                        <div className="input-box">
                             <input 
                                type="email" 
                                 id="emailInput" 
                                onChange={(e) => setEmail(e.target.value)}
                                 placeholder="Email" />
                                <FaUser className="icon"/>
                        </div>
                        <br />
                        <div className="input-box">
                            <input 
                                type="password" 
                                id="passwordInput" 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password"/>
                                <FaLock className="icon"/>
                        </div>
                        <br />   
                            <input 
                            type="submit" id="loginBtn" onClick={login}/>  
                        <br />
                        <div className="register-link">
                             <p>Don't have an account? <a href="/register">Register</a></p>  
                        </div>        
                    </form>                   
                </div>
          </div>
     </div>
  )

}











