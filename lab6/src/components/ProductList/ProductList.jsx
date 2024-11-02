import React from 'react';
import './ProductList.css';
import {products} from "../../utils/products";

function ProductList() {
    return (
        <section className="product-list-section">
            <h2>Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h3>{product.title}</h3>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Description:</strong> {product.description}</p>
                        <p><strong>Owner:</strong> {product.owner}</p>
                        <p><strong>Country:</strong> {product.country}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProductList;

