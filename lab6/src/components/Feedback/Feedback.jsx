import React from 'react';
import "./Feedback.css";

function Feedback() {
    return (
        <section className="feedback-section">
            <h2>Feedbacks</h2>
            <div className="feedback-grid">
                <div className="feedback-card">
                    <h2>Вілен Соловей</h2>
                    <p>Я задоволений, взагалі шикос</p>
                </div>
                <div className="feedback-card">
                    <h2>Назарій Скібицький</h2>
                    <p>Можна було б краще</p>
                </div>
                <div className="feedback-card">
                    <h2>Максим Гриньків</h2>
                    <p>В кого є 6 лабка?</p>
                </div>
            </div>
        </section>
    );
}

export default Feedback;
