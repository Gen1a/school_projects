import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';
import { reducer as productsReducer } from './products/slice';
import { reducer as cartReducer } from './cart/slice';
import {throttle} from 'lodash';

// Create rootreducer which combines every defined reducer
const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
});

// Check if state is saved in localstorage
const loadedStateFromLocalStorage = loadState();

// Export and configure store
export const store = configureStore({ 
    reducer: rootReducer,
    preloadedState: loadedStateFromLocalStorage,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

// Create a throttled function that only invokes func at most once per every wait milliseconds
store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));