import React from 'react';
import './input.css';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: JSON.parse(localStorage.getItem(this.props.inputType)) || '',
      inputType: this.props.inputType,
      placeholder: '#FFFFFF',
      inputValue: '',
      isSingleSymbol: false,
      borderStatus: 'default'
    };

    setTimeout(() => {
      this.dataAfterRefresh();
    });
  }

  dataAfterRefresh = () => {
    const { color, inputType } = this.state;
    if (JSON.parse(localStorage.getItem(inputType))) {
      this.checkInputValue(color, inputType);
    }
  };

  isHexadecimal = str => {
    const regexp = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;

    return regexp.test(str);
  };

  onInputChange = event => {
    this.checkInputValue(event.target.value, this.state.inputType);
  };

  checkInputValue = (inputVal, inputType) => {
    let inputValue = inputVal;

    if (inputValue.length === 1 && inputValue[0] !== '#') {
      this.setState({ inputValue: '#' + inputValue, isSingleSymbol: true });
    } else if (inputValue.length > 1 && inputValue[0] !== '#') {
      inputValue = '#' + inputValue.slice(0, 6);

      this.setState({ inputValue });
    } else {
      if (inputValue.length === 1 && inputValue[0] === '#') {
        this.setState({ inputValue });

        if (this.state.isSingleSymbol) {
          if (inputValue !== '') {
            this.setState({ inputValue: '' });

            inputValue = '';

            const colorData = { inputType, color: this.state.color };
            this.sendColorDetails(colorData);

            localStorage.removeItem(inputType);
          }
        }

        this.setState({ isSingleSymbol: false });
      } else {
        if (inputValue !== '') {
          this.setState({ inputValue, isSingleSymbol: true });
        } else {
          this.setState({ inputValue });

          const colorData = { inputType, color: inputValue };
          this.sendColorDetails(colorData);

          localStorage.removeItem(inputType);
        }
      }
    }

    const valueToCheck =
      inputValue.length > 1 ? inputValue.substr(1) : inputValue;

    if (this.isHexadecimal(valueToCheck)) {
      this.setState({ borderStatus: 'valid', color: inputValue }, () => {
        const { color } = this.state;
        const colorData = { inputType, color };

        this.sendColorDetails(colorData);

        localStorage.setItem(inputType, JSON.stringify(color));
      });
    } else {
      this.setState(
        {
          borderStatus: valueToCheck !== '' ? 'invalid' : 'default',
          color: ''
        },
        () => {
          const colorData = { inputType, color: this.state.color };
          const inpValue =
            inputValue.length === 1 ? '#' + inputValue : inputValue;

          this.sendColorDetails(colorData);

          if (inpValue === '') {
            localStorage.removeItem(inputType);
          } else {
            localStorage.setItem(inputType, JSON.stringify(inpValue));
          }
        }
      );
    }
  };

  sendColorDetails = colorData => {
    this.props.passColorData(colorData);
  };

  render() {
    const { placeholder, inputValue, borderStatus } = this.state;

    return (
      <div className="input">
        <input
          value={inputValue}
          className={
            borderStatus === 'default'
              ? 'setDefault'
              : borderStatus === 'valid'
              ? 'setValid'
              : 'setInvalid'
          }
          onChange={this.onInputChange}
          placeholder={placeholder}
          maxLength="7"
        />
      </div>
    );
  }
}
