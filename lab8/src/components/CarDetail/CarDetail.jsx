import React, { useContext } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { CarContext } from '../../context/CarContext';
import './CarDetail.css';

function CarDetail() {
    const { id } = useParams();
    const { filteredCars } = useContext(CarContext);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    const car = filteredCars ? filteredCars.find((car) => car.id === Number(id)) : null;

    return (
        <section className="car-detail">
            {car ? (
                <>
                    <img className="car-image" src={car.imageUrl} alt=""/>
                    <h2>{car.model}</h2>
                    <p><strong>Price:</strong> ${car.price}</p>
                    <p><strong>Year:</strong> {car.year}</p>
                    <p><strong>Country:</strong> {car.country}</p>
                    <p><strong>Description:</strong> {car.description}</p>
                    <button onClick={handleGoBack}>Go back</button>
                </>
            ) : (
                <p>Car not found.</p>
            )}
        </section>
    );
}

export default CarDetail;
