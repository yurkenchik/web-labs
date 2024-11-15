import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slices/CarSlice';

const store = configureStore({
    reducer: {
        car: carReducer,
    },
});

export default store;