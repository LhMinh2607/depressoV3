import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOfUsers } from '../actions/userAction';
import DateComponent from '../components/DateComponent';

export default function UserListPage() {


    const feedbackList = useSelector(state=>state.feedbackList);
    const {loading, error, feedbacks} = feedbackList;

    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading: loadingUser, error: errorUser} = userSignin;

    const userList = useSelector(state=>state.userList);
    const {loading: loadingUserList, error: errorUserList, users} = userList;

    const dispatch = useDispatch();
    useEffect(()=>{
        if(userInfo && userInfo.role=="admin")
        {
            dispatch(listOfUsers());
        }
    }, [])

    const navigate = useNavigate();
    return (
        <div>
            {users && <table className="table">
                    <thead>
                        <tr>
                            <th>TIN NHẮN GẦN ĐÂY</th>
                            <th>USERNAME</th>
                            <th>TÊN</th>
                            <th>NGÀY THAM GIA</th>
                            <th>TRANG CÁ NHÂN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((u)=>(
                            <tr key={u._id}>
                                <td>{u._id}</td>
                                <td>{u.username}</td>
                                <td>{u.name}</td>
                                <td><DateComponent passedDate = {u.createdAt}></DateComponent></td>
                                <td>
                                    <div className="interactiveText" onClick={() => {navigate(`/user/${u._id}`);}}>
                                        <i className='fa fa-arrow-right'></i>
                                    </div>
                                </td>
                            </tr>
                        ))
                        }
                        <tr>
                            <td></td>
                            <th>{users.length} tài khoản</th>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    
                </table>}
        </div>

    )
}
