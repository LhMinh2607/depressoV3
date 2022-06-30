import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOfFeedbacks } from '../actions/feedbackAction';
import DateComponent from '../components/DateComponent';
import MUIDataTable from "mui-datatables";

// const columns = [
//     {
//      name: "name",
//      label: "Name",
//      options: {
//       filter: true,
//       sort: true,
//      }
//     },
//     {
//      name: "company",
//      label: "Company",
//      options: {
//       filter: true,
//       sort: false,
//      }
//     },
//     {
//      name: "city",
//      label: "City",
//      options: {
//       filter: true,
//       sort: false,
//      }
//     },
//     {
//      name: "state",
//      label: "State",
//      options: {
//       filter: true,
//       sort: false,
//      }
//     },
//    ];
//    const data = [
//     { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
//     { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
//     { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
//     { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
//    ];

const options = {
  filterType: 'checkbox',
};
const columns = [
    {
        name: "content",
        label: "NỘI DUNG",
        options: {
        filter: true,
        sort: true,
        }
    },
    {
        name: "username",
        label: "USERNAME",
        options: {
        filter: true,
        sort: false,
        }
    },
    {
        name: "createdAt",
        label: "NGÀY TẠO",
        options: {
        filter: true,
        sort: false,
        }
    },
    {
        name: "_id",
        label: "TRANG CÁ NHÂN",
        options: {
        filter: true,
        sort: false,
        }
    },
   ];
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
                            <th>TRANG CÁ NHÂN</th>
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
                                    <div className="interactiveText" onClick={() => {navigate(`/user/${feed.userId}`);}}>
                                        <i className='fa fa-arrow-right'></i>
                                    </div>
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



            {/* {feedbacks && <MUIDataTable
                title={"Employee List"}
                data={feedbacks}
                columns={columns}
                options={options}
            />} */}
        </div>

    )
}
