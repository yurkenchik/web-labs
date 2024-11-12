import React, { createContext, useState, useEffect } from 'react';
import { cars } from "../utils/products";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        let updatedCars = [...cars];
        updatedCars.filter(car => car && car.name);
        const searchValue = searchTerm ? searchTerm.toLowerCase() : "";

        if (searchValue) {
            updatedCars = updatedCars.filter(car => {
                console.log(`Comparing "${car.name}" with "${searchValue}"`);
                return car.name && car.name.toLowerCase().includes(searchValue);
            });
        }

        updatedCars.sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );

        setFilteredCars(updatedCars);
    }, [searchTerm, sortOrder]);

    return (
        <CarContext.Provider value={{
            filteredCars,
            setFilteredCars,
            searchTerm,
            setSearchTerm,
            sortOrder,
            setSortOrder
        }}>
            {children}
        </CarContext.Provider>
    );
};
