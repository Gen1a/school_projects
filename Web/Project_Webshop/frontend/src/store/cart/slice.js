import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'empty'
    },
    reducers: {
        addProduct: (state, action) => {
            const formatNewItem = (item) => ({...item, quantity: 1});
            // if cart contains items
            if (state.items.length !== 0)   
            {
                // check if item already in cart
                const itemIndex = state.items.findIndex(product => product._id === action.payload._id);
                if (itemIndex === -1) {
                    const newItem = formatNewItem(action.payload);
                    state.items.push(newItem);
                }
                else{
                    state.items[itemIndex].quantity += 1;
                }
            }
            // if cart contains NO items
            else{
                const newItem = formatNewItem(action.payload);
                state.items.push(newItem);
            }
            state.status = 'filled';
        },
        removeProduct : (state, action) => {
            const { _id } = action.payload;
            state.items = state.items.map((item) => {
                if (item._id === _id){
                    item.quantity -= 1;
                }
                return item;
            });
            // delete items with quantity 0 from cart
            state.items = state.items.filter(item => item.quantity !== 0);
            // if cart empty after removing product, set status to empty
            if (state.items.length === 0) state.status = 'empty';
        },
        removeAllProductsWithId : (state, action) => {
            const { _id } = action.payload;
            state.items = state.items.filter(item => item._id !== _id);
            if (state.items.length === 0) state.status = 'empty';
        }
    }
});

export const { actions, reducer } = cartSlice;
export const { addProduct, removeProduct, removeAllProductsWithId } = actions;