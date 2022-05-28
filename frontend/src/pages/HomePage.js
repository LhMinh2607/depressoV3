import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import Editor from 'rich-markdown-editor';
import { listOfPostsInHome } from '../actions/postAction';

export default function HomePage() {

    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const homePostList = useSelector((state)=>state.homePostList);
    const {loading: loadingPosts, error: errorPosts, posts} = homePostList;

    const navigate = useNavigate();
    const pfp = "https://cdn.discordapp.com/emojis/967412208323674243.webp?size=48&quality=lossless";


    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listOfPostsInHome());
    }, [dispatch])
    
    return (
        <div style={{height: "300vh"}}>
            <br></br>
            <div className='scrollAnimatedTextDiv'>
                <div className='row'>Bạn đang ‎</div>
                <div className='scrollAnimatedText row'>
                    <span>
                        thấy tuyệt vọng?<br/><br/>
                        buồn?<br/><br/>
                        muốn đăng xuất khỏi thế giới?<br/><br/>
                        mất tự tin?<br/><br/>
                        bị áp lực?<br/><br/>
                    </span>
                </div>
            </div>
            
            {/* <div className='row center' style={{padding: "5vh"}}>
                {userInfo ? <div className="interactiveText" onClick={()=>navigate(`/user/${userInfo._id}`)}>BẮT ĐẦU</div>:
                    <div className="interactiveText" onClick={()=>navigate(`/signin`)}>BẮT ĐẦU</div>
                }
            </div> */}
            {userInfo ? <div className='row center' style={{height: "20rem"}} >
                <div className='col-2 ' >
                    <div className='row center'>
                        <div className='coffeeMachineTop'>
                            <div className='coffeeMachineButton'></div>
                            <div className='coffeeMachineButton2'></div>
                            <div className='coffeeMachinePipe'>
                                <div className='coffeeMachinePipe2'></div>
                            </div>
                        </div>
                    </div>
                    <div className='row center'>
                        <div className='coffeeMachineBody'>
                            <div className='coffeeMachineBottom'></div>
                        </div>
                        <div className='coffeeFluid'></div>
                        <div className='coffeeCup interactiveText' onClick={()=>navigate(`/user/${userInfo._id}`)}>
                            <div className='coffeeHandle'></div>
                        </div>
                        <div className='steam'></div>
                        <div className='steam2'></div>
                        <div className='steam3'></div>
                    </div>
                </div>
            </div> :
            <div className='row center ' >
                <div className='col-2 ' >
                    <div className='row center'>
                        <div className='coffeeMachineTop'>
                            <div className='coffeeMachineButton'></div>
                            <div className='coffeeMachineButton2'></div>
                            <div className='coffeeMachinePipe'>
                                <div className='coffeeMachinePipe2'></div>
                            </div>
                        </div>
                    </div>
                    <div className='row center'>
                        <div className='coffeeMachineBody'>
                            <div className='coffeeMachineBottom'></div>
                        </div>
                        <div className='coffeeFluid'></div>
                        <div className='coffeeCup interactiveText' onClick={()=>navigate(`/user/${userInfo._id}`)}>
                            <div className='coffeeHandle'></div>
                        </div>
                        <div className='steam'></div>
                        <div className='steam2'></div>
                        <div className='steam3'></div>
                    </div>
                </div>
            </div>
            }
            <div className='row center' style={{paddingTop: "2rem"}}>BẤM VÀO TÁCH CÀ PHÊ ĐỂ BẮT ĐẦU</div>

            
            <div className='row center' style={{paddingTop: "5rem", height: "25rem", paddingBottom: "5rem"}}>
                <div className='col-2'>
                    <div className='row center'>
                        <div className='monitor'>
                        </div>
                    </div>
                    <div className='row center'>
                        <div className='monitorStand'>
                            <div className='monitorStand2'>

                            </div>
                        </div>  
                    </div>
                </div>
                
            </div>
            <div className='row center'>1 MÀN HÌNH, TẤT CẢ KÍCH THƯỚC</div>

            <div className='row center ' style={{padidngTop: "1rem", height: "30rem"}}>
                <div className='col-2'>
                    <div>
                        <div className='row center'>
                            <div className='animatedChatBox interactiveText'  onClick={()=>navigate(`/user/${userInfo._id}`)}>
                                <div className='row left'>
                                    <img src={pfp} style={{height: "1.5rem"}}></img>MentalBot
                                </div>
                                <div className='animatedMessageContainer left'>
                                    <div className='animateMessage1 messageSent1'>Chào Minh</div>
                                </div>
                                <div  className='animatedMessageContainer left'>
                                    <div className='animateMessage1  messageSent2'>Khỏe hong?</div>
                                </div>
                                <div  className='animatedMessageContainer right'>
                                    <div className='animateMessage2 messageSent3'>hong</div>
                                </div>
                                <div  className='animatedMessageContainer'>
                                    <div className='animateMessage1  left messageSent4'>Sao nè?</div>
                                </div>
                                <div  className='animatedMessageContainer right'>
                                    <div className='animateMessage2  messageSent5'>mệt</div>
                                </div>
                            </div>
                        </div>
                        <div className='row center'>

                        </div>
                    </div>
                </div>
            </div>
            <div className='row center'>CHATBOT</div>

            <div className='row center' style={{paddingTop: "5rem"}}>
                <div className='col-2'>
                    <div className='row center'>
                        <div className='phonePart'>
                            <div className='phonePart2'>
                            </div>
                            <div className='phonePart2 bottom'>
                            </div>
                        </div>
                        <div className='animatedPointer'>
                        </div>
                        <div className='animatedPointerHandle'>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row center'>CALLCENTER</div>

        </div>

    )
}
