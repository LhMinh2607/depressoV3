import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

export default function HomePage() {

    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;

    return (
        <div>
            <div className='row center'>
                {userInfo ? <Link className="linkButton" to={`/user/${userInfo._id}`}>BẮT ĐẦU</Link>:
                    <Link className="linkButton" to={`/signin`}>BẮT ĐẦU</Link>
                }
            </div>
        </div>
    )
}
