// CarList.js
import React, {useContext, useEffect, useState} from 'react';
import './CarList.css';
import { CarContext } from "../../context/CarContext";
import CarItem from "../CarItem/CarItem";
import CatalogFilterPanel from "../CatalogFilterPanel/CatalogFilterPanel";
import {useLocation} from "react-router-dom";

function CarList() {
    const { filteredCars, setSearchTerm, setSortOrder } = useContext(CarContext);
    const [visibleCounter, setVisibleCounter] = useState(4);
    const location = useLocation();

    useEffect(() => {
        setVisibleCounter(4);
    }, [location.pathname]);

    console.log(location.pathname);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleViewMore = () => {
        setVisibleCounter((prevState) => prevState + 4);
    }

    const handleViewLess = () => {
        setVisibleCounter((prevState) => prevState  - 4);
    }

    const visibleCars = filteredCars.slice(0, visibleCounter);

    return (
        <section className="car-list-section">
            <h2>Car Catalog</h2>
            {location.pathname === "/catalog" && (
                <CatalogFilterPanel
                    onSearchChange={handleSearchChange}
                    onSortChange={handleSortChange}
                />
            )}

            <div className="car-grid">
                {(location.pathname === "/" ? visibleCars : filteredCars).length > 0 ? (
                    (location.pathname === "/" ? visibleCars : filteredCars).map((car) => (
                        <CarItem key={car.id} car={car}/>
                    ))
                ) : (
                    <p>No cars match your criteria.</p>
                )}
            </div>

            {location.pathname === '/' && (
                <div className="button-container">
                    {visibleCounter < filteredCars.length && (
                        <button onClick={handleViewMore}>View More</button>
                    )}
                    {visibleCounter > 4 && (
                        <button onClick={handleViewLess}>View Less</button>
                    )}
                </div>
            )}
        </section>
    );
}

export default CarList;
