import React from 'react';
import './changeColor.css';
import Text from '../Text/Text';
import Input from '../Input/Input';

export default class ChangeColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textColorInput: "textColor",
      backgroundColorInput: "backgroundColor",
      colorLabel: "Color :",
      backgroundColorLabel: "Background color :",
      colorData: {},
    };
  }

  passColorData = (colorData) => {
    this.setState({colorData: colorData});
  };

  render() {
    const {textColorInput, backgroundColorInput, colorLabel, backgroundColorLabel, colorData} = this.state;

    return (
      <div className="main">
        <div className="content">
          <div className="text">
            <Text sendColorData={colorData}/>
          </div>
          <div className="inputs">
            <div className="colorDiv">
              <label htmlFor={textColorInput}>{colorLabel}</label>
              <Input id={textColorInput} inputType={textColorInput} passColorData={this.passColorData}/>
            </div>
            <div className="backgroundColorDiv">
              <label htmlFor={backgroundColorInput}>{backgroundColorLabel}</label>
              <Input id={backgroundColorInput} inputType={backgroundColorInput} passColorData={this.passColorData}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}