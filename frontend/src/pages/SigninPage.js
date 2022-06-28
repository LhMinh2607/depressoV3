import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userAction';
import { useNavigate  } from 'react-router-dom';

export default function SigninPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const navigate = useNavigate ();


    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault(); //prevent the form from being refreshed
        //sign in action
        dispatch(signin(email, password));
    };
    
    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        if(userInfo){
            navigate("/");
        }
    }, [userInfo]);

    return (
        <div>
            <form className="inputForm" onSubmit={submitHandler}>
                <div>
                    <h1>Đăng nhập</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="error">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Nhập email" required className='inputField'
                        onChange={e => setEmail(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" id="password" placeholder="Nhập mật khẩu" required className='inputField'
                        onChange={e => setPassword(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label/>
                    <button type="submit" className="primary">Đăng nhập</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Chưa có tài khoản?
                        <Link to="/signup?redirect=signin">Tạo tài khoản</Link>
                        {/* <Link to={`/signup?redirect=${redirect}`}>Đăng ký</Link> */}
                    </div>
                </div>
            </form>
        </div>
    )
}
