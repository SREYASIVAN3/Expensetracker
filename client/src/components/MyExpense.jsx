import React, { useState, useEffect } from "react";
import axios from "axios";
import AppNavbar from "../components/Navbar";
import { Table, Button, Pagination, Modal, Form } from "react-bootstrap";

const MyExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingExpense, setEditingExpense] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        fetchExpenses(); 
    }, [page]);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8000/api/expenses?page=${page}&limit=10`, {

                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Backend Response:", response.data);

            if (response.data.totalExpenses !== undefined) {
                setTotalPages(Math.ceil(response.data.totalExpenses / 10));                
            } else {
                console.error("totalExpenses is undefined in API response");
            }
            setExpenses(response.data.expenses || []);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8000/api/delete-expense/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchExpenses(page);
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:8000/api/update-expense/${editingExpense._id}`, 
                editingExpense, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowModal(false);
            fetchExpenses();  // Refresh the list after updating
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    return (
        <div>
            <AppNavbar />
            <h2>My Expenses</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense._id}>
                            <td>{expense.title}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{new Date(expense.date).toLocaleDateString()}</td>
                            <td>
                                <Button 
                                    variant="warning" 
                                    size="sm" 
                                    onClick={() => {
                                        setEditingExpense(expense);
                                        setShowModal(true);
                                    }}
                                >
                                    Edit
                                </Button>{' '}
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => handleDelete(expense._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    
            {/* Pagination */}
            <Pagination className="justify-content-center">
                <Pagination.Prev 
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
                    disabled={page === 1} 
                />
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <Pagination.Item 
                        key={pageNumber} 
                        active={pageNumber === page} 
                        onClick={() => {
                            if (page !== pageNumber) {
                                setPage(pageNumber);
                            }
                        }}
                    >
                        {pageNumber}
                    </Pagination.Item>
                ))}
    
                <Pagination.Next 
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={page === totalPages} 
                />
            </Pagination>
    
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingExpense && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={editingExpense.title} 
                                    onChange={(e) => setEditingExpense({...editingExpense, title: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={editingExpense.amount} 
                                    onChange={(e) => setEditingExpense({...editingExpense, amount: e.target.value})}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyExpenses;