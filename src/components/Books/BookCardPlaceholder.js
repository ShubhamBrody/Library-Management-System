import {Card, Placeholder} from 'react-bootstrap'

function BookCardPlaceholder(props) {
    return <Card style={{ width: '16rem', margin: props.margin ? props.margin : "1rem"}}>
    <Card.Img style={{height: "18rem"}} variant="top" src="/images/previewbookimage.jpg" />
    <Card.Body>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={6} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
        <Placeholder xs={6} /> <Placeholder xs={8} />
      </Placeholder>
      <Placeholder.Button variant="success" xs={12} />
    </Card.Body>
  </Card>
}

export default BookCardPlaceholder;