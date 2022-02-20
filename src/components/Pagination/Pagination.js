import { Pagination, Container } from "react-bootstrap";

function Paged() {
  return (
    <Container style={{marginTop: '20px'}}>
      <Pagination style={{alignItems: 'center', justifyContent: 'center'}}>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        {/* <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item>{14}</Pagination.Item>

        <Pagination.Ellipsis /> */}
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Container>
  );
}

export default Paged;
