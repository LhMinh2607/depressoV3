import React from 'react'
import {Link} from 'react-router-dom';


export default function NotFoundPage() {
    return (
        <div>
            
            <div className="row center">
                    {/* <img className="" src="https://thanhbinhpc.com/wp-content/uploads/2019/03/sua-loi-404-tren-may-tinh.1PNG.png"></img> */}
                <div title='404' className='glitch-div' style={{fontSize: '10rem'}}>
                    404
                </div>
            </div>
            <div className="row center">
                 <Link to='/'>Về trang chủ</Link>   
            </div>
        </div>
    )
}
