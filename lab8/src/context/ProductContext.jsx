// src/context/ProductContext.js

import React, { createContext, useState, useEffect } from 'react';
import { products as initialProducts } from "../utils/products";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let updatedProducts = [...initialProducts];
        if (searchTerm) {
            const transformedSearchTerm = searchTerm.trim().toLowerCase();
            updatedProducts = updatedProducts.filter(product =>
                new RegExp(transformedSearchTerm).test(product.title.toLowerCase()) ||
                new RegExp(transformedSearchTerm).test(product.description.toLowerCase())
            );
        }
        if (sortOrder === 'asc') {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            updatedProducts.sort((a, b) => b.price - a.price);
        }
        setFilteredProducts(updatedProducts);
    }, [sortOrder, searchTerm]);

    return (
        <ProductContext.Provider
            value={{
                filteredProducts,
                setSortOrder,
                setSearchTerm,
                sortOrder,
                searchTerm,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
