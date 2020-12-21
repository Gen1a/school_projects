import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addOne, removeLast } from '../store/test/slice';

// Dispatchen van actions en het terugkrijgen van de state door gebruik te maken van de hooks 
const HookComponent = () => {

    // Dit is een hook om de dispatch te kunnen gebruiken van de store
    // zonder dat je telkens de store moet importeren en dan store.dispatch() op te roepen
    const dispatch = useDispatch();
    // Dit is een hook om de huidige state terug te krijgen van de store
    // Voor de hooks moest je dit koppelen met de props van de components wat we niet gaan zien
    // in deze lessen, ofwel subscriben naar de store zoals je kan zien als voorbeeld in 
    // ShowValue component.
    const counterState = useSelector(state => state.counter);
    const testState = useSelector(state => state.test);

    return (
        <div>
            <p>Counter value (using hooks): {counterState.value}</p>
            <h1>Array</h1>
            <button onClick={() => dispatch(addOne('One'))}>Add 'One' to array</button>
            <button onClick={() => dispatch(removeLast())}>Remove last element of array</button>
            <p>Array of one's: {testState.join(', ')}</p>
        </div>
    )
}

export default HookComponent
