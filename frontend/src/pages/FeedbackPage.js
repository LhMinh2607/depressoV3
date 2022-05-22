import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOfFeedbacks } from '../actions/feedbackAction';
import DateComponent from '../components/DateComponent';

export default function FeedbackPage() {


    const feedbackList = useSelector(state=>state.feedbackList);
    const {loading, error, feedbacks} = feedbackList;

    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading: loadingUser, error: errorUser} = userSignin;

    const dispatch = useDispatch();
    useEffect(()=>{
        if(userInfo && userInfo.role=="admin")
        {
            dispatch(listOfFeedbacks());
        }
    }, [])

    const navigate = useNavigate();
    return (
        <div>
            {feedbacks && <table className="table">
                    <thead>
                        <tr>
                            <th>NỘI DUNG</th>
                            <th>USERNAME</th>
                            <th>NGÀY TẠO</th>
                            <th>URL NGƯỜI DÙNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            feedbacks.map((feed)=>(
                            <tr key={feed._id}>
                                <td>{feed.content}</td>
                                <td>{feed.username}</td>
                                <td><DateComponent passedDate = {feed.createdAt}></DateComponent></td>
                                <td>
                                    <button type="button" className="tiny primary" onClick={() => {navigate(`/user/${feed.userId}`);}}>
                                        Trang cá nhân
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                        <tr>
                            <td></td>
                            <th>  </th>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    
                </table>}
        </div>

    )
}
