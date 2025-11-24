import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navigationbar from './components/NavigationBar';
import ExpenseCards from './components/ExpenseCards';
import Charts from './components/Charts';
import CRUD from './components/CRUD';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const App = () => {
    return (
        <>
            <body>
                <Navigationbar />
                <div className="container-fluid">
                    <ExpenseCards />
                    <Charts />
                    <CRUD />
                </div>
            </body>
        </>
    );
};

export default App;
