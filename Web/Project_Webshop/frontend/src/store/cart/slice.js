import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'empty',
        totalPrice: 0.0,
        totalAmountOfItems: 0
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
            state.totalPrice += action.payload.price;
            state.totalAmountOfItems += 1;
        },
        removeProduct : (state, action) => {
            const { _id, price } = action.payload;
            state.items = state.items.map((item) => {
                if (item._id === _id){
                    item.quantity -= 1;
                    state.totalPrice -= price;
                    state.totalAmountOfItems -= 1;
                }
                return item;
            });
            // delete items with quantity 0 from cart
            state.items = state.items.filter(item => item.quantity !== 0);
            // if cart empty after removing product, set status to empty
            if (state.items.length === 0) {
                state.status = 'empty';
                state.totalPrice = 0.0;
                state.totalAmountOfItems = 0;
            }
        },
        removeAllProductsWithId : (state, action) => {
            const { _id, quantity } = action.payload;
            state.totalAmountOfItems -= quantity;
            state.totalPrice = state.items.reduce((acc, val) => {
                if (val._id === _id)
                {
                    return acc - (val.price * val.quantity);
                }
                return acc;
            }, state.totalPrice);
            state.items = state.items.filter(item => item._id !== _id);
            if (state.items.length === 0){
                state.status = 'empty';
                state.totalPrice = 0.0;
                state.totalAmountOfItems = 0;
            }
        },
        reset : (state) => {
            state.items = [];
            state.status = 'empty';
            state.totalPrice = 0.0;
            state.totalAmountOfItems = 0;
        }
    }
});

export const { actions, reducer } = cartSlice;
export const { addProduct, removeProduct, removeAllProductsWithId, reset } = actions;