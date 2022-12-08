import "./Calculator.css";
import React, { Component } from "react";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentValue: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.setOperation = this.setOperation.bind(this);
    this.addDigito = this.addDigito.bind(this);
    this.clearMemory = this.clearMemory.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    // mudar pro segundo valor do array
    if (this.state.currentValue === 0) {
      this.setState({ operation, currentValue: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      /* try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)

      } catch(e) {
        values[0] = this.state.values[0]
      } */

      switch (currentOperation) {
        case "+":
          values[0] += values[1];
          break;
        case "-":
          values[0] -= values[1];
          break;
        case "*":
          values[0] *= values[1];
          break;
        case "/":
          values[0] /= values[1];
          break;

        default:
          break;
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        currentValue: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigito(n) {
    // impede que coloque mais de um ponto '.'
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay; // impede que o 0 fique a frente de números que podem ser digitados

    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.currentValue; //manipulando os índices [0,1]
      const newValue = parseFloat(displayValue); //converteu para float
      const values = [...this.state.values]; //pegar os valores
      values[i] = newValue; //alterar o valor atual
      this.setState({ values }); // substituiu o novo array dentro de state
      console.log(values);
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigito} />
        <Button label="8" click={this.addDigito} />
        <Button label="9" click={this.addDigito} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigito} />
        <Button label="5" click={this.addDigito} />
        <Button label="6" click={this.addDigito} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigito} />
        <Button label="2" click={this.addDigito} />
        <Button label="3" click={this.addDigito} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigito} double />
        <Button label="." click={this.addDigito} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
