// NOT USED IN THIS VERSION OF THE APPLICATION
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        first_name: '',
        last_name: '',
        email: '',
        telephone: '',
        address: '',
        postcal_code: '',
        city: '',
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.first_name = action.payload.voornaam;
            state.last_name = action.payload.achternaam;
            state.email = action.payload.email;
            state.telephone = action.payload.telefoon;
            state.address = action.payload.straat;
            state.postcal_code = action.payload.postcode;
            state.city = action.payload.gemeente;
        }
    }
});

export const { actions, reducer } = userSlice;
export const { setCurrentUser } = actions;