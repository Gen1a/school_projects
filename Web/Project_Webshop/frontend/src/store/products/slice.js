import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Deal with asynchronous code
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios({
        method: 'GET',
        url: `http://localhost:3000/products`
    });
    return response;
});

// createSlice() accepts an initial state and a lookup table with reducer names and functions
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle'
    },
    // define asyncThunkReducer states
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.status = 'loading';
            state.products = [];
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload.data;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = 'failed';
            state.products = [];
        }
    }
});

export const { actions, reducer } = productsSlice;