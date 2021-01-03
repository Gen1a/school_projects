import { createSlice } from '@reduxjs/toolkit';

const shoppingModalSLice = createSlice({
    name: 'shoppingmodal',
    initialState: {
        title: '',
        body: '',
        status: '',
        showing: false,
        buttonContent: '',
        buttonLink: '',
    },
    reducers: {
        setShopContent: (state, action) => {
            if (state.status !== 'shopping'){
                state.status = 'shopping';
                state.title = 'Gelukt!';
                state.body = 'Het product is toegevoegd aan je winkelwagen.';
                state.buttonContent = 'Ik wil bestellen';
                state.buttonLink = '/shoppingcart';
                state.status = 'shopping';
            }
        },
        setWishlistContent : (state, action) => {
            if (state.status !== 'wishlist')
            {
                state.status = 'wishlist';
                state.title = 'Bewaard!';
                state.body = 'Het artikel is toegevoegd aan je verlanglijstje.';
                state.buttonContent = 'Bekijk verlanglijstje';
                state.buttonLink = '/wishlist';
                state.status = 'wishlist'
            }
        },
        showModal: state => { state.showing = true },
        hideModal: state => { state.showing = false }
    }
});

export const { actions, reducer } = shoppingModalSLice;
export const { setShopContent, setWishlistContent, showModal, hideModal } = actions;