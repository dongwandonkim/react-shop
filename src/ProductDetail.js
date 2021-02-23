import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './ProductDetail.scss';

function ProductDetail(props) {
  const [alert, setAlert] = useState(true);
  const [text, setText] = useState('');

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  });
  let { id } = useParams();
  let filteredProduct = props.data.find((product) => product.id == id);
  let history = useHistory();

  if (!filteredProduct) return 'Loading';
  return (
    <div className="container">
      <input
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      {text}
      {alert === true ? <div className="alert">stocks low</div> : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={filteredProduct.image ? filteredProduct.image : 'loading'}
            width="100%"
            alt="img"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{filteredProduct.title}</h4>
          <p>{filteredProduct.description}</p>
          <p>{filteredProduct.price}</p>
          <button className="btn btn-danger">Buy Now</button>
          <button
            className="btn btn-info mx-a"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
