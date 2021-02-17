import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//const { datesGenerator } = require('dates-generator');
import { datesGenerator } from 'dates-generator';

//Disclosure: The component was developed based on the following code. Credit: Ibrahim
//https://dev.to/aibrahim3546/creating-a-custom-calendar-in-react-from-scratch-1hej

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Container = styled.div`
    width: 400px;
    border:1px solid black;
    margin: 0 auto;
`

const MonthText = styled.div`
    font-size: 26px;
    font-weight: bold;
    text-align: center;
`

function DisplayCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dates, setDates] = useState([]);
    const [calendar, setCalendar] = useState({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear()
    });

    //console.log(selectedDate);
    //console.log(calendar);

    useEffect(() => {

        //Assign Current Month/Year to body
        const body = {
            month: calendar.month,
            year: calendar.year
        }

        //Pass body inside dateGenerator to grab all dates for the month
        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

        console.log(dates);
        //console.log(dates[1]);

        // dates.map((week,index) => {
        //     console.log(week);
        //     dates[index].map((each) => {
        //         console.log(each.date);
        //     })
        // })

        //Pass dates fetched from dateGenerator inside dates
        setDates([...dates]);

        //Pass functions nextMonth, nextYear, previousMonth, previousYear
        //fetched from dateGenerator inside calendar
        setCalendar({
            ...calendar,
            nextMonth,
            nextYear,
            previousMonth,
            previousYear
        });
    }, [])

    function onClickNext(){
        const body = {
            month: calendar.nextMonth,
            year: calendar.nextYear
        };

        const {dates, nextMonth, nextYear, previousMonth, previousYear} = datesGenerator(body);

        setDates([...dates]);

        setCalendar({
            ...calendar,
            month: calendar.nextMonth,
            year: calendar.nextYear,
            nextMonth,
            nextYear,
            previousMonth,
            previousYear
        });
    }

    function onClickPrevious(){
        const body = {
            month: calendar.previousMonth,
            year: calendar.previousYear
        };

        const {dates, nextMonth, nextYear, previousMonth, previousYear} = datesGenerator(body);

        setDates([...dates]);

        setCalendar({
            ...calendar,
            month: calendar.previousMonth,
            year: calendar.previousYear,
            nextMonth,
            nextYear,
            previousMonth,
            previousYear
        });
    }

    function onSelectDate(date){
        setSelectedDate(new Date(date.year, date.month, date.date))
    }

    return (
        <div style={{ width: '100%', paddingTop: 50 }}>
            <Container>
                <div style={{padding: 10}}>
                    <div onClick={onClickPrevious} style={{float: 'left', width: '50%'}}>
                        Prev
                    </div>
                    <div onClick={onClickNext} style={{float: 'left', width: '50%', textAlign: 'right'}}>
                        Next
                    </div>
                </div>
                <MonthText>
                    {months[calendar.month]}
                </MonthText>
                <div>

                    <div>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    {days.map((day) => (
                                        <td key={day} style={{ padding: '5px 0', border: 'solid blue'}}>
                                            <div style={{ textAlign: 'center', padding: '5px 0' }}>
                                                {day}
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {dates.length > 0 && dates.map((week,index) => (
                                    <tr key={index}>
                                        {week.map((each,subIndex) => (   
                                            <td key={subIndex} style={{ padding: '5px 0', border: 'solid red' }}> 
                                                <div onClick = {() => onSelectDate(each)} style={{ textAlign: 'center', padding: '5px 0' }}>
                                                    {each.date}
                                                </div>
                                             </td>
                                        ))} 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{padding: 10}}>
                    Selected Date: {selectedDate.toDateString()}
                </div>
            </Container>
        </div>
    );
}

export default DisplayCalendar;