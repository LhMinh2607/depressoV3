import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signup } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import DatePicker from 'react-date-picker'; //pre-made from react-datepicker
import { useNavigate } from 'react-router';

export default function SignUpPage(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState();
    const [birthDate, setBirthDate] = useState(new Date("01-01-2003"));
    const [phoneNumber, setPhoneNumber] = useState('');

    //const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignup = useSelector((state)=> state.userSignup);
    const {userInfo, loading, error} = userSignup;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault(); //prevent the form from being refreshed
        //sign in action
        if(password !== confirmPassword)
        {
            alert('Mật khẩu xác nhận không giống mật khẩu ban đầu, Vui lòng nhập lại.');
        }
        else{
            dispatch(signup(name, email, password, gender, birthDate, phoneNumber));
            navigate("/signin");
        }
    };

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        // if(userInfo){
        //     //props.history.push(redirect);
        //     navigate("/signin");
        // }
    }, [userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Đăng ký</h1>
                </div>
                <div>
                    <label htmlFor="name">Tên</label>
                    <input type="text" id="name" placeholder="Enter name here" required
                        onChange={e => setName(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="email">Địa chỉ Email</label>
                    <input type="email" id="email" placeholder="Enter email here" required
                        onChange={e => setEmail(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" id="password" placeholder="Enter password here" required
                        onChange={e => setPassword(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm password here" required
                        onChange={e => setConfirmPassword(e.target.value)}>
                        </input>
                </div>
                <div>
                <label htmlFor="gender">
                    Giới tính: 
                </label>
                {/* <input id="gender" type="text" placeholder="Enter Your gender here" value={user.gender} value={gender} onChange={(e)=> setGender(e.target.value)} disabled={disabled}>
                </input> */}
                <select id="gender" onChange={(e)=> setGender(e.target.value)}>
                    <option value="" hidden>Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="others">Khác</option>
                </select>
                <label htmlFor="birthDate">
                    Ngày sinh: 
                </label>
                {/* <input id="birthDate" type="text" placeholder="Enter Your bday here" value={user.birthDate} value={birthDate} onChange={(e)=> setBirthDate(e.target.value)} disabled={disabled}>
                </input> */}
                {/* <input type="date" id="birthDate2" name="birthDate2" onChange={(e)=> setGender(e.target.value)}></input>
                    */}
                
                <DatePicker

                    dateFormat="dd/MM/yyyy"
                    selected={birthDate}
                    minDate={new Date("01-01-1950")}
                    maxDate={new Date("01-01-2003")}
                    onChange={birthDate => setBirthDate(birthDate)}
                    />
                </div>
                <div>
                    <label htmlFor="name">Số điện thoại</label>
                    <input type="text" id="phoneNumber" placeholder="Nhập số đt"
                        onChange={e => setPhoneNumber(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label/>
                    <button type="submit" className="primary">Đăng ký</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Có tài khoản rồi? {' '}
                        <Link to={`/signin?redirect=`}>Đăng nhập</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}