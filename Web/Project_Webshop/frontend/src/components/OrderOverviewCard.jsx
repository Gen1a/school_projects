import React from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatPrice } from '../helpers/helpers';

const OrderOverviewCard = () => {
    const cartState = useSelector(state => state.cart);
    const {items, totalPrice, totalAmountOfItems } = cartState;

    return (
        <Card className="my-4" border="dark" style={{ minWidth: '12rem' }}>
            <Card.Header>
                <h5>Overzicht bestelling</h5>
                <Card.Subtitle>
                    <p className="text-muted mb-1">{totalAmountOfItems} {totalAmountOfItems === 1 ? "artikel" : "artikelen"}</p>
                </Card.Subtitle>
            </Card.Header>
            <Card.Body>
            <ListGroup variant="flush">
                {items.map((item) => 
                    <ListGroup.Item key={item._id}>
                        • {item.name} ({item.quantity}x)
                    </ListGroup.Item>
                )}
            </ListGroup>
            </Card.Body>
            <Card.Footer>
                <Card.Text className="product-price ml-3">Te betalen: {formatPrice(totalPrice)}</Card.Text>
            </Card.Footer>
        </Card>
    )
};

export default OrderOverviewCard;
