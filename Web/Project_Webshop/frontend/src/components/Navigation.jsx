import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
            <img
                alt="devices"
                src="./images/devices.svg"
                width="40"
                height="40"
                className="d-inline-block align-top"
            />{' '}
            Project Webshop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/products">Producten</Nav.Link>
                <Nav.Link href="#">Verlanglijstje</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="/shoppingcart">Winkelwagentje
                    <img
                        alt="cart"
                        src="./images/cart.svg"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />
                </Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Wat zoek je?" className="mr-sm-2" />
                    <Button type="submit" variant="light">Zoeken</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;
