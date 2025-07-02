import { useState, useEffect } from "react";
import "./Home.css";
import { FaUser,FaLock } from "react-icons/fa";

const baseUrl = "http://localhost:3000";

export default function HomeRegister() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    

     const register = async (e) => {
        e.preventDefault() 
        if (!email || !password) return alert("Enter email and password.");


    try {
        const res = await fetch(baseUrl + "/auth/register", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ email, password })
    });

    const data = await res.json().catch(() => { throw new Error("Invalid JSON"); });

    if (res.ok) {
      alert("Registered! Please login");
      localStorage.setItem("jwt", data.token);
      window.location.href = "/login";
    } else {
      throw new Error(data.message || "Registration failed");
    }
  
    } catch (err) {
    alert(err.message);
  }
};



    return (
        <div>
            <div className="loginRegister">
                <h1>Hello,</h1>
                <p> Register. Take Control. Let’s Get Productive.</p>
                 <div className="wrapper">      
                    <h3>Fast, free, and built for your flow!</h3>
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
                            <input type="submit" id="loginBtn" onClick={register}/>  
                        <br />
                        <div className="register-link">
                             <p>Already have an account? <a href="/login">Login</a></p>  
                        </div>        
                    </form>                   
                </div>
          </div>
     </div>
  )

}











