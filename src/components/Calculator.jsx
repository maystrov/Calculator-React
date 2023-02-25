import React, { Component } from 'react';
import Button from './Button';
import buttons from '../db';
import BUTTONS from '../constants';
import '../App.css';

class Calculator extends Component {
  state = {
    firstArg: '',
    secondArg: '',
    calculation: '',
    result: '',
    row: '',
  };

  allClear = () => {
    this.setState({
      firstArg: '',
      secondArg: '',
      calculation: '',
      result: '',
    });
  };

  clearArgs = () =>
    this.setState({ firstArg: '', calculation: '', secondArg: '' });

  argsUpdate = () => {
    const { firstArg, secondArg, calculation } = this.state;
    this.setState({
      row: firstArg + ' ' + calculation + ' ' + secondArg,
      result: '',
      secondArg: '',
    });
  };

  deleteSignHandle = () => {
    if (this.state.secondArg) {
      this.setState({ secondArg: this.state.secondArg.slice(0, -1) });
    } else if (this.state.calculation) {
      this.setState({ calculation: '' });
    } else if (this.state.firstArg) {
      this.setState({ firstArg: this.state.firstArg.slice(0, -1) });
    }
  };

  calculateHandle = (buttonValue) => {
    let { firstArg, secondArg, calculation } = this.state;
    this.setState({ calculation: buttonValue });
    console.log(calculation);
    switch (calculation) {
      case '+':
        this.setState({ firstArg: +firstArg + +secondArg });
        this.argsUpdate();
        break;
      case '-':
        this.setState({
          firstArg: +firstArg - +secondArg,
        });
        this.argsUpdate();
        break;
      case 'x':
        this.setState({
          firstArg: +firstArg * +secondArg,
        });
        this.argsUpdate();
        break;
      case '/':
        this.setState({
          firstArg: +firstArg / +secondArg,
        });
        this.argsUpdate();
        break;
      case '%':
        this.setState({
          firstArg: (+firstArg / 100) * +secondArg,
        });
        this.argsUpdate();
        break;
      default:
        break;
    }
  };

  handleNumberButtons = (buttonValue) => {
    !this.state.calculation
      ? this.setState({ firstArg: this.state.firstArg + buttonValue })
      : this.setState({ secondArg: this.state.secondArg + buttonValue });
  };

  handleCalculationButtons = (buttonValue) => {
    !this.state.calculation
      ? this.setState({ calculation: buttonValue })
      : this.calculateHandle(buttonValue);
  };
  handleOperationButtons = (buttonValue) => {
    switch (buttonValue) {
      case 'AC':
        this.allClear();
        break;
      case 'Del':
        this.deleteSignHandle();
        break;
      case '=':
        this.calculateHandle();
        break;
      default:
        break;
    }
  };

  handleButtonClick = (buttonValue) => {
    BUTTONS.NUMBERS.includes(buttonValue) &&
      this.handleNumberButtons(buttonValue);

    BUTTONS.CALCULATIONS.includes(buttonValue) &&
      this.handleCalculationButtons(buttonValue);

    BUTTONS.OPERATIONS.includes(buttonValue) &&
      this.handleOperationButtons(buttonValue);
  };

  render() {
    const { firstArg, secondArg, calculation, result, row } = this.state;
    return (
      <div className="calculator">
        <div className="screen">
          {firstArg && !calculation && <p className="big">{firstArg}</p>}
          {firstArg && calculation && !secondArg && (
            <p className="row">
              {firstArg} {calculation}
            </p>
          )}
          {firstArg && secondArg && !result && (
            <div>
              <p className="row">
                {firstArg} {calculation}
              </p>
              <p className="big">{secondArg}</p>
            </div>
          )}
          {result && (
            <div>
              <p className="row">{row}</p>
              <p className="big">{result}</p>
            </div>
          )}
        </div>
        <div className="buttons">
          {buttons.map((button) => (
            <Button
              key={button.value}
              className={button.className}
              handleClick={this.handleButtonClick}
              value={button.value}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
