import { Card } from 'react-bootstrap';

function ProductCard(props) {
  return (
    <Card className="col-md-3 rounded shadow-sm border-0 mx-auto">
      <Card.Body className="p-4">
        <Card.Img
          className="img-fluid d-block mx-auto mb-3"
          src={props.data.image ? props.data.image : 'loding'}
        />
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>{props.data.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
