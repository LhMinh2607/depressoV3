import React from 'react'

export default function AccumulatingComponent(props) {

    const {upvotes, downvotes, userInfoId, accumulate} = props;
  return (
    <div className='col-mini'>
        <div className='row center'>
            {upvotes && downvotes && upvotes.length - downvotes.length}
        </div>
        <div className='row'>
            <div className='accumulate' style={userInfoId && upvotes && upvotes.indexOf(userInfoId)!==-1 ? {color: "orange"} : {color: "grey"}} onClick={() => accumulate("upvote")}>
                <i className='fa fa-thumbs-up'></i>
            </div>
            <div className='accumulate' style={userInfoId && downvotes && downvotes.indexOf(userInfoId)!==-1 ? {color: "orange"} : {color: "grey"}} onClick={() => accumulate("downvote")}>
                <i className='fa fa-thumbs-down'></i>
            </div>
        </div>
        
    </div>
  )
}
