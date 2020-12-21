// REDUCER FILE

// DE OUDE MANIER OM DIT TE DOEN - WIJ GAAN DIT NIET MEER GEBRUIKEN
// DIT IS OM TE SNAPPEN WAT ER ACHTER DE SCHERMEN GEBEURT

// Importeren van de action types om deze te kunnen gebruiken in onze reducers
import { INCREMENT, INCREMENT_BY_VALUE, DECREMENT, DECREMENT_BY_VALUE } from './actions';

// Dit is de initiële state die aan de reducer moet meegegeven worden, 
// dit kan een value zijn maar evengoed een object (zoals hier) of een array.
const initialState = {
    value: 0
};

// Dit is de reducer - die zal zorgen dat de actions opgevangen worden en de state zal wijzigigen 
// aan de hand van de action en de data die meegegeven is met de actions.
// Twee argumenten: de huidige state en een action
// De reducer geeft een nieuwe state terug waarbij de aanpassingen gebeurd zijn
// OPGELET: De state moet steeds op een immutable manier aangepast worden (OBJECTEN & ARRAYS)
export const counterReducer = (state = initialState, action) => {
    // Met de switch gaan we checken welke action opgeroepen is geweest 
    switch (action.type) {
        // Action type == INCREMENT
        // Dus we gaan de state verhogen met 1
        case INCREMENT:
            // IMMUTABLE MANIER
            return {...state, value: state.value + 1};
        // Action type == INCREMENT_WITH_VALUE
        // Dus we gaan de state verhogen met een meegegeven value in de action payload
        case INCREMENT_BY_VALUE:
            // IMMUTABLE MANIER
            return {...state, value: state.value + action.payload};
        // Action type == DECREMENT
        // Dus we gaan de state verlagen met 1
        case DECREMENT:
            // IMMUTABLE MANIER
            return {...state, value: state.value - 1};
        // Action type == INCREMENT_WITH_VALUE
        // Dus we gaan de state verhogen met een meegegeven value in de action payload
        case DECREMENT_BY_VALUE:
            return {...state, value: state.value - action.payload};
        // SCHRIJF HIER DE ONTBREKENDE REDUCER VOOR DE DECREMENT WITH VALUE
        // VERGEET DEZE OOK NIET TE IMPORTEREN

        // Deze reducer geeft steeds een state terug
        default:
            return state;
    }
}