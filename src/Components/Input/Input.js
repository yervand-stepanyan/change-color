import React from "react";
import "./input.css";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: JSON.parse(localStorage.getItem("color")) || "",
      inputType: this.props.inputType || JSON.parse(localStorage.getItem("inputType")),
      placeholder: "#FFFFFF",
      inputValue: "",
      isSingleSymbol: false,
      borderStatus: "default",
    };

    setTimeout(() => {
      this.dataAfterRefresh();
    });
  }

  dataAfterRefresh = () => {
    const {color, inputType} = this.state;
    if (JSON.parse(localStorage.getItem("color"))) {
      // if (this.state.inputType) {
      console.log(color);
      console.log(inputType);
      // }

      this.checkInputValue(color, inputType);
    }
  };

  isHexadecimal = (str) => {
    const regexp = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;

    return regexp.test(str);
  };

  onInputChange = (event) => {
    this.checkInputValue(event.target.value, this.state.inputType);

    localStorage.setItem("inputType", JSON.stringify(this.state.inputType));
  };

  checkInputValue = (inputVal, inputType) => {
    let inputValue = inputVal;

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
      this.setState({borderStatus: "valid", color: inputValue}, () => {
        const {color} = this.state;
        const colorData = {inputType, color};

        this.sendColorData(colorData);

        localStorage.setItem("color", JSON.stringify(color));
      });
    } else {
      this.setState({borderStatus: valueToCheck !== "" ? "invalid" : "default", color: ""});
    }
  };

  sendColorData = (colorData) => {
    this.props.passColorData(colorData);
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
