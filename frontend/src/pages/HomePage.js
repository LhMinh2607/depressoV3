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

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listOfPostsInHome());
    }, [dispatch])
    
    return (
        <div>
            <br></br>
            <div className='scrollAnimatedTextDiv row center'>
                <div className='row right'>Bạn đang ‎</div>
                <div className='scrollAnimatedText row left'>
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
            <div className='row center '>BẤM VÀO TÁCH CÀ PHÊ ĐỂ BẮT ĐẦU</div>
            {userInfo ? <div className='row center' >
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
        </div>

    )
}
