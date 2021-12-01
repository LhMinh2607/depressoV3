import React, { Children, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction';
import MessageBox from '../components/MessageBox';

export default function CartPage(props){

    const params = useParams();
    const id = params.drinkId;
    const qty = Number(params.qty);
    
    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;
  

    const navigate = useNavigate();


    const cart = useSelector(state => state.cart);
    const {cartItems}=cart;

    const dispatch = useDispatch();


    const removeFromCartHandler = (id) => {
        //remove item
        //alert(id); results in undefined, ok my bad
        dispatch(removeFromCart(id));

    }

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        //
        if(id){
            //alert(id);
            //alert(qty);
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id]);

    

    const checkOutHandler =() =>{
        if(userInfo){
            navigate('/order');
        } else{
            navigate('/signin?redirect=order');
        }
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Giỏ hàng</h1>
                {cartItems.length === 0
                ? 
                <MessageBox>
                    <div className="purple card card-body">
                        Giỏ hàng trống
                        <Link to="/drink"> Mua liền!!!</Link>
                    </div>
                </MessageBox> 
                :
                (
                <ul>
                    {cartItems.map((item)=>(
                        <li key={item.drink} className="row purple">
                            <div className="row">
                                <img 
                                src={item.image}
                                alt={item.name}
                                className="tiny"></img>
                            </div>
                            <div className="min-30">
                                <Link to={`/drink/${item.drink}`}>{item.name}</Link>
                            </div>
                            <div>
                                {item.price} đồng
                            </div>
                            <div>
                                <select
                                    value={item.qty}
                                    onChange={(e) =>
                                        dispatch(
                                        addToCart(item.drink, Number(e.target.value))
                                        )
                                    }
                                    >
                                    {[...Array(10).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button className="primary" type="button" onClick={()=> removeFromCartHandler(item.drink)}>
                                    Gỡ
                                </button>
                            </div>
                        </li>
                    ))
                    }
                </ul>
                )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Tổng thành tiền của ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} sản phẩm) : {cartItems.reduce((a, c)=> a + c.price * Number(c.qty), 0)} đồng 
                            </h2>
                        </li>
                        <li>
                            <Link to="/drink" className="primary block" hidden={cartItems.length === 0}>
                                Tiếp tục mua
                            </Link>
                        </li>
                        <li>
                            <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems.length === 0}>
                                Đặt hàng
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}