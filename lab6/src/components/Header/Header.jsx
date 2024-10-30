import React from 'react';
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="logo"></div>
            <nav>
                <ul>
                    <li><a href="/lab6/lab6-app/public">Home</a></li>
                    <li><a href="/about/about">Background history</a></li>
                    <li><a href="/services">Catalog</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;