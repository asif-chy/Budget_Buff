import React from 'react';
import CreateBudgetGraphLine from './createBudgetGraphLine';
import CreateGraphAmountText from './createGraphAmountText';
import CreateBar from './createBar';
import '../../css/graph.css';

function DisplayBudgetGraph(props) {

    //console.log(props);

    return (
        <div className ="graph-wrapper">
            <div className = "graph">

            <CreateGraphAmountText/>

            <div class="barContainer">
                <CreateBudgetGraphLine/>
                <CreateBar percent={10}/>
            </div>
            </div>
        </div>
    )
}

export default DisplayBudgetGraph;