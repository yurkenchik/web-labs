import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {BucketService} from "../../services/BucketService";

const bucketService = new BucketService();

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
        return response;
    }
);

export const removeGoodFromBucket = createAsyncThunk(
    'bucket/removeGoodFromBucket',
    async (bucketItemId) => {
        const response = await bucketService.removeGoodFromBucket(bucketItemId);
        return response;
    }
);

export const deleteBucketItem = createAsyncThunk(
    'bucket/deleteBucketItem',
    async (bucketItemId) => {
        await bucketService.deleteBucketItem(bucketItemId);
        return bucketItemId;
    }
);

export const increaseGoodQuantityInBucket = createAsyncThunk(
    'bucket/increaseGoodQuantityInBucket',
    async (bucketItemId) => {
        const response = await bucketService.increaseBucketItemQuantity(bucketItemId);
        return response; // Assuming the API returns the updated quantity.
    }
);

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
            })
            .addCase(increaseGoodQuantityInBucket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(increaseGoodQuantityInBucket.fulfilled, (state, action) => {
                state.loading = false;
                const updatedItem = state.items.find((item) => item.id === action.payload.id);
                if (updatedItem) {
                    updatedItem.quantity = action.payload.quantity; // Update the quantity
                }
            })
            .addCase(increaseGoodQuantityInBucket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default bucketSlice.reducer;
