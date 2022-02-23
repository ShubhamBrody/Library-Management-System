import {Container, ButtonGroup, Button} from "react-bootstrap";

function ReorderConfirmation() {
    return (
        <Container>
            <h4 style={{margin: '2rem auto', textAlign: 'center'}}>Are you sure you want to reorder this book ? </h4>
            <ButtonGroup style={{margin: '0 auto'}}>
                <Button className='lg' variant="outline-success">Yes</Button>
                <Button variant="outline-danger">No</Button>
            </ButtonGroup>
        </Container>
    )
}

export default ReorderConfirmation;