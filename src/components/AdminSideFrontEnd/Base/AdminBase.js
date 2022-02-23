import {Container} from 'react-bootstrap';
import {useContext} from 'react';
import AuthContext from '../../store/AuthContext';
import BookReturns from '../BookReturns/BookReturns';
function AdminHome() {
    const authContext = useContext(AuthContext);
    return (
        <Container style={{textAlign: "center"}}>
            <h1>Hello, {authContext.user.username}</h1>
            <BookReturns />
        </Container>
    );
}

export default AdminHome;