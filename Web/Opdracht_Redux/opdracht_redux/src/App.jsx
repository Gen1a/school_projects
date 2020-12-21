import './App.css';
import { decrement, increment } from './store/counter/actions';
import { store } from './store';
import Child from './components/Child';
import ReposList from './components/ReposList';
import Overview from './components/Overview';

// In deze App component wordt de state vermeerderd en verminderd via de buttons
// Dit wordt gedaan door middel van een increment/decrement action te dispatchen naar de store
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Counter</h1>
        <p>Modify Counter</p>
        <button onClick={() => store.dispatch(increment())}>Increment</button>
        <button onClick={() => store.dispatch(decrement())}>Decrement</button>
        <Child />
        <ReposList />
        <Overview />
      </div>
    </div>
  );
}

export default App;
