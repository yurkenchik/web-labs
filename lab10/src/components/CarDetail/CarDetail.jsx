import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CarService } from '../../services/CarService';
import './CarDetail.css';
import {addGoodToBucket} from "../../store/slices/BucketSlice";
import {useDispatch} from "react-redux";

const carService = new CarService();

function CarDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Hook to dispatch Redux actions
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [counter, setCounter] = useState(1);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAddToBucket = () => {
        const bucketItem = {
            carId: car.id,
            quantity: counter,
        };
        dispatch(addGoodToBucket(bucketItem));
    };

    useEffect(() => {
        const fetchCar = async () => {
            try {
                setLoading(true);
                const fetchedCar = await carService.getCarById(id);
                setCar(fetchedCar);
            } catch (err) {
                console.error("Error fetching car details:", err);
                setError("Failed to load car details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!car) {
        return <p>No car found.</p>;
    }

    const totalPrice = car.price * counter;

    return (
        <section className="car-detail">
            <img className="car-image" src={car.imageUrl} alt={car.model} />
            <h2>{car.model}</h2>
            <p><strong>Price:</strong> ${totalPrice}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Country:</strong> {car.country}</p>

            <div className="counter">
                <p><strong>items:</strong> {counter}</p>
                <button className="car-detail-button" onClick={() => setCounter(counter + 1)}>add</button>
                <button
                    className="car-detail-button"
                    onClick={() => {
                        if (counter > 1) {
                            setCounter(counter - 1);
                        }
                    }}
                >
                    remove
                </button>
            </div>
            <button onClick={handleGoBack}>Go back</button>
            <button onClick={handleAddToBucket}>Add to bucket</button>
        </section>
    );
}

export default CarDetail;
