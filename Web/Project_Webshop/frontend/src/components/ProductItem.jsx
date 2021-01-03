import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getImageSource } from '../helpers/helpers';
import { formatPrice } from '../helpers/helpers';
import { addProduct } from '../store/cart/slice';
import { addProduct as addProductToWishlist } from '../store/wishlist/slice';
import { setShopContent, setWishlistContent, showModal } from '../store/shoppingmodal/slice';

const ProductItem = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productsState = useSelector(state => state.products.products);
    const product = productsState.find((val) => val._id.toString() === productId);
    const [category, setCategory] = useState({});
    const wishlistState = useSelector(state => state.wishlist); // access redux store
    const {items} = wishlistState;

    const isProductOnWishlist = (product) => {
        return items.find((el) => el._id === product._id) ? true : false;
    }
    
    useEffect(() => {
        // Get category data
        (async () => {
            // Get category data for specified category ID
            const categoryEndpoint = `http://localhost:3000/categories/${product.category_id}`;
            try {
                const categoryData = await axios.get(categoryEndpoint);
                setCategory(categoryData.data);
            } catch (err)
            {
                console.log(err);
                history.push('/error');
            }
         })();
    }, []);

    return (
        <div>
            <Container className="header">
                <h2>{product.name}</h2>
                <h5>{product.author}</h5>
                <hr/>
            </Container>
            <Container>
                <Row>
                    <Col lg="3" className="mt-3 text-center">
                        <img src={getImageSource(product._id)} alt="product" style={{ maxWidth: '15rem', border: '3px solid #343a40'}}/>
                    </Col>
                    <Col lg="7" className="mt-3">
                        <h5>Productspecificaties</h5>
                        <hr/>
                        <p>Auteur(s): {product.author}</p>
                        <p>Categorie: {category.name}</p>
                        <p>EAN Nummer: {product.ean_number}</p>
                        <p>Aantal pagina's: {product.pages}</p>
                    </Col>
                    <Col lg="2" className="mt-3 text-center">
                        <h5>Prijs: {formatPrice(product.price)}</h5>
                        <hr/>
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
                    </Col>
                </Row>
            </Container>
            <Container className="my-4">
                <Row>
                    <Col>
                        <h5>Samenvatting</h5>
                        <hr/>
                        <p>{product.description}</p>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
};

export default ProductItem;
