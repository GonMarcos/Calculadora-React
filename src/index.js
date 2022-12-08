import "./index.css";
import ReactDom from "react-dom";
import React from "react";
import Calculadora from "./main/Calculator";

ReactDom.render(
    <div>
        <h1>Calculadora</h1>
        <Calculadora/>
    </div>
, document.getElementById("root"));
