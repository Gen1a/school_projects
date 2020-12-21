import React from 'react';
import { store } from '../store';
import { decrementByValue, incrementByValue } from '../store/counter/actions';
import ShowValue from './ShowValue';

// In deze Child component wordt de waarde in de state verhoogd met een gegeven value nl. 5
// Dit wordt opnieuw gedaan door middel van een action incrementByValue te dispatchen naar de store

// MAAK ONDER DE BUTTON MET INCREMENTBYVALUE EEN NIEUWE BUTTON AAN MET DECREMENTBYVALUE 
// DISPATCH DAN OOK DE AANGEMAAKTE DECREMENTBYVALUE ACTION MET ALS WAARDE 5

const Child = () => {

    return (
        <div style={{borderStyle: "solid", borderWidth: 4, padding: 10, margin: 10}}>
            <h2>Child</h2>
            <button onClick={() => store.dispatch(incrementByValue(5)) }>Increment with five</button>

            {
                /*
                    MAAK HIERONDER EEN BUTTON Decrement with five AAN EN MET ALS ACTIE
                    HET DISPATCHEN VAN DE AANGEMAAKTE decrementByValue ACTION MET WAARDE 5
                */
            }
            <button onClick={() => store.dispatch(decrementByValue(5)) }>Decrement with five</button>
            
            <ShowValue />
        </div>
    )
}

export default Child
