import React,{useEffect} from 'react';

let renderCount = 0;
export default function RenderCount() {

    useEffect(() => {
        renderCount ++;
    })
    return<div> Render Count: {renderCount}</div>
}