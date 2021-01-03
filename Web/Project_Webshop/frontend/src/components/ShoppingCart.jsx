import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { addProduct, removeProduct, removeAllProductsWithId } from '../store/cart/slice';
import { formatPrice } from '../helpers/helpers';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart);
    const {items, status, totalPrice } = cartState;

    return (
        <div className="shopping-cart">
            <Container className="header">
                <h1>Mijn winkelwagentje</h1>
                <hr/>
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
                                            src="/images/circleMinus.svg"
                                            width="24"
                                            height="24"
                                            className="d-inline-block align-top"/>
                                    </Button>
                                    <Card.Text className="mx-2 my-auto">Aantal: {item.quantity}</Card.Text>
                                    <Button variant="dark" size="sm" onClick={() => dispatch(addProduct(item))}>
                                        <img
                                            alt="add one"
                                            src="/images/circlePlus.svg"
                                            width="24"
                                            height="24"
                                            className="d-inline-block align-top"/>
                                    </Button>
                                </Col>
                                <Col md="1">
                                    <Button variant="danger" size="sm" onClick={() => dispatch(removeAllProductsWithId(item))}>
                                            <img
                                                alt="remove all"
                                                src="/images/trash.svg"
                                                width="24"
                                                height="24"
                                                className="d-inline-block align-top"/>
                                    </Button>
                                </Col>
                                <Col md="1">
                                    <Card.Subtitle className="mt-2">{formatPrice(item.quantity * item.price)}</Card.Subtitle>
                                </Col>
                            </Row>
                        </Card>
                    ) : 
                    <div>
                        <p>Er zijn geen artikelen aanwezig in je winkelwagentje.</p>
                        <Button variant="success" href="/products">
                            <img
                                alt="add to cart"
                                src="/images/arrowLeft.svg"
                                width="24"
                                height="24"
                                />
                            {' '}Verder winkelen
                        </Button>
                    </div>
                }
            </Container>
            <Container>
                {status === 'filled' ? 
                    <div>
                        <div className="text-right mt-3 pr-1">
                            <h5>
                                Totaalbedrag: 
                                <Badge pill variant="success" className="ml-1">
                                    {formatPrice(totalPrice)}
                                </Badge>
                            </h5>
                            <hr></hr>
                        </div>
                        <div className="text-center mb-2">
                        <Button variant="dark" size="lg" href="/checkout">
                            Verder naar bestellen{' '}
                            <img
                                alt="bestellen"
                                src="/images/arrowRight.svg"
                                width="24"
                                height="24"
                                />
                        </Button>
                        </div>
                    </div>
                : null}
            </Container>
        </div>
    )
};

export default ShoppingCart;
