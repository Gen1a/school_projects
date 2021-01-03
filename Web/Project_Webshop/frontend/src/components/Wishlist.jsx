import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import { addProduct } from '../store/cart/slice';
import { removeProduct } from '../store/wishlist/slice';
import { setShopContent, showModal } from '../store/shoppingmodal/slice';
import { getImageSource} from '../helpers/helpers';

const Wishlist = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const wishlistState = useSelector(state => state.wishlist);
    const {items, totalAmountOfItems} = wishlistState;

    const handleCardClick = (productId) => {
        history.push(`/products/${productId}`);
    } 

    return (
        <div className="wishlist">
            <Container className="header">
                <h1>Mijn verlanglijstje</h1>
                <hr/>
            </Container>
            <Container>
                {totalAmountOfItems !== 0 
                ?
                    <CardDeck>
                        {items.map(item => 
                            <Col md="4" lg="3" className="mt-4" key={item._id}>
                                <Card className="h-100">
                                    <div className="text-center card-img-wrapper" style={{ backgroundColor: '#cccccc' }} onClick={() => handleCardClick(item._id)}>
                                        <Card.Img variant="top" src={getImageSource(item._id)} style={{ maxWidth: '8rem'}}/>
                                    </div>
                                    <Card.Header onClick={() => handleCardClick(item._id)}>
                                        <h5>{item.name}</h5>
                                        <Card.Subtitle>
                                        <p className="text-muted mb-1">{item.author}</p>
                                        </Card.Subtitle>
                                    </Card.Header>
                                    <Card.Body>
                                        {item.description.slice(0, 150)}...
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button className="px-3" variant="success" size="sm" onClick={() => {
                                            dispatch(addProduct(item));
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
                                        <Button className="mr-auto px-3" variant="light" size="sm" onClick={() => {
                                            dispatch(removeProduct(item));
                                        }}>
                                            <img
                                                alt="heartbroken"
                                                src="/images/heartBroken.svg"
                                                width="24"
                                                height="24"
                                                className="d-inline-block align-top"
                                            />
                                        </Button>
                                        <Card.Text className="product-price ml-3">€ {item.price}</Card.Text>
                                    </Card.Footer>
                                </Card>
                            </Col>)}
                    </CardDeck>
                    :
                    <div>
                        <p>Er zijn geen artikelen aanwezig op je verlanglijstje.</p>
                    </div>
                }
            </Container>
            <Container className="my-3 text-center">
                <hr/>
                <Button variant="success" href="/products">
                    <img
                        alt="add to cart"
                        src="/images/arrowLeft.svg"
                        width="24"
                        height="24"
                        />
                    {' '}Verder winkelen
                </Button>
            </Container>
        </div>
    )
};

export default Wishlist;
