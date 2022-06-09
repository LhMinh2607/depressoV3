import React, { useState } from 'react'

export default function TagSelect(props) {
    const {categories, selectItem} = props;
    const [active, setActive] = useState('all');

    const select = (ca) =>{
        if(ca==="all"){
            setActive("all");
        }else{
            setActive(ca.name);
        }
        selectItem(ca);

    }
    const scrollToRight = () => {
        // document.getElementById("tagSelect").scrollLeft += 200;
        document.getElementById("tagSelect").scrollBy({
            left: 200,
            behaviour: 'smooth'
        });
    }
    const scrollToLeft = () => {
        // document.getElementById("tagSelect").scrollLeft -= 200;
        document.getElementById("tagSelect").scrollBy({
            left: -200,
            behaviour: 'smooth'
        });
    }
  return (
    <div className='row center'>
        <div className='clickableIcon slimRectangle'  onClick={scrollToLeft}>
            <i className='fa fa-arrow-left'></i>
        </div>
        <div id="tagSelect" className='tagSelect'>
            <div onClick={()=>select("all")} className='tagSelectItem'style={active==="all" ? {backgroundColor: "blue"} : {backgroundColor: "grey"}}>
                Tất cả
            </div>
            {
                categories.map(ca=>(
                    <div onClick={()=>select(ca)} className='tagSelectItem' value={ca._id} style={ca.name===active ? {backgroundColor: ca.backgroundColor} : {backgroundColor: "grey"}}>
                        {ca.name}
                    </div>
                ))
            }
        </div>
        <div className='clickableIcon slimRectangle' onClick={scrollToRight}>
            <i className='fa fa-arrow-right'></i>
        </div>
    </div>
  )
}
