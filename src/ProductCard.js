import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './ProductCard.css';

function ProductCard(props) {
  return (
    <Card className="col-md-3 rounded shadow-sm border-0 mb-4 product-card">
      <Card.Img
        className="img-fluid d-block mx-auto mb-3"
        src={props.data.image ? props.data.image : 'loding'}
      />
      <Link to={`/detail/${props.index}`}>
        <Card.Body className="p-4 product-card-body">
          <Card.Title>{props.data.title}</Card.Title>
          <Card.Text>${props.data.price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ProductCard;
