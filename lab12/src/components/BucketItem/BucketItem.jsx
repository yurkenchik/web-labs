import React from 'react';
import './BucketItem.css';

const BucketItem = ({ item, onRemoveItem, onDelete }) => {
    return (
        <div className="bucket-item">
            <img src={item.car.imageUrl} alt={item.car.model} className="bucket-item-image" />
            <div className="bucket-item-details">
                <h3>{item.car.model}</h3>
                <p><strong>Price:</strong> ${item.car.price}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Country:</strong> {item.car.country}</p>
                <p><strong>Year:</strong> {item.year}</p>
                <p><strong>Total:</strong> ${item.car.price * item.quantity}</p>
            </div>
            <button onClick={() => onRemoveItem(item.id)} className="bucket-item-delete">
                Remove
            </button>
            <button onClick={() => onDelete(item.id)}>
                Delete
            </button>
        </div>
    );
};

export default BucketItem;
