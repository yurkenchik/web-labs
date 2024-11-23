// // src/context/CarContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import { cars } from "../utils/products"; // Assuming this imports the list of cars
//
// export const CarContext = createContext();
//
// export const CarProvider = ({ children }) => {
//     const [filteredCars, setFilteredCars] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sortOrder, setSortOrder] = useState("asc");
//
//     useEffect(() => {
//         // Start with the full list of cars
//         let updatedCars = [...cars];
//
//         // Apply filtering
//         if (searchTerm) {
//             updatedCars = updatedCars.filter(car =>
//                 car.name.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
//
//         // Apply sorting
//         updatedCars.sort((a, b) =>
//             sortOrder === "asc" ? a.price - b.price : b.price - a.price
//         );
//
//         setFilteredCars(updatedCars);
//     }, [searchTerm, sortOrder]); // Run whenever searchTerm or sortOrder changes
//
//     return (
//         <CarContext.Provider value={{
//             filteredCars,
//             setFilteredCars,
//             searchTerm,
//             setSearchTerm,
//             sortOrder,
//             setSortOrder
//         }}>
//             {children}
//         </CarContext.Provider>
//     );
// };
