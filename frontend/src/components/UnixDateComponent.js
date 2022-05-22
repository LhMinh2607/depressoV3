import React from 'react'

export default function UnixDateComponent(props) {

    const {passedDate} = props;
    const {showTime=true} = props;
    const {showDate=true} = props;

    const date = new Date(passedDate * 1000);
    const publishedHour = date.getHours();
    const publishedMin = date.getMinutes();
    const publishedDay = date.getDay()+1;
    const publishedDate = date.getDate();
    const publishedMonth = date.getMonth()+1;
    const publishedYear = date.getFullYear();

    return (

        <div>
            {props.children}
            {showTime && (publishedHour+":")}
            {
                showTime &&
                (publishedMin < 10 ? <>0{publishedMin}</> : publishedMin)
            }
                
            {
                showDate && (
                publishedDay === 2 ? <> Thứ Hai</> : 
                publishedDay === 3 ? <> Thứ Ba</> :
                publishedDay === 4 ? <> Thứ Tư</> :
                publishedDay === 5 ? <> Thứ Năm</> :
                publishedDay === 6 ? <> Thứ Sáu</> :
                publishedDay === 7 ? <> Thứ Bảy</> :
                publishedDay === 1 && <> Chủ Nhật</>)
            }
            
            {showDate && ", "}
            {showDate && publishedDate+"/"+publishedMonth+"/"+publishedYear}
        </div>
    )
}
