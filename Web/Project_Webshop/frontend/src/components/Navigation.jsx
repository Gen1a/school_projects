import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const Navigation = () => {
    const itemsInCart = useSelector(state => state.cart.totalAmountOfItems);
    const itemsOnWishlist = useSelector(state => state.wishlist.totalAmountOfItems);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img
                    alt="devices"
                    src="/images/devices.svg"
                    width="40"
                    height="40"
                    className="d-inline-block align-center"
                />{' '}
                Project Webshop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/products">Producten</Nav.Link>
                <Nav.Link href="/wishlist">
                    Verlanglijstje{' '}
                    <Badge variant="danger">{itemsOnWishlist}</Badge>
                </Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="/shoppingcart">
                    <img
                        alt="cart"
                        src="/images/cart.svg"
                        width="40"
                        height="40"
                        className="d-inline-block align-center"
                    />{' '}
                    <Badge variant="success">{itemsInCart}</Badge>
                </Nav.Link>
                </Nav>
                <Form inline disabled>
                    <FormControl type="text" placeholder="Wat zoek je? (uitgeschakeld)" className="my-2" />
                    <Button className="my-2 ml-lg-2" type="submit" variant="light" disabled>Zoeken</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Navigation;
