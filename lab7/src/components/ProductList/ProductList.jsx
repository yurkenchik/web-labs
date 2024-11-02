import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { products as initialProducts } from "../../utils/products";
import CatalogFilterPanel from './../CatalogFilterPanel/CatalogFilterPanel';

function ProductList() {
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

    useEffect(() => console.log(), [sortOrder]);

    return (
        <section className="product-list-section">
            <h2>Products</h2>
            <CatalogFilterPanel
                onSortChange={setSortOrder}
                onSearchChange={setSearchTerm}
            />
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <h3>{product.title}</h3>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Owner:</strong> {product.owner}</p>
                            <p><strong>Country:</strong> {product.country}</p>
                        </div>
                    ))
                ) : (
                    <p>No products match your criteria.</p>
                )}
            </div>
        </section>
    );
}

export default ProductList;
