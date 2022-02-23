import axios from 'axios';
import {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {MyBackend} from '../../Api/ApiLinkGen';
import AdminSideBook from '../AdminSideBook/AdminSideBook';

function BookReturns() {
    const [details, setDetails] = useState([]);
    useEffect(() => {
        axios.get(MyBackend({work: 'gettodaysbookreturns'}))
        .then((res) => {
            console.log(res.data);
            setDetails(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
        })
    return (
        <Container>
            <AdminSideBook details={details}/>
        </Container>
    )
}

export default BookReturns;