import {Form} from 'react-bootstrap';

function BookOrderForm() {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
        </Form>
    )
}

export default BookOrderForm;