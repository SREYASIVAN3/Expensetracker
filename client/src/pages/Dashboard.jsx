import React ,{useEffect,useState}from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col,Button} from "react-bootstrap";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import AppNavbar from "../components/Navbar";
import { Link } from "react-router-dom"; 


const Dashboard=()=>{
    const [userName, setUserName]=useState("");
    const [expenses,setExpenses]=useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");  
      navigate("/");
  };
    

  useEffect(() => {
   
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Retrieved User from LocalStorage:", user);

    if (!user.token) {
        console.error("No token found. Redirecting to login.");
        navigate("/");  
        return;
        }
    
        setUserName(user.name);
    
        axios.get("http://localhost:8000/api/expenses", {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then((res) => {
            console.log("Fetched Expenses:", res.data); 

            if (Array.isArray(res.data.expenses)) {
              setExpenses(res.data.expenses);
          } else {
              console.error("Unexpected data format:", res.data);
              setExpenses([]);
          }
          })
          .catch((err) => console.error("Error fetching expenses:", err));
      }, [navigate]);
    
      return (
        <div>
       <AppNavbar /> 
       

        <Container className="mt-4">

        <button 
                onClick={handleLogout} 
                className="btn btn-dark" 
                style={{ position: "absolute", top: "10px", right: "10px" }}
            >
                Logout
            </button>
          <h2 className="text-center">Hi, {userName||"User"} </h2>
          <div className="text-center mt-3">
                    <Link to="/my-expenses">
                        <Button variant="primary">Go to My Expenses</Button>
                    </Link>
                </div>
          <Row className="mt-4">
            <Col md={6}>
              <PieChart expenses={expenses} />
            </Col>
            <Col md={6}>
              <BarChart expenses={expenses} />
            </Col>
          </Row>
          
        </Container>
        </div>
      );
    };



export default Dashboard;
