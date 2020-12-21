import './App.css';
import { decrement, increment } from './store/counter/actions';
import { store } from './store';
import Child from './components/Child';
import ReposList from './components/ReposList';

// In deze App component wordt de state vermeerderd en verminderd via de buttons
// Dit wordt gedaan door middel van een increment/decrement action te dispatchen naar de store
function App() {
  return (
    <div className="App">
      <div className="App-header" style={{borderStyle: "solid", borderWidth: 5,  padding: 5}}>
        <h1>App</h1>
        <button onClick={() => store.dispatch(increment()) }>Increment</button>
        <button onClick={() => store.dispatch(decrement())}>Decrement</button>
        <Child />
      </div>
      <ReposList />
    </div>
  );
}

export default App;
