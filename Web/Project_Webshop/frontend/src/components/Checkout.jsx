import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import UserDetailsForm from './UserDetailsForm';
import OrderOverviewCard from './OrderOverviewCard';

const Checkout = () => {
    return (
        <div>
            <Container className="header">
                <h1>Adresgegevens</h1>
                <hr/>
            </Container>
            <Container>
                <Row className="align-items-center">
                    <Col md="9">
                        <UserDetailsForm/>
                    </Col>
                    <Col>
                        <OrderOverviewCard />
                    </Col>
                </Row>
                <Button variant="success" size="lg" form="user-details" type="submit">
                    <img
                        alt="add to cart"
                        src="/images/check.svg"
                        width="24"
                        height="24"
                        />
                    {' '}Bevestig Bestelling
                </Button>
            </Container>
        </div>
    )
};

export default Checkout;
