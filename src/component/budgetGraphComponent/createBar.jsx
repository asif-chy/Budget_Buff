import React from 'react';
import '../../css/graph.css';

function CreateBar({percent}) {

    //console.log(props);

    return (
        <div className = "bar" style={{width: `${percent}%`}}>
        </div>
    )
}

export default CreateBar;