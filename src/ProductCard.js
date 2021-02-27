import { useHistory } from 'react-router-dom';
import './ProductCard.scss';

function ProductCard(props) {
  let history = useHistory();
  return (
    <div className="col-md-3">
      <div className="product-wrapper mt-3">
        <div
          className="product-content p-2"
          onClick={() => history.push(`/detail/${props.data.id}`)}
        >
          <img src={props.data.image ? props.data.image : 'loding'} alt="" />
          <div className="info-wrapper text-left">
            <span className="info-text text-uppercase">Brand Name</span>
            <span className="info-text d-block">{props.data.title}</span>
            <span className="info-text text-uppercase">Categories</span>
          </div>
          <div className="price-wrapper text-dark text-left">
            <span>$ {props.data.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
