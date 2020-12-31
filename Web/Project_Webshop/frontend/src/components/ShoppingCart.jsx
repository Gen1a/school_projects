import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addProduct, removeProduct, removeAllProductsWithId } from '../store/cart/slice';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart);
    const {items, status} = cartState;

    return (
        <div className="shopping-cart">
            <Container>
                <h1>Winkelwagentje</h1>
            </Container>
            <Container>
                {status === 'filled' ? 
                    items.map((item, index) => 
                        <Card key={index} className="mt-4 p-2" border="dark">
                            <Row className="align-items-center">
                                <Col md="3">
                                    <Card.Title>
                                        {item.name}
                                    </Card.Title>
                                    <Card.Subtitle>
                                        <p className="text-muted mb-1">{item.author}</p>
                                    </Card.Subtitle>
                                </Col>
                                <Col md="4">
                                    <Card.Body>
                                        {item.description.slice(0, 200)}...
                                    </Card.Body>
                                </Col>
                                <Col md="3" className="d-flex justify-content-center">
                                    <Button variant="dark" size="sm" onClick={() => dispatch(removeProduct(item, false))}>
                                        <img
                                            alt="remove one"
                                            src="./images/circleMinus.svg"
                                            width="24"
                                            height="24"
                                            className="d-inline-block align-top"/>
                                    </Button>
                                    <Card.Text className="mx-2 my-auto">Aantal: {item.quantity}</Card.Text>
                                    <Button variant="dark" size="sm" onClick={() => dispatch(addProduct(item))}>
                                        <img
                                            alt="add one"
                                            src="./images/circlePlus.svg"
                                            width="24"
                                            height="24"
                                            className="d-inline-block align-top"/>
                                    </Button>
                                </Col>
                                <Col md="1">
                                    <Button variant="danger" size="sm" onClick={() => dispatch(removeAllProductsWithId(item))}>
                                            <img
                                                alt="remove all"
                                                src="./images/trash.svg"
                                                width="24"
                                                height="24"
                                                className="d-inline-block align-top"/>
                                    </Button>
                                </Col>
                                <Col md="1">
                                    €{item.quantity * item.price}
                                </Col>
                            </Row>
                        </Card>
                    ) : 
                    <div>
                        <p>Er zijn geen artikelen aanwezig in je winkelwagentje.</p>
                        <Link to="/products">
                            <Button variant="success">
                                    <img
                                        alt="add to cart"
                                        src="./images/arrowLeft.svg"
                                        width="24"
                                        height="24"
                                        />
                                    {' '}Verder winkelen
                            </Button>
                        </Link>
                        
                    </div>
                }
            </Container>
            <Container>
                {status === 'filled' ? 
                    <div className="text-right">
                        Totaalbedrag
                        <hr></hr>
                    </div>
                : null}
            </Container>
        </div>
    )
};

export default ShoppingCart;
