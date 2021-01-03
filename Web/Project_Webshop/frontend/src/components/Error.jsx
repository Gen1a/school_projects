import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Error = () => {
    return (
        <div>
            <Container className="header">
                <h1>Error</h1>
                <p>Sorry, er ging iets mis.</p>
                <hr/>
            </Container>
            <Container>
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

export default Error;
