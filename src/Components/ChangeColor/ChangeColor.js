import React from 'react';
import './changeColor.css';
import Text from '../Text/Text';
import Input from '../Input/Input';

export default class ChangeColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colorInput: "textColor",
      backgroundInput: "backgroundColor",
      colorLabel: "Color :",
      backgroundColorLabel: "Background color :",
    }
  }

  render() {
    const {colorInput, backgroundInput, colorLabel, backgroundColorLabel} = this.state;

    return (
      <div className="main">
        <div className="content">
          <div className="text">
            <Text/>
          </div>
          <div className="inputs">
            <div className="colorDiv">
              <label htmlFor={colorInput}>{colorLabel}</label>
              <Input id={colorInput} inputType={colorInput}/>
            </div>
            <div className="backgroundColorDiv">
              <label htmlFor={backgroundInput}>{backgroundColorLabel}</label>
              <Input id={backgroundInput} inputType={backgroundInput}/>
            </div>
          </div>
        </div>

      </div>
    )
  }

}