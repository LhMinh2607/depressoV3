import React from 'react'

export default function DateComponent(props) {

    const {passedDate} = props;
    const {isBirthDate} = props;

    const date = new Date(passedDate);
    const publishedHour = date.getHours();
    const publishedMin = date.getMinutes();
    const publishedDay = date.getDay()+1;
    const publishedDate = date.getDate();
    const publishedMonth = date.getMonth()+1;
    const publishedYear = date.getFullYear();

    return (

        <div>
            {props.children}
            {!isBirthDate && (publishedHour+":")}
            {
                !isBirthDate &&
                (publishedMin < 10 ? <>0{publishedMin}</> : publishedMin)
            }
                
            {
                !isBirthDate && (
                publishedDay === 2 ? <> Mon</> : 
                publishedDay === 3 ? <> Tue</> :
                publishedDay === 4 ? <> Wed</> :
                publishedDay === 5 ? <> Thu</> :
                publishedDay === 6 ? <> Fri</> :
                publishedDay === 7 ? <> Sat</> :
                publishedDay === 1 && <> Sun</>)
            }
            
            {!isBirthDate && ", "}
            {publishedDate+"/"+publishedMonth+"/"+publishedYear}
        </div>
    )
}
