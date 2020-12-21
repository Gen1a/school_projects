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
            <h2>Using Hooks</h2>
            <p>{counterState.value}</p>
            <button onClick={() => dispatch(addOne('One'))}>Add one element to array</button>
            
            { /*
                VOEG HIER DE REMOVE LAST OF ARRAY ACTION TOE MET EEN BUTTON
            */}
            <button onClick={() => dispatch(removeLast())}>Remove last element of array</button>
            <p>Array of one's: </p>
            <p>{testState.join(', ')}</p>
        </div>
    )
}

export default HookComponent
