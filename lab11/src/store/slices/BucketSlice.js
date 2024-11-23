import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {BucketService} from "../../services/BucketService";
import {CarService} from "../../services/CarService";

const bucketService = new BucketService();
const carService = new CarService();

export const fetchBucketItems = createAsyncThunk(
    'bucket/fetchBucketItems',
    async () => {
        const response = await bucketService.getBuckets();
        console.log("API Response:", response);
        return response;
    }
);

export const addGoodToBucket = createAsyncThunk(
    'bucket/addGoodToBucket',
    async (addGoodToBucketDto) => {
        const response = await bucketService.addGoodToBucket(addGoodToBucketDto);
        alert(`${addGoodToBucketDto.quantity} items added successfully`);
        return response;
    }
);

export const removeGoodFromBucket = createAsyncThunk(
    'bucket/removeGoodFromBucket',
    async (bucketItemId) => {
        const response = await bucketService.removeGoodFromBucket(bucketItemId);
        alert(`1 item was removed`);
        return response;
    }
);

export const deleteBucketItem = createAsyncThunk(
    'bucket/deleteBucketItem',
    async (bucketItemId) => {
        await bucketService.deleteBucketItem(bucketItemId);
        alert("car was removed from bucket");
        return bucketItemId;
    }
);

export const updateBucketItem = createAsyncThunk(
    'bucket/updateBucketItem',
    async (carId, updateCarDto) => {
        await carService.updateCar(carId, updateCarDto);
        alert("car was updated successfully");
    }
)

const bucketSlice = createSlice({
    name: 'bucket',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBucketItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBucketItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBucketItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addGoodToBucket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addGoodToBucket.fulfilled, (state, action) => {
                state.loading = false;
                const existingItem = state.items.find((item) => item.id === action.payload.id);
                if (existingItem) {
                    existingItem.quantity += action.payload.quantity;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(addGoodToBucket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeGoodFromBucket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeGoodFromBucket.fulfilled, (state, action) => {
                state.loading = false;
                const item = state.items.find((item) => item.id === action.payload.id);
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity <= 0) {
                        state.items = state.items.filter((i) => i.id !== action.payload.id);
                    }
                }
            })
            .addCase(removeGoodFromBucket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteBucketItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBucketItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteBucketItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default bucketSlice.reducer;
