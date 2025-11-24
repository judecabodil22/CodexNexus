import React from 'react';

export default function NavigationBar() {
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">💰 BudgetMate</a>

        <ul className="navbar-nav d-flex flex-row ms-auto align-items-center">
          <li className="nav-item"><a className="nav-link px-3" href="#home">Dashboard</a></li>
          <li className="nav-item"><a className="nav-link px-3" href="#features">Expenses</a></li>
          <li className="nav-item"><a className="nav-link px-3" href="#pricing">Income</a></li>
          <li className="nav-item"><a className="nav-link px-3" href="#contact">Goals</a></li>
          <li className="nav-item"><a className="nav-link px-3" href="#contact">Reports</a></li>
        </ul>
      </div>
    </nav>
  );
}