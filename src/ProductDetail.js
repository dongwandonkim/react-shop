import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './ProductDetail.css';

let Box = styled.div`
  padding: 10px;
  color: red;
  border: 1px solid black;
  border-radius: 4px;
  width: 200px;
  margin: auto;
`;

function ProductDetail(props) {
  let { id } = useParams();
  let filteredProduct = props.data.find((product) => product.id == id);
  let history = useHistory();

  if (!filteredProduct) return 'Loading';
  return (
    <div className="container">
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
            className="btn btn-info"
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
