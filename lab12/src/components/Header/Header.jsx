import React from 'react';
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="logo"></div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/bucket">Bucket</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/register">Sign Up</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;