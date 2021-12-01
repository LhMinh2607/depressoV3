import React from 'react'

export default function MessageBox(props) {
    return(
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.variant==="error" ? <i className="fa fa-warning"></i> : <i className="fa fa-info-circle"></i>}{props.children}
        </div>
    )
}