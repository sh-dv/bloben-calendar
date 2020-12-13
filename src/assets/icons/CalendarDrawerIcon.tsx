import React from 'react';

const CalendarDrawerIcon = (props: any) =>
    <svg className={props.className} width='24' height='24' version='1.1' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 0h24v24H0V0z' style={{fill: 'none'}}/>
        <path d='M20 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H7V2c0-.55-.45-1-1-1s-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 18H5c-.55 0-1-.45-1-1V8h16v12c0 .55-.45 1-1 1z'/>

<text className={props.className} x='7.8452177' y='19.648264'>
    <tspan x={props.textX} y='19.648264'>{props.text}</tspan>
 </text>
            </svg >

export default CalendarDrawerIcon;
