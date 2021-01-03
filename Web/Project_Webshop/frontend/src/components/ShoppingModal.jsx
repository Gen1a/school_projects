import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { hideModal } from '../store/shoppingmodal/slice';

const ShoppingModal = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const shoppingmodalState = useSelector(state => state.shoppingmodal);
    const { title, body, showing, status, buttonLink, buttonContent } = shoppingmodalState;
    const handleCloseAndRedirect = () => {
        dispatch(hideModal());
        history.push(buttonLink);
    };

    return (
        <Modal show={showing} onHide={() => dispatch(hideModal())}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => dispatch(hideModal())}>
                    Verder winkelen
                </Button>
                <Button variant={status === 'shopping' ? 'success' : 'danger'} onClick={handleCloseAndRedirect}>
                    {buttonContent}
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ShoppingModal;
