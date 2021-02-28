import React from 'react';
import '../../css/graph.css';

function CreateGraphAmountText(props) {

    console.log(props);

    return (
        <div className = "graphAmountText" >
            {props.lineDataArray.map((line,index) =>(
                <div className="text" style ={{bottom:`${(8)+(10*index)}%`}}>{line}</div>
            ))}
        </div>
    )
}
// style={{bottom: `${(props.index)*10}%`}}
export default CreateGraphAmountText;