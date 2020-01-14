import React from 'react';
import './changeColor.css';
import Text from '../Text/Text';
import Input from '../Input/Input';

export default class ChangeColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textColorInput: 'color',
      backgroundColorInput: 'backgroundColor',
      colorLabel: 'Color :',
      backgroundColorLabel: 'Background color :',
      color: '',
      backgroundColor: ''
    };
  }

  setColorValues = colorData => {
    this.setState({ [colorData.inputType]: colorData.color });
  };

  render() {
    const {
      textColorInput,
      backgroundColorInput,
      colorLabel,
      backgroundColorLabel,
      color,
      backgroundColor
    } = this.state;

    const styles = { color, backgroundColor };

    return (
      <div className="main">
        <div className="content">
          <div className="text">
            <Text styles={styles} />
          </div>
          <div className="inputs">
            <div className="colorDiv">
              <label htmlFor={textColorInput}>{colorLabel}</label>
              <Input
                id={textColorInput}
                inputType={textColorInput}
                passColorData={this.setColorValues}
              />
            </div>
            <div className="backgroundColorDiv">
              <label htmlFor={backgroundColorInput}>
                {backgroundColorLabel}
              </label>
              <Input
                id={backgroundColorInput}
                inputType={backgroundColorInput}
                passColorData={this.setColorValues}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
