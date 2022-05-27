import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signup } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import DatePicker from 'react-datepicker'; //pre-made from react-datepicker
import { useNavigate } from 'react-router';
import Select from 'react-dropdown-select';

export default function SignUpPage(props) {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('Khác');
    const [dob, setDOB] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [desc, setDesc] = useState('');



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
            dispatch(signup(name, username, email, password, gender, dob, phoneNumber, address, occupation, desc));
            navigate("/signin");
        }
    };

    const genders = [
        {_id: "Nam", name: "Nam"},
        {_id: "Nữ", name: "Nữ"},
        {_id: "Khác", name: "3D"},
    ]
    const setTheGender = (selectedValues) =>{
        setGender(selectedValues[0].value);
    }
    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        // setGender("Khác");
        // if(userInfo){
        //     //props.history.push(redirect);
        //     navigate("/signin");
        // }
    }, [userInfo]);
    return (
        <div>
            {userInfo && <MessageBox variant="info">Đăng ký thành công</MessageBox>}
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Đăng ký</h1>
                </div>
                <div>
                    <label htmlFor="name">Tên</label>
                    <input type="text" id="name" placeholder="Nhập tên" required className='basic-slide'
                        onChange={e => setName(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="name">Username</label>
                    <input type="text" id="username" placeholder="Nhập Username" required className='basic-slide'
                        onChange={e => setUsername(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="email">Địa chỉ Email</label>
                    <input type="email" id="email" placeholder="Nhập email" required className='basic-slide'
                        onChange={e => setEmail(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" id="password" placeholder="Nhập mật khẩu" required className='basic-slide'
                        onChange={e => setPassword(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" id="confirmPassword" placeholder="Xác nhận mật khẩu" required className='basic-slide'
                        onChange={e => setConfirmPassword(e.target.value)}>
                        </input>
                </div>
                <div>
                <label htmlFor="gender">
                    Giới tính: 
                </label>
                {/* <input id="gender" type="text" placeholder="Enter Your gender here" value={user.gender} value={gender} onChange={(e)=> setGender(e.target.value)} disabled={disabled}>
                </input> */}
                {/* <select id="gender" className='filterSelect' onChange={(e)=> setGender(e.target.value)}>
                    <option value="" hidden>Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select> */}
                <Select style={{width: '60rem'}} dropdownHeight="10rem" placeholder='Chọn giới tính' options={genders.map(gen=>({value: gen._id, label: gen.name}))} onChange={setTheGender} required={true}/>
                <label htmlFor="birthDate">
                    Ngày sinh: 
                </label>
                <DatePicker
                    className='basic-slide'
                    dateFormat="dd/MM/yyyy"
                    selected={dob}
                    minDate={new Date("01-01-1950")}
                    maxDate={new Date("01-01-2003")}
                    onChange={dob => setDOB(dob)}
                    />
                <div>
                    <label htmlFor="name">Địa chỉ</label>
                    <input type="text" id="address" placeholder="Nhập địa chỉ" required className='basic-slide'
                        onChange={e => setAddress(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="name">Nghề nghiệp</label>
                    <input type="text" id="occupation" placeholder="Nhập nghề nghiệp" required className='basic-slide'
                        onChange={e => setOccupation(e.target.value)}>
                        </input>
                </div>
                {/* <input id="birthDate" type="text" placeholder="Enter Your bday here" value={user.birthDate} value={birthDate} onChange={(e)=> setbirthDate(e.target.value)} disabled={disabled}>
                </input> */}
                {/* <input type="date" id="birthDate2" name="birthDate2" onChange={(e)=> setGender(e.target.value)}></input>
                    */}
                
                
                </div>
                <div>
                    <label htmlFor="name">Số điện thoại</label>
                    <input type="text" id="phoneNumber" placeholder="Nhập số đt" className='basic-slide'
                        onChange={e => setPhoneNumber(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="desc">Mô tả ngắn gọn về bản thân (không bắt buộc)</label>
                    <input type="text" id="desc" placeholder="Nhập mô tả" className='basic-slide'
                        onChange={e => setDesc(e.target.value)}>
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