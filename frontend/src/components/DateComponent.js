import React from 'react'

export default function DateComponent(props) {

    const {passedDate} = props;
    const {isbirthDate} = props;
    const {size} = props;

    const date = new Date(passedDate);
    const publishedHour = date.getHours();
    const publishedMin = date.getMinutes();
    const publishedDay = date.getDay()+1;
    const publishedDate = date.getDate();
    const publishedMonth = date.getMonth()+1;
    const publishedYear = date.getFullYear();

    return (

        <div style={size && size==="small" && {fontSize: "1rem"}}>
            {props.children}
            {!isbirthDate && (publishedHour+":")}
            {
                !isbirthDate &&
                (publishedMin < 10 ? <>0{publishedMin}</> : publishedMin)
            }
                
            {
                !isbirthDate && (
                publishedDay === 2 ? <> Thứ Hai</> : 
                publishedDay === 3 ? <> Thứ Ba</> :
                publishedDay === 4 ? <> Thứ Tư</> :
                publishedDay === 5 ? <> Thứ Năm</> :
                publishedDay === 6 ? <> Thứ Sáu</> :
                publishedDay === 7 ? <> Thứ Bảy</> :
                publishedDay === 1 && <> Chủ Nhật</>)
            }
            
            {!isbirthDate && ", "}
            {publishedDate+"/"+publishedMonth+"/"+publishedYear}
        </div>
    )
}
