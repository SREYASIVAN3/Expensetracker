import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {Pie}from "react-chartjs-2";
import"chart.js/auto";
import{Card} from "react-bootstrap";


ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart =({expenses})=>{

    if (!Array.isArray(expenses)) {
        console.error("PieChart received invalid expenses:", expenses);
        return null; // Prevent rendering if data is not valid
    }
    const categoryData =  expenses.reduce((acc,expense)=>{
        acc[expense.category]=(acc[expense.category]||0) +expense.amount;
        return acc;
    },{});

    const pieChartData ={
        labels:Object.keys(categoryData),
        datasets:[
            {
                data:Object.values(categoryData),
                backgroundColor:["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            },
        ],
    };

    return(
        <Card className="p-3">
            <h5>Category Wise Expenses</h5>
            <Pie data={pieChartData}/>
        </Card>
    )
}

export default PieChart;
