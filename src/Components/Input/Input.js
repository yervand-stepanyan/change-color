import React from "react";
import "./input.css";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "",
      inputType: this.props.inputType,
      placeholder: "#FFFFFF",
      inputValue: "",
      isSingleSymbol: false,
      borderStatus: "default",
    };
  }

  isHexadecimal = (str) => {
    const regexp = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;

    return regexp.test(str);
  };

  onInputChange = (event) => {
    const {inputType, color} = this.state;
    const colorData = {inputType, color};

    this.checkInputValue(event.target);

    console.log(inputType);
    console.log(color);
    console.log(JSON.stringify(color));

    if (inputType && color) {
      this.sendColorData(colorData);
    }
  };

  checkInputValue = (inputField) => {
    console.log("**************************");
    let inputValue = inputField.value;

    if (inputValue.length === 1 && inputValue[0] !== "#") {
      this.setState({inputValue: "#" + inputValue, isSingleSymbol: true});
    } else {
      if (inputValue.length === 1 && inputValue[0] === "#") {
        this.setState({inputValue});

        if (this.state.isSingleSymbol) {
          if (inputValue !== "") {
            this.setState({inputValue: ""});
            inputValue = "";
          }
        }

        this.setState({isSingleSymbol: false});
      } else {
        if (inputValue !== "") {
          this.setState({inputValue, isSingleSymbol: true});
        }
        this.setState({inputValue});
      }
    }

    const valueToCheck = inputValue.length > 1 ? inputValue.substr(1) : inputValue;

    if (this.isHexadecimal(valueToCheck)) {
      console.log("+++++++++++++++++++++++");
      console.log("inputValue : ", inputValue);
      this.setState({borderStatus: "valid", color: inputValue});
    } else {
      this.setState({borderStatus: valueToCheck !== "" ? "invalid" : "default", color: ""});
    }

  };

  sendColorData = (colorData) => {
    this.props.colorData(colorData);
  };

  render() {
    const {placeholder, inputValue, borderStatus} = this.state;

    return (
      <div className="input">
        <input
          value={inputValue}
          className={borderStatus === "default" ? "setDefault" :
            borderStatus === "valid" ? "setValid" : "setInvalid"}
          onChange={this.onInputChange}
          placeholder={placeholder}
          maxLength="7"/>
      </div>
    );
  }
}
