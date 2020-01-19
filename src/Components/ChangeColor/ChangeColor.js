import React from 'react';
import './changeColor.css';
import Text from '../Text/Text';
import Input from '../Input/Input';

export default class ChangeColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '',
      backgroundColor: ''
    };
  }

  static VARIABLES = {
    textColorInput: 'color',
    backgroundColorInput: 'backgroundColor',
    colorLabel: 'Color :',
    backgroundColorLabel: 'Background color :'
  };

  setColorValues = colorData => {
    this.setState({ [colorData.inputType]: colorData.color });
  };

  render() {
    const { color, backgroundColor } = this.state;

    const styles = { color, backgroundColor };

    return (
      <div className="main">
        <div className="content">
          <div className="text">
            <Text styles={styles} />
          </div>
          <div className="inputs">
            <div className="colorDiv">
              <label htmlFor={ChangeColor.VARIABLES.textColorInput}>
                {ChangeColor.VARIABLES.colorLabel}
              </label>
              <Input
                id={ChangeColor.VARIABLES.textColorInput}
                inputType={ChangeColor.VARIABLES.textColorInput}
                passColorData={this.setColorValues}
              />
            </div>
            <div className="backgroundColorDiv">
              <label htmlFor={ChangeColor.VARIABLES.backgroundColorInput}>
                {ChangeColor.VARIABLES.backgroundColorLabel}
              </label>
              <Input
                id={ChangeColor.VARIABLES.backgroundColorInput}
                inputType={ChangeColor.VARIABLES.backgroundColorInput}
                passColorData={this.setColorValues}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
