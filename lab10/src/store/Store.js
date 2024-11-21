import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slices/CarSlice';
import bucketReducer from './slices/BucketSlice';

const store = configureStore({
    reducer: {
        car: carReducer,
        bucket: bucketReducer
    },
});

export default store;