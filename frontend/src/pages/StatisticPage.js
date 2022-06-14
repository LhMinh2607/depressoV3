import React, { useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
  import { Bar, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { statOfEverything } from '../actions/adminAction';
import zoomPlugin from 'chartjs-plugin-zoom';

export default function StatisticPage() {

    const fullStat = useSelector(state=>state.fullStat);
    const {loading, error, stat} = fullStat;

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        zoomPlugin
        );

    ChartJS.register(
        ArcElement, Tooltip, Legend
    )

    const options = {
        // barThickness: 20,
        
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Biểu đồ',
            },
            zoom: {
                zoom: {
                    wheel: {
                    enabled: true,
                    },
                    pinch: {
                    enabled: true
                    },
                    mode: 'x',
                }
            }
        },
        
        scales: {
            y: [{
                scaleLabel: {
                display: true,
                labelString: 'Bài viết',
                ticks: {
                    fontSize: 40
                }
                }
            }],
            x: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Ngày',
                    ticks: {
                        fontSize: 40
                    },

                },
            }],
        }     
    };

    const options2 = {
        responsive: true,
        maintainAspectRatio: true,
    };
    const getRandomColor = () => {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const getUsersWhoUpdatedMoodStat = () =>{
        var hasMoodCount = 0;
        var hasNoMoodCount = 0;
        if(stat && stat.usersWhoUpdatedMood){
            stat.usersWhoUpdatedMood.map(u=>u.mood ? hasMoodCount++ : hasNoMoodCount++)
        }
        hasMoodCount={status: "Đã cập nhật tâm trạng", moodCount: hasMoodCount}
        hasNoMoodCount={status: "Chưa cập nhật tâm trạng", moodCount: hasNoMoodCount}
        return [hasMoodCount, hasNoMoodCount]
    }

    const getPostStatByUserCountStat = () =>{
        var postedCount = 0;
        var notPostedCount = 0;
        let posted = {};
        let notPosted = {};
        if(stat && stat.postStatByUserCount && stat.users){
            postedCount = stat.postStatByUserCount.length
            notPostedCount = stat.users.length - stat.postStatByUserCount.length
            posted = {status: "Đã đăng bài viết", hasPosts: postedCount}
            notPosted = {status: "Chưa đăng bài viết", hasPosts: notPostedCount}
            console.log([posted, notPosted])
            return [posted, notPosted]
        }
        
    }

    const getCommentStatByUserCountStat = () =>{
        var postedCount = 0;
        var notPostedCount = 0;
        let posted = {};
        let notPosted = {};
        if(stat && stat.commentStatByUserCount && stat.users){
            postedCount = stat.commentStatByUserCount.length
            notPostedCount = stat.users.length - stat.commentStatByUserCount.length
            posted = {status: "Đã tham gia phản hồi", hasPosts: postedCount}
            notPosted = {status: "Chưa tham gia phản hồi", hasPosts: notPostedCount}
            console.log([posted, notPosted])
            return [posted, notPosted]
        }
        
    }

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(statOfEverything());
    },[])

  return (
    <div className=''>
        <div className='emptySpace'>
        </div>
        <div className='row'>
            {stat && stat.usersWhoUpdatedMood && <div className='statDiv'><Pie data={{
                labels: getUsersWhoUpdatedMoodStat().map((u)=>u.status),
                datasets: [
                    {
                    label: 'of Votes',
                    data: getUsersWhoUpdatedMoodStat().map((u)=>u.moodCount),
                    backgroundColor:  getUsersWhoUpdatedMoodStat().map(()=>getRandomColor()),
                    // borderColor: orderedDrinkCount.map((od)=>getRandomColor()),
                    borderWidth: 1,
                    },
                ],
            }} options={options2}></Pie></div>}
            {getPostStatByUserCountStat() && <div className='statDiv'><Pie data={{
                labels: getPostStatByUserCountStat().map((u)=>u.status),
                datasets: [
                    {
                    label: 'of Votes',
                    data: getPostStatByUserCountStat().map((u)=>u.hasPosts),
                    backgroundColor:  getPostStatByUserCountStat().map(()=>getRandomColor()),
                    // borderColor: orderedDrinkCount.map((od)=>getRandomColor()),
                    borderWidth: 1,
                    },
                ],
            }} options={options2}></Pie></div>}
            {getCommentStatByUserCountStat() && <div className='statDiv'><Pie data={{
                labels: getCommentStatByUserCountStat().map((u)=>u.status),
                datasets: [
                    {
                    label: 'of Votes',
                    data: getCommentStatByUserCountStat().map((u)=>u.hasPosts),
                    backgroundColor:  getCommentStatByUserCountStat().map(()=>getRandomColor()),
                    // borderColor: orderedDrinkCount.map((od)=>getRandomColor()),
                    borderWidth: 1,
                    },
                ],
            }} options={options2}></Pie></div>}
            
            
        </div>
        <div className='row'>
            {stat && stat.postByDate && <div className='statDiv bar'><Bar options={options} data={{
                labels: stat.postByDate.map((p => p._id)),
                datasets: [
                    {
                        label: 'Số lượng bài đăng',
                        // data: [1, 2],
                        data: stat.postByDate.map((p => p.count)),
                        backgroundColor: '#0861a1',
                        hoverBackgroundColor: "#086222"
                    }
                ],
            }} 
            height={500} width={350}/></div>}
            {stat && stat.chatByDateArr && <div className='statDiv bar'><Bar options={options} data={{
                labels: stat.chatByDateArr.map((p => p.date)),
                datasets: [
                    {
                        label: 'Số tin nhắn',
                        // data: [1, 2],
                        data: stat.chatByDateArr.map((p => p.count)),
                        backgroundColor: '#0861a1',
                        hoverBackgroundColor: "#086222"
                    }
                ],
            }} 
            height={500} width={350}/></div>}
        </div>
    </div>
  )
}
