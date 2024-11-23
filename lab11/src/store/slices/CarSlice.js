import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {CarService} from "../../services/CarService";

const carService = new CarService();

export const fetchCars = createAsyncThunk(
    'car/fetchCars',
    async ({ searchTerm, sortOrder }) => {
        const filterOptions = { searchTerm: searchTerm || null, sortOrder: sortOrder || 'asc' };
        const response = await carService.getCars(filterOptions);
        return response;
    }
);

const carSlice = createSlice({
    name: 'car',
    initialState: {
        cars: [],
        loading: false,
        error: null,
        searchTerm: "",
        sortOrder: "asc",
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;
                state.cars = action.payload;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSearchTerm, setSortOrder } = carSlice.actions;
export default carSlice.reducer;
