import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import ProductOverview from './components/ProductOverview';
import ProductItem from './components/ProductItem';
import ShoppingCart from './components/ShoppingCart';
import ShoppingModal from './components/ShoppingModal';
import UserDetailsForm from './components/Checkout';
import Confirmation from './components/Confirmation';
import Wishlist from './components/Wishlist';
import Error from './components/Error';
import Footer from './components/Footer';
import Container from 'react-bootstrap/Container';

const App = () => {

    return (
        <div>
            <Navigation />
            <ShoppingModal />
            <Container style={{ paddingBottom: '20px'}}>
                <Switch>
                    {/* If path matches => route gets rendered => more specific paths at the top */}
                    <Route path="/confirmation/:customerId/:orderId">
                        <Confirmation />
                    </Route>
                    <Route exact path="/products/:productId">
                        <ProductItem />
                    </Route>
                    <Route exact path="/wishlist">
                        <Wishlist />
                    </Route>
                    <Route exact path="/products">
                        <ProductOverview />
                    </Route>
                    <Route exact path="/shoppingcart">
                        <ShoppingCart />
                    </Route>
                    <Route exact path="/checkout">
                        <UserDetailsForm />
                    </Route>
                    <Route exact path="/error">
                        <Error />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Container>
            <Footer />
        </div>
    );
}

export default App;
