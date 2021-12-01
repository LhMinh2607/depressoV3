import React, { useState } from 'react'
import RatingComponent from './RatingComponent'
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router';




export default function DrinkPanel(props) {

    const {d} = props;

    const navigate = useNavigate();
    
    const addToCartHandler = () =>{
        navigate(`/shopping_cart/${d._id}/${qty}`);
    }

    const [qty, setQty] = useState(1);

    return (
        <div>
            <div key={d._id} className="card">
                <Link to={`/drink/${d._id}`}>
                    <img className="medium" src={d.image} alt={d.name}/>
                </Link>
                <div className="card-body card-body-limit">
                    <Link to={`/drink/${d._id}`}>
                        <h2>{d.name}</h2>
                    </Link>
                    <RatingComponent rating={d.rating} reviewNum = {d.reviewNum}></RatingComponent>
                    <div className="price">
                        {d.price}đ
                    </div>
                    {(
                    <>
                      <li>
                        <div className="row">
                          <div>Số lượng</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(5).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button onClick={addToCartHandler} className="primary block">Thêm vào giỏ hàng</button>
                      </li>
                    </>
                  )}
                </div>
            </div>     
        </div>
    );
}

    