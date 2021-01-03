import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { fetchProducts } from '../store/products/slice';
import { addProduct } from '../store/cart/slice';
import { addProduct as addProductToWishlist } from '../store/wishlist/slice';
import { setShopContent, setWishlistContent, showModal } from '../store/shoppingmodal/slice';
import { getImageSource } from '../helpers/helpers';
import { formatPrice } from '../helpers/helpers';

const ProductOverview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const productsState = useSelector(state => state.products); // access redux store
    const {products} = productsState;   // get products object out of state
    const wishlistState = useSelector(state => state.wishlist); // access redux store
    const {items} = wishlistState;

    // Fetch products state by interacting with REST API
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const isProductOnWishlist = (product) => {
        return items.find((el) => el._id === product._id) ? true : false;
    }
    const handleCardClick = (productId) => {
        history.push(`/products/${productId}`);
    } 
    
    return (
        <div>
            <Container className="header">
                <h1>Producten</h1>
                <p>Op zoek naar een goed boek? Bij Project Webshop vind je ongetwijfeld wat je nodig hebt. 
                    Van Computers & Informatica tot en met boeken over Gezondheid & Lichaam. Van Economie & Financiën tot Reizen.
                    We hebben het allemaal!
                </p>
                <hr/>
            </Container>
            <Container className="content">
                <CardDeck>
                    {products.map((product) => 
                        <Col md="4" lg="3" className="mt-4" key={product._id}>
                            <Card className="h-100">
                                <div className="text-center card-img-wrapper" onClick={() => handleCardClick(product._id)}>
                                    <Card.Img variant="top" src={getImageSource(product._id)} style={{ maxWidth: '8rem'}}/>
                                </div>
                                <Card.Header onClick={() => handleCardClick(product._id)}>
                                    <h5>{product.name}</h5>
                                    <Card.Subtitle>
                                    <p className="text-muted mb-1">{product.author}</p>
                                    </Card.Subtitle>
                                </Card.Header>
                                <Card.Body>
                                    {product.description.slice(0, 150)}...
                                </Card.Body>
                                <Card.Footer>
                                    <Button className="px-2" variant="success" size="sm" onClick={() => {
                                        dispatch(addProduct(product));
                                        dispatch(setShopContent());
                                        dispatch(showModal());
                                    }}>
                                        <img
                                            alt="add to cart"
                                            src="/images/addIcon.svg"
                                            width="24"
                                            height="24"
                                            className="d-inline-block align-top"
                                        />
                                    </Button>
                                    <Button className="mr-auto ml-1 px-2" variant="outline-dark" size="sm" 
                                        disabled={isProductOnWishlist(product)}
                                        onClick={() => {
                                            dispatch(addProductToWishlist(product));
                                            dispatch(setWishlistContent());
                                            dispatch(showModal());
                                    }}>
                                        <img
                                            alt="heart"
                                            src='/images/heart.svg'
                                            width="24"
                                            height="24"
                                            className="d-inline-block align-top"
                                        />
                                    </Button>
                                    <Card.Text className="product-price ml-3 mt-1">{formatPrice(product.price)}</Card.Text>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )}
                </CardDeck>
            </Container>
        </div>
    )
};

export default ProductOverview;
