import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik'; // React forms library
import * as yup from 'yup'; // Formik forms validation library
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';

const UserDetailsForm = () => {
    const cartState = useSelector(state => state.cart);
    const {items, totalPrice} = cartState;
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            voornaam: '',
            achternaam: '',
            email: '',
            telefoon: '',
            straat: '',
            postcode: '',
            gemeente: '',
        },
        // Use 3rd party library 'yup' for form validation
        validationSchema: yup.object({
            voornaam: yup.string()
                .min(2, 'Voornaam moet minstens 2 letters bevatten')
                .max(25, 'Voornaam mag niet meer dan 25 letters bevatten')
                .required('Voornaam verplicht'),
            achternaam: yup.string()
                .min(2, 'Achternaam moet minstens 2 letters bevatten')
                .max(25, 'Achternaam mag niet meer dan 25 letters bevatten')
                .required('Achternaam verplicht'),
            email: yup.string()
                .email('Ongeldig e-mailadres')
                .required('E-mailadres verplicht'),
            telefoon: yup.string()
                .min(9, 'Gelieve een geldig telefoonnummer in te geven (vb. 0498436594 of 099384464)')
                .max(10, 'Gelieve een geldig telefoonnummer in te geven (vb. 0498436594 of 099384464)')
                .required('Telefoon verplicht'),
            straat: yup.string().matches(/[^A-Za-z+]+[0-9+]/, 'Gelieve een geldige straat en huisnummer in te geven')
                .required('Straat en huisnummer verplicht'),
            postcode: yup.string().matches(/[1-9]{1}[0-9]{3}/, 'Gelieve een geldige postcode in te geven')
                .required('Postcode verplicht'),
            gemeente: yup.string()
                .min(2, 'Gemeente moet minstens 2 tekens bevatten')
                .max(35, 'Gemeente mag niet meer dan 35 tekens bevatten')
                .required('Gemeente verplicht'),
        }),
        // Define submit handler for the form
        onSubmit: async (values) => {
            // Create user POST body
            const userData = {
                first_name: values.voornaam,
                last_name: values.achternaam,
                email: values.email,
                telephone: values.telefoon,
                address: values.straat,
                postal_code: values.postcode,
                city: values.gemeente
            };
            // Perform user POST request
            const userPostResponse = await axios({
                method: 'POST',
                baseURL: 'http://localhost:3000/',
                url: '/user/new',
                data: userData,
            })
                .catch(err => {
                    console.log(err);
                    history.push('/error');
                });
            // Check if user POST request succeeded
            let customer_id = null;
            if (userPostResponse.request.status === 200){
                customer_id = userPostResponse.data.customer_id;
            }
            // Create order POST body
            const orderData = {
                customer_id: customer_id,
                order_statuscode: 1,
                date_created: new Date().toISOString(),
                total_price: totalPrice,
                items: items,
            };
            // Perform order POST request
            const orderPostResponse = await axios({
                method: 'POST',
                baseURL: 'http://localhost:3000/',
                url: '/order',
                data: orderData,
            })
                .catch(err => {
                    console.log(err);
                    history.push('/error');
                });
            // Check if order POST request succeeded
            let order_id = null;
            if (orderPostResponse.request.status === 200){
                order_id = orderPostResponse.data.order_id;
            }
            history.push(`/confirmation/${customer_id}/${order_id}`);
        },
    });

    return (
        <Form id="user-details" onSubmit={formik.handleSubmit}>
            <Form.Row >
                <Form.Group as={Col} md={5}>
                    <Form.Label>Voornaam</Form.Label>
                    <Form.Control 
                        type="text"
                        name="voornaam"
                        id="voornaam"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.voornaam}
                    />
                    {formik.touched.voornaam && formik.errors.voornaam ? (
                        <div className="input-validation-error">{formik.errors.voornaam}</div>
                    ) : null}
                </Form.Group>
                <Form.Group as={Col} md={5}>
                    <Form.Label>Achternaam</Form.Label>
                    <Form.Control
                        type="text"
                        name="achternaam"
                        id="achternaam"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.achternaam}
                    />
                    {formik.touched.achternaam && formik.errors.achternaam ? (
                        <div className="input-validation-error">{formik.errors.achternaam}</div>
                    ) : null}
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md={5}>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        id="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="input-validation-error">{formik.errors.email}</div>
                    ) : null}
                </Form.Group>
                <Form.Group as={Col} md={5}>
                    <Form.Label>Telefoon</Form.Label>
                    <Form.Control
                        type="text"
                        name="telefoon"
                        id="telefoon"
                        placeholder="vb. 0497034422"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.telefoon}
                    />
                    {formik.touched.telefoon && formik.errors.telefoon ? (
                        <div className="input-validation-error">{formik.errors.telefoon}</div>
                    ) : null}
                </Form.Group>
            </Form.Row >
            <Form.Row>
                <Form.Group as={Col} md={10}>
                    <Form.Label>Straat en huisnummer</Form.Label>
                    <Form.Control
                        type="text"
                        name="straat"
                        id="straat"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.straat}
                    />
                    {formik.touched.straat && formik.errors.straat ? (
                        <div className="input-validation-error">{formik.errors.straat}</div>
                    ) : null}
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md={5}>
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control
                        type="text"
                        name="postcode"
                        id="postcode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.postcode}
                    />
                    {formik.touched.postcode && formik.errors.postcode ? (
                        <div className="input-validation-error">{formik.errors.postcode}</div>
                    ) : null}
                </Form.Group>
                <Form.Group as={Col} md={5}>
                    <Form.Label>Gemeente</Form.Label>
                    <Form.Control
                        type="text"
                        name="gemeente"
                        id="gemeente"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gemeente}
                    />
                    {formik.touched.gemeente && formik.errors.gemeente ? (
                        <div className="input-validation-error">{formik.errors.gemeente}</div>
                    ) : null}
                </Form.Group>
            </Form.Row>
        </Form>
    )
};

export default UserDetailsForm;
