import './App.css';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from './components/Navigation';
import ProductOverview from './components/ProductOverview';
import { fetchProducts } from './store/products/slice';
import ShoppingCart from './components/ShoppingCart';
//import Footer from './components/Footer';

const App = () => {
    // Initialize state by interacting with REST API
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <Navigation />
            <Switch>
                {/* If path matches => route gets rendered => more specific paths at the top */}
                <Route exact path="/shoppingcart">
                    <ShoppingCart />
                </Route>
                <Route exact path="/products">
                    <ProductOverview />
                </Route>
                <Route exact path="/">
                    
                </Route>
                
            </Switch>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
