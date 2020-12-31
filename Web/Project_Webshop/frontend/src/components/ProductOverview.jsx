import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addProduct } from '../store/cart/slice';

const ProductOverview = () => {
    const dispatch = useDispatch();
    const productsState = useSelector(state => state.products); // access redux store
    const {products} = productsState;   // get products object out of state

    return (
        <div>
            <Container>
                <h1>Producten</h1>
                <p>Op zoek naar een goed boek? Bij Project Webshop vind je ongetwijfeld wat je nodig hebt. 
                    Van Computers & Informatica tot en met boeken over Gezondheid & Lichaam. Van Economie & Financiën tot Reizen.
                    We hebben het allemaal!
                </p>
            </Container>
            <Container>
                <CardDeck>
                    {products.map((product) => 
                        <Col md="4" lg="3" className="mt-4" key={product._id}>
                            <Card className="h-100" border="dark" style={{ minWidth: '12rem' }}>
                                <Card.Header>
                                    <h5>{product.name}</h5>
                                    <Card.Subtitle>
                                    <p className="text-muted mb-1">{product.author}</p>
                                    </Card.Subtitle>
                                </Card.Header>
                                <Card.Body>
                                    {product.description.slice(0, 150)}...
                                </Card.Body>
                                <Card.Footer>
                                    <Button className="mr-auto px-3" variant="success" size="sm" onClick={() => dispatch(addProduct(product))}>
                                        <img
                                            alt="add to cart"
                                            src="./images/addIcon.svg"
                                            width="24"
                                            height="24"
                                            className="d-inline-block align-top"/>
                                    </Button>
                                    <Card.Text className="product-price ml-3">€ {product.price}</Card.Text>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )}
                </CardDeck>
            </Container>
        </div>
    )
};

export default ProductOverview;
