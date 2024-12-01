import React, { createContext, useState, useEffect } from 'react';
import { CarService } from "../services/CarService";

export const CarContext = createContext();

const carService = new CarService();

export const CarProvider = ({ children }) => {
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCars = async () => {
        setLoading(true);
        setError(null);

        const filterOptions = {
            searchTerm: searchTerm.trim() || null,
            sortOrder: sortOrder || "asc"
        };

        try {
            const cars = await carService.getCars(filterOptions);
            setFilteredCars(cars);
        } catch (err) {
            console.error("Error fetching cars:", err);
            setError("Failed to fetch cars");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [searchTerm, sortOrder]);

    return (
        <CarContext.Provider value={{
            filteredCars,
            searchTerm,
            setSearchTerm,
            sortOrder,
            setSortOrder,
            loading,
            error,
            fetchCars
        }}>
            {children}
        </CarContext.Provider>
    );
};
