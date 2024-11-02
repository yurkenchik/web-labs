import React from 'react';
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Email: yura.ilchyshyn06@gmail.com</p>
                <p>Phone: +380 95 083 37 97</p>

                <div className="social-media">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; THANK YOU FOR ATTENDING OUR WEBSITE!</p>
            </div>
        </footer>
    );
};

export default Footer;