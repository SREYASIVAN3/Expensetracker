import React from "react";
import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyExpense from "./components/MyExpense";
import AddExpense from "./components/AddExpense";





function AppRouter(){
        const [token, setToken] = useState(localStorage.getItem("token") || "");
    
        useEffect(() => {
          const checkToken = () => {
              console.log("Checking localStorage for token:", localStorage.getItem("token"));
              setToken(localStorage.getItem("token") || "");
          };
  
          checkToken(); 
          window.addEventListener("storage", checkToken); 
  
          return () => {
              window.removeEventListener("storage", checkToken);
          };
      }, []);
  
  
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/"  element={<Login setToken={setToken}/>}/>  
            <Route path="/signup" element={<Signup />} />
            <Route path ="/dashboard" element={token ? <Dashboard /> : <Navigate to="/"/> }/>
            <Route path="/my-expenses" element={token ? <MyExpense /> : <Navigate to="/"/>}/>
            <Route path="/add-expense" element={token ? <AddExpense /> : <Navigate to="/" />}/>
           
            
            
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;

