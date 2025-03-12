import React from "react";
import {useState} from "react";
import {useNavigate} from"react-router-dom";
import axios from"axios";

const Signup=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword] = useState("")
    const navigate =useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/auth/signup", {
                name,
                email,
                password
            });
    
            console.log("Signup Response:", response.data);
    
            if (response.data.token) {
                const userData = { token: response.data.token, name: response.data.user?.name || "User" };
            
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(userData));  // ✅ Always store valid JSON
            
                navigate("/");
            }
             else {
                console.error("Token not received from the server!");
            }
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
            
            if (error.response?.data?.message === "User already exist") {
                alert("This email is already registered. Please login or use another email.");
            } else {
                alert("Signup failed! Please check your details.");
            }
        }
    };
    

    return(
        <div className="container mt-5">
            <h2>SIGN UP</h2>
            <form onSubmit={handleSignup}>
            <div className="mb-9">
                <label>Name</label>
                <input type="name" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}required/>
          </div>
          <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}required/>
          </div>
          <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}required/>
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>

        </div>
    )
}

export default Signup;
