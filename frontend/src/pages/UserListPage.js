import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOfUsers } from '../actions/userAction';
import DateComponent from '../components/DateComponent';
import MUIDataTable from "mui-datatables";



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
    const options = {
        filterType: 'checkbox',
      };
      const columns = [
          {
              name: "counselingRequest",
              label: "TƯ VẤN",
              options: {
              filter: true,
              sort: true,
                customBodyRender: (value) => {
                    return (
                        <div>{value ? <i className='fa fa-check'>"Đã đăng ký"</i> : <i className='fa fa-close'>"Chưa đăng ký"</i>}</div>
                    )
                }
              }
          },
          {
              name: "username",
              label: "USERNAME",
              options: {
              filter: true,
              sort: true,
              }
          },
          {
              name: "name",
              label: "TÊN",
              options: {
              filter: true,
              sort: true,
              }
          },
          {
              name: "createdAt",
              label: "NGÀY THAM GIA",
              options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <DateComponent passedDate = {value}></DateComponent>
                    );
                },
              }
            
          },
          {
            name: "_id",
            label: "TRANG CÁ NHÂN",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <div className="dropDown">
                            Thao tác<i class="fa fa-caret-down"></i>
                            <ul className='dropDown-content small interactiveText'>
                                <li onClick={() => {navigate(`/user/${value}`);}}><i className='fa fa-arrow-right'></i></li>
                            </ul>
                        </div>
                    );
                },
            }
            
          }
         ];
    return (
        <div>
            {/* {users && <table className="table">
                    <thead>
                        <tr>
                            <th>TƯ VẤN</th>
                            <th>USERNAME</th>
                            <th>TÊN</th>
                            <th>NGÀY THAM GIA</th>
                            <th>THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((u)=>(
                            <tr key={u._id}>
                                <td>{u.counselingRequest ? <i className='fa fa-check'>"Đã đăng ký"</i> : <i className='fa fa-close'>"Chưa đăng ký"</i>}</td>
                                <td>{u.username}</td>
                                <td>{u.name}</td>
                                <td><DateComponent passedDate = {u.createdAt}></DateComponent></td>
                                <div className='none'>
                                    <div className="dropDown">
                                        Thao tác<i class="fa fa-caret-down"></i>
                                        <ul className='dropDown-content small'>
                                            <li onClick={() => {navigate(`/user/${u._id}`);}}><i className='fa fa-arrow-right'></i></li>
                                            {u.counselingRequest && <li><i className='fa fa-phone'>{u.phoneNumber}</i></li>}
                                            {u.counselingRequest && <li><i className='fa fa-commenting'></i></li>}
                                        </ul>
                                    </div>
                                </div>
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
                    
                </table>} */}

                {users && <MUIDataTable
                title={"Danh sách người dùng"}
                data={users}
                columns={columns}
                options={options}
                    />}
        </div>

    )
}
