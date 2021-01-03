import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { reset } from '../store/cart/slice';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import { formatPrice } from '../helpers/helpers';


const Confirmation = () => {
    const { customerId, orderId } = useParams();
    const dispatch = useDispatch();
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // Get order data for specified order ID using Immediately invoked function expression
        (async () => {
            const orderEndpoint = `http://localhost:3000/order/${orderId}/products`;
            axios.get(orderEndpoint)
                .then((data) => {
                    setOrder(data.data);
                })
                .catch((err) => {
                    console.log(err);
                    history.push('/error');
                });
        })();
    }, []);

    useEffect(() => {
        // Get customer data for specified order ID using Immediately invoked function expression
        (async () => {
            // Get order data for specified order ID
            const userEndpoint = `http://localhost:3000/user/${customerId}`;
            try {
                const userData = await axios.get(userEndpoint);
                setUser(userData.data);
            } catch (err)
            {
                console.log(err);
                history.push('/error');
            }
         })();
    }, []);

    // Reset cart state
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div>
            <Container className="header">
                <h1>Bevestiging van je bestelling</h1>
                <hr/>
            </Container>
            <Container>
                <div className="text-center">
                    <img
                        alt="package"
                        src="/images/package.svg"
                        width="100"
                        height="100"
                        className="d-inline-block align-center"
                    />
                </div>
                <div className="text-center mt-3">
                    <h5>Klantennummer: {customerId}</h5>
                    <h5>Ordernummer: {orderId}</h5>
                </div>
                <div>
                    <Card className="my-4" border="dark" style={{ minWidth: '12rem' }}>
                        <Card.Header>
                            <h5>Factuur- & Verzendadres</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item key={customerId}>Naam: {user.first_name} {user.last_name}</ListGroup.Item>
                                <ListGroup.Item key={customerId+1}>Adres: {user.address}, {user.postal_code} {user.city}</ListGroup.Item>
                                <ListGroup.Item key={customerId+2}>Email: {user.email}</ListGroup.Item>
                                <ListGroup.Item key={customerId+3}>Telefoon: {user.telephone}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        <Card.Header>
                            <h5>Artikelen in je bestelling</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {order.products && order.products.map((value, index) => <ListGroupItem key={index}>{value.author} - {value.name} ({order.quantities[index]}x)</ListGroupItem>)}
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text className="product-price ml-3">Totaalbedrag: {order.total_price && formatPrice(order.total_price)}</Card.Text>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
            <Container className="text-center mb-3">
                <Button variant="success" href="/products">
                    <img
                        alt="add to cart"
                        src="/images/arrowLeft.svg"
                        width="24"
                        height="24"
                        />
                    {' '}Terug naar de winkel
                </Button>
            </Container>
        </div>
    )
};

export default Confirmation;
