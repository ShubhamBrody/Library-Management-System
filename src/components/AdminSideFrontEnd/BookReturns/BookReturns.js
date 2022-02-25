import axios from 'axios';
import {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {MyBackend} from '../../Api/ApiLinkGen';
import AdminSideBook from '../AdminSideBook/AdminSideBook';

function BookReturns() {
    const [details, setDetails] = useState(null);
    useEffect(() => {
        axios.get(MyBackend({work: 'bookreturns/NONE'}))
        .then((res) => {
            console.log(res.data.results);
            setDetails(res.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
        }, [])
    return (
        <Container>
            {details ? <AdminSideBook details={details}/> : <></>}
        </Container>
    )
}

export default BookReturns;