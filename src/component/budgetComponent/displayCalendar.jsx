import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

function DisplayCalendar(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [dateData, setDateData] = useState([]);

    const [calendar, setCalendar] = useState({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear()
    });

    const [userData, setUserData] = useState({
        userId: ""
    });

    //console.log(props.itemList.userId);
    useEffect(() => {

        const userId = props.itemList.userId;
        //console.log(userId);

        setUserData({
            userId:userId
        })
        
    },[props.itemList.userId])

    useEffect(() => {

        console.log(userData);

        if(userData.userId !== ""){
        //Assign Current Month/Year to body
        const body = {
            month: calendar.month,
            year: calendar.year
        }

        //Pass body inside dateGenerator to grab all dates for the month
        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);
        //console.log(dates);

        const dateList = setDateList(dates);
        //console.log(dateList);
        //console.log(props);
        const userId = props.itemList.userId;
        //console.log(userId);

        fetchTotalList(dates, dateList, userId);

        //Pass functions nextMonth, nextYear, previousMonth, previousYear
        //fetched from dateGenerator inside calendar
        setCalendar({
            ...calendar,
            nextMonth,
            nextYear,
            previousMonth,
            previousYear
        });
    }
    }, [calendar.month,userData])



    const fetchTotalList = async (dates, dateList, userId) => {
        try {
            const res = await axios.get('http://localhost:9000/getTotalList', {
                params: {
                    userId: userId,
                    dateList: dateList
                }
            });

            if (null !== res.data.totalList && !res.data.error) {
                const totalList = res.data.totalList;

                updateDates(dates, dateList, totalList);

            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateDates = (dates, dateList, totalList) => {

        var totalHashMap = new Map();

        //console.log(dateList);
        //console.log(totalList);
        var j = 0;
        var i = 0;
        var totalValue;
        var dateString;
        var dateIndex = 0;

        while(i < dateList.length){

            if(j < totalList.length && dateList[i] === (totalList[j].listDate)){
                totalHashMap.set(dateList[i], totalList[j].listTotal);
                j++;
                i++;
            }else{
                totalHashMap.set(dateList[i], '0');
                i++;
            }
        }

        dates.map((week) => {
            week.map((each) => {
                dateString = each.year + '-' + each.month + '-' + each.date;
                totalValue = parseInt(totalHashMap.get(dateString));
                Object.assign(each, {total: totalValue});
                Object.assign(each, {dateIndex: dateIndex});
                dateIndex++;
            })
        })
        //console.log(totalHashMap);
        //Pass dates fetched from dateGenerator inside calendarDateList
        setDateData([...dates]);
        props.onAddDateList(dates);
        //console.log(dates);
    }

    const setDateList = (dates) => {
        var dateList = [];

        dates.map((week) => {
            week.map((each) => {
                var dateString = each.year + '-' + each.month + '-' + each.date;
                dateList.push(dateString);
            })
        })

        return dateList;
    }

    function onClickNext() {
        const body = {
            month: calendar.nextMonth,
            year: calendar.nextYear
        };

        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

        const dateList = setDateList(dates);
        const userId = props.userId;
        fetchTotalList(dates, dateList, userId);

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

    function onClickPrevious() {
        const body = {
            month: calendar.previousMonth,
            year: calendar.previousYear
        };

        const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

        const dateList = setDateList(dates);
        const userId = props.userId;
        fetchTotalList(dates, dateList, userId);

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

    function onSelectDate(date) {
        setSelectedDate(new Date(date.year, date.month, date.date))
    }

    return (
        <div style={{ width: '100%', paddingTop: 50 }}>
            <Container>
                <div style={{ padding: 10 }}>
                    <div onClick={onClickPrevious} style={{ float: 'left', width: '50%' }}>
                        Prev
                    </div>
                    <div onClick={onClickNext} style={{ float: 'left', width: '50%', textAlign: 'right' }}>
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
                                        <td key={day} style={{ padding: '5px 0', border: 'solid blue' }}>
                                            <div style={{ textAlign: 'center', padding: '5px 0' }}>
                                                {day}
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {dateData.length > 0 && dateData.map((week, index) => (
                                    <tr key={index}>
                                        {week.map((each, subIndex) => (
                                            <td key={subIndex} style={{ padding: '5px 0', border: 'solid red' }}>
                                                <div onClick={() => onSelectDate(each)} style={{ textAlign: 'center', padding: '5px 0' }}>
                                                    {each.date}
                                                </div>
                                                <div style={{ textAlign: 'center', padding: '5px 0' }}>
                                                    T:{each.total}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ padding: 10 }}>
                    Selected Date: {selectedDate.toDateString()}
                </div>
            </Container>
        </div>
    );
}

export default DisplayCalendar;