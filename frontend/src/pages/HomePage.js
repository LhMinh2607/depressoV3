import React from 'react'
import {Link} from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <div className='row center'>
                <Link className="linkButton" to="/forum">BẮT ĐẦU</Link>
            </div>
        </div>
    )
}
