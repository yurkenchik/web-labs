import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CarService } from '../../services/CarService';
import './CarDetail.css';
import { addGoodToBucket } from "../../store/slices/BucketSlice";
import { useDispatch } from "react-redux";

const carService = new CarService();

function CarDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Hook to dispatch Redux actions
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [counter, setCounter] = useState(1);
    const [year, setYear] = useState(""); // State for year input

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAddToBucket = () => {
        if (!year) {
            alert("Please enter a year before adding to the bucket.");
            return;
        }

        const bucketItem = {
            carId: car.id,
            quantity: counter,
            year,
        };
        dispatch(addGoodToBucket(bucketItem));
    };

    const handleCounterChange = (event) => {
        const value = Math.max(1, parseInt(event.target.value) || 1); // Ensure at least 1 item
        setCounter(value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
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

            {/* Year Input */}
            <div className="year-input">
                <label htmlFor="year-input"><strong>Enter Year:</strong></label>
                <input
                    id="year-input"
                    type="text"
                    value={year}
                    onChange={handleYearChange}
                    className="year-input-field"
                    placeholder="e.g., 2024"
                />
            </div>

            <div className="counter">
                <label htmlFor="item-counter"><strong>Items:</strong></label>
                <input
                    id="item-counter"
                    type="number"
                    value={counter}
                    min="1"
                    onChange={handleCounterChange}
                    className="counter-input"
                />
            </div>
            <button onClick={handleGoBack}>Go back</button>
            <button onClick={handleAddToBucket}>Add to bucket</button>
        </section>
    );
}

export default CarDetail;
