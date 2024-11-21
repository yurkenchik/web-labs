// components/CarList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {fetchCars, setSearchTerm, setSortOrder} from "../../store/slices/CarSlice";
import CatalogFilterPanel from "../CatalogFilterPanel/CatalogFilterPanel";
import CarItem from "../CarItem/CarItem";

const CarList = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { cars, loading, error, searchTerm, sortOrder } = useSelector((state) => state.car);

    const [visibleCounter, setVisibleCounter] = useState(4);

    const filteredCars = cars;  // Assume filtering logic here, if any
    const visibleCars = filteredCars.slice(0, visibleCounter);

    useEffect(() => {
        dispatch(fetchCars({ searchTerm, sortOrder }));
    }, [dispatch, searchTerm, sortOrder]);

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleSortChange = (e) => {
        dispatch(setSortOrder(e.target.value));
    };

    const handleViewMore = () => {
        setVisibleCounter(prev => prev + 4);
    };

    const handleViewLess = () => {
        setVisibleCounter(prev => Math.max(4, prev - 4));
    };

    return (
        <section className="car-list-section">
            <h2>Car Catalog</h2>

            {/* Render filter panel only in the catalog page */}
            {location.pathname === "/catalog" && (
                <CatalogFilterPanel
                    onSearchChange={handleSearchChange}
                    onSortChange={handleSortChange}
                    searchTerm={searchTerm}
                    sortOrder={sortOrder}
                />
            )}

            <div className="car-grid">
                {(location.pathname === "/" ? visibleCars : filteredCars).length > 0 ? (
                    (location.pathname === "/" ? visibleCars : filteredCars).map((car) => (
                        <CarItem key={car.id} car={car} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            {/* Pagination controls for homepage */}
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
};

export default CarList;
