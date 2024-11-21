import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Bucket.css';
import BucketItem from "../BucketItem/BucketItem";
import {
    deleteBucketItem,
    fetchBucketItems,
    removeBucketItem,
    removeGoodFromBucket
} from "../../store/slices/BucketSlice";

const Bucket = () => {
    const dispatch = useDispatch();
    const [bucket, setBucket] = useState([]);

    const bucketItems = useSelector((state) => state.bucket.items);
    console.log("bucket items", bucketItems);
    const isLoading = useSelector((state) => state.car.loading);

    useEffect(() => {
        dispatch(fetchBucketItems());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteBucketItem(id));
    };

    const handleRemoveBucketItem = (id) => {
        dispatch(removeGoodFromBucket(id));
    }

    if (isLoading) {
        return <p className="bucket-loading">Loading your bucket...</p>;
    }

    if (!bucketItems.length) {
        return <p className="bucket-empty">Your bucket is empty!</p>;
    }

    const totalCost = bucketItems.reduce((sum, item) => {
        const price = typeof item.car.price === 'string'
            ? parseFloat(item.car.price.split("$")[1]) || 0
            : item.car.price || 0;

        const quantity = item.car.quantity || 0;
        return sum + price * quantity;
    }, 0);

    return (
        <section className="bucket">
            <h2>Your Bucket</h2>
            <div className="bucket-items">
                {bucketItems.map((item) => (
                    <BucketItem
                        key={item.id}
                        item={item}
                        onDelete={handleDelete}
                        onRemoveItem={handleRemoveBucketItem}
                    />
                ))}
            </div>
            <div className="bucket-total">
                <h3>Total Cost: ${totalCost}</h3>
            </div>
        </section>
    );
};

export default Bucket;
