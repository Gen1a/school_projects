import './App.css';
import {useState} from 'react';
import Statistics from './components/Statistics';

const App = () => {
    // STATE
    const [goodCounter, setGoodCounter] = useState(0);
    const [neutralCounter, setNeutralCounter] = useState(0);
    const [badCounter, setBadCounter] = useState(0);

    return (
        <div className="main">
            <h1>Opdracht React Hooks</h1>
            <h2>Give your feedback:</h2>
            <button className="success" onClick={() => setGoodCounter(goodCounter + 1)}>Good</button>
            <button className="neutral" onClick={() => setNeutralCounter(neutralCounter + 1)}>Neutral</button>
            <button className="error" onClick={() => setBadCounter(badCounter + 1)}>Bad</button>
            <hr />
            <Statistics goodCounter={goodCounter} neutralCounter={neutralCounter} badCounter={badCounter}/>
        </div>
    );
}

export default App;
