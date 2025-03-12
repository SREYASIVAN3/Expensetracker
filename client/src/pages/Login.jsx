import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from"axios";

const Login=({ setToken })=>{
    const [email,setEmail]=useState("");
    const [password,setPassword] = useState("")
    const navigate =useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login",{email,password})
            console.log("Login Response:", response.data);

            if (response.data.token) {
                const userData = { token: response.data.token, name: response.data.user?.name || "User" };
            
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(userData));  
                setToken(response.data.token); 
                navigate("/dashboard");
            
            
            } else{
                console.error("No token received from server");}
                
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            alert("Invalid Credentials")
        }
    }

    return(
        <div className="container mt-5">
            <h2>LOGIN</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}required/>
                </div>
              
                <div className="mb-3">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}required/>
                </div>
                  
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            <p className="mt-3">
                Dont have an account <a href="/signup">Sign Up</a>
            </p>
        </div>
    )
}

export default Login; 