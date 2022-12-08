import React from "react";
import './Display.css'

const app = props => {
    return (
        <div className="display">{props.value}</div>
    )
}

export default app