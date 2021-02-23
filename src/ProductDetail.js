import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './ProductDetail.scss';

function ProductDetail() {
  const [alert, setAlert] = useState(true);
  const [data, setData] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    fetchSingleItem(id);
    let timer = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchSingleItem = async (id) => {
    let res = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => console.error(err));
    setData(res.data);
  };

  let history = useHistory();

  return (
    <div className="container">
      {alert === true ? <div className="alert">stocks low</div> : null}
      <div className="row">
        <div className="col-md-6">
          <img src={data.image} width="100%" alt="img" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{data.title}</h4>
          <p>{data.description}</p>
          <p>${data.price}</p>
          <button className="btn btn-danger">Buy Now</button>
          <button
            className="btn btn-info mx-2"
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
