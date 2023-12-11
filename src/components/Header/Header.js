import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../venn_city_logo.jpeg';
import React from 'react';
import {Link} from 'react-router-dom'; // If using React Router for navigation
const Header = () => {
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" width="30" height="30"
                         className="d-inline-block align-top me-2"/>
                    Neighbors Movie Night
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Movies Search</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;