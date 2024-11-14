import React from "react";
import "./ProductItem.css";

function ProductItem({ product }) {
    return (
        <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Owner:</strong> {product.owner}</p>
            <p><strong>Country:</strong> {product.country}</p>
        </div>
    )
}

export default ProductItem;