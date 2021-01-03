import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        status: 'empty',
        totalAmountOfItems: 0
    },
    reducers: {
        addProduct: (state, action) => {
            // check if item already on wishlist
            const itemIndex = state.items.findIndex(product => product._id === action.payload._id);
            if (itemIndex === -1) {
                const newItem = action.payload;
                state.items.push(newItem);
                state.status = 'filled';
                state.totalAmountOfItems += 1;
            }
        },
        removeProduct : (state, action) => {
            const { _id } = action.payload;
            state.items = state.items.filter(item => item._id !== _id);
            state.totalAmountOfItems -= 1;
            if (state.totalAmountOfItems === 0) state.status = 'empty';
        },
    }
});

export const { actions, reducer } = wishlistSlice;
export const { addProduct, removeProduct } = actions;