import { useState } from "react";
import axios from "axios";
import AppNavbar from "../components/Navbar";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !amount || !category || !date) {
      setMessage("All fields are required!");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage("Amount should be a positive number.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User is not authenticated. Please log in again.");
      return;
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
const currentTime = Math.floor(Date.now() / 1000);

if (decodedToken.exp < currentTime) {
  setMessage("Session expired. Please log in again.");
  localStorage.removeItem("token"); // Clear token
  return;
}

    const expenseData = {
      title,
      amount: parsedAmount, // Ensure amount is a number
      category,
      date,
    };

    console.log("Sending data:", expenseData);
    console.log("Sending request with token:", token);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/expense/add-expense",
        expenseData,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      console.log("Expense Added:", response.data);
      setMessage(response.data.message);

      // Clear form after successful submission
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense:", error);

      if (error.response) {
        console.log("Server Response:", error.response.data);
        setMessage(error.response.data.message || "Error adding expense");
      } else {
        setMessage("Network error. Please check your server.");
      }
    }
  };

  return (
    <div>
      <AppNavbar />
      <div className="container mt-4">
        <h2>Add Expense</h2>
        {message && <p className="alert alert-info">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Amount:</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category:</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Rent">Rent</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Date:</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
