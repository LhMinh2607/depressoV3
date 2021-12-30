import React from 'react'

export default function CategoryIcon(props) {
    
    
    const {categoryName} = props;
    
    return (
        <div>
            {
                categoryName === "Hỗ trợ" ? <div className="row left">
                    <i className="fa fa-phone"></i><div className="support-div">{categoryName}</div>
                    </div> : categoryName === "Chung" ? <div className="row left">
                        <i className="fa fa-globe"></i><div className="general-div">{categoryName}</div>
                        </div> :
                categoryName === "Lạc đề" ? <div className="row left">
                    <i className="fa fa-circle-o"></i><div className="offcategory-div">{categoryName}</div>
                    </div> : categoryName === "Tin tức" && <div className="row left">
                        <i className="fa fa-fire"></i><div className="news-div">{categoryName}</div>
                        </div>
            }
        </div>
    )
}
