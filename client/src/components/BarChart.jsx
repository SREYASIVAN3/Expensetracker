import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import { Card } from "react-bootstrap";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart=({expenses})=>{

    if (!Array.isArray(expenses)) {
        console.error("BarChart received invalid expenses:", expenses);
        return null; 
    }
    const monthlyData=expenses.reduce((acc,expense)=>{
        const month = new Date(expense.date).toLocaleString("default",{
            month:"short",
        });
        acc[month] =(acc[month]||0)+expense.amount;
        return acc;
    },{});

    const BarChartData ={
        labels:Object.keys(monthlyData),
        datasets:[
            {
                label:"Monthly Expenses",
                data:Object.values(monthlyData),
                backgroundColor:"#36A2EB",
            },
        ],
    };

    return (
        <Card className="p-3">
        <h5>Monthly expenses</h5>
        <Bar data={BarChartData}/>
        </Card>
    )
}
export default BarChart;
