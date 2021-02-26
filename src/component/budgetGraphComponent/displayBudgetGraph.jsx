import React, { useState, useEffect } from 'react';
import CreateBudgetGraphLine from './createBudgetGraphLine';
import CreateGraphAmountText from './createGraphAmountText';
import CreateBar from './createBar';
import '../../css/graph.css';
import { datesGenerator } from 'dates-generator';

function DisplayBudgetGraph(props) {

    const [barData, setBarData] = useState({
        barWidth:"",
        barMaxHeight: "",
    })

    useEffect (()=>{

        const maxDays = findMaxDays(props.dateList);
        setWidthValue(maxDays);

        setMaxHeightValue(props.dateList);


    },[props.dateList])

    const findMaxDays = (dateList) =>{

        var maxDays = 0;
        
        dateList.map((week) => {
            maxDays = week.length + maxDays;
        });

        return maxDays;
    }

    function setWidthValue(maxDays){

        console.log(maxDays);

        const width = 100/maxDays;

        console.log(width + " Width Value");

        setBarData(previousValue => {
            return{
                ...previousValue,
                barWidth:width
            }
        })

    }

    function setMaxHeightValue(dateList){

        var maxTotalValue = 0;
        var maxHeight = 1;

        dateList.map((week) =>{
            week.map((each) => {
                maxTotalValue = Math.max(each.total, maxTotalValue);
            })
        })

        for(var i = 0; i < (maxTotalValue.toString().length); i++){
            maxHeight = maxHeight + "0";
        }

        console.log(maxHeight);

        setBarData(previousValue => {
            return{
                ...previousValue,
                barMaxHeight:maxHeight
            }
        })
    }

    return (
        <div className ="graph-wrapper">
            <div className = "graph">

            <CreateGraphAmountText/>

            <div class="barContainer">
                <CreateBudgetGraphLine/>
                {props.dateList.map((week)=>(
                    week.map((each,index) => (
                        <CreateBar key = {index}
                            barWidth={barData.barWidth}
                            barMaxHeight = {barData.barMaxHeight}
                            total = {each.total}
                            dateIndex = {each.dateIndex}
                        />
                    ))  
                ))}
            </div>
            </div>
        </div>
    )
}

export default DisplayBudgetGraph;