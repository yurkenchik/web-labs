import React, {useEffect, useState} from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import {UserService} from "../../services/UserService";
import {AuthService} from "../../services/AuthService";

function Header() {
    const [user, setUser] = useState(null);
    const userService = new UserService();
    const authService = new AuthService();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            userService.getUser()
                .then((userData) => setUser(userData))
                .catch((error) => new Error(error));
        }
    }, []);

    const handleLogout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem("token");
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <header className="header">
            <div className="logo"></div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {user ? (
                        <>
                            <li><Link to="/bucket">Bucket</Link></li>
                        </>
                    ) : null}
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    {user ? (
                        <>
                            <li className="user-header">{user.email}</li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/register">Sign Up</Link></li>
                            <li><Link to="/login">Sign In</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;