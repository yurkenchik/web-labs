import React from 'react';
import {Link} from 'react-router-dom';
import './CarItem.css';

function CarItem({ car }) {
    return (
        <div className="car-card">
            <img src={car.imageUrl} alt=""/>
            <h3>{car.model}</h3>
            <p><strong>Price:</strong> ${car.price}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Country:</strong> {car.country}</p>
            <Link to={`/car/${car.id}`} className="details-link">View Details</Link>
        </div>
    );
}

export default CarItem;
