import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate("/");
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <ul className="nav">
          <li><Link to="/dashboard">Work Orders</Link></li>
          <li><Link to="/workload">Workload by Craft</Link></li>
          <li><Link to="/engineers">Engineer Profiles</Link></li>
          <li><Link to="/reports">Reports</Link></li>
        </ul>
      </div>

      <div className="header-right">
        <form className="search-form" role="search">
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <div className="dropdown">
          <button
            className="btn btn-outline-light dropdown-toggle"
            type="button"
            id="userMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            User
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end shadow"
            aria-labelledby="userMenuButton"
          >
            <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>

        <h2 className="brand-title">Flantrixx</h2>
      </div>
    </header>
  );
}

export default Header;

