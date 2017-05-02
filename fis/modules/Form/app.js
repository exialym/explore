import React, { Component, PropTypes, cloneElement } from 'react';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.state = {
      inputValue: '',
      textareaValue: '',
      radioValue: '',
    };
  }


  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }
  handleTextareaChange(e) {
    this.setState({
      textareaValue: e.target.value,
    });
  }
  handleRadioChange(e) {
    this.setState({
      radioValue: e.target.value,
    });
  }


  render() {
    const { inputValue, textareaValue, radioValue } = this.state;
    return (
      <div>
        <p>
          <input type="text" value={inputValue} onChange={this.handleInputChange} />
          <span>{inputValue}</span>
        </p>
        <p>
          <textarea value={textareaValue} onChange={this.handleTextareaChange} />
          <span>{textareaValue}</span>
        </p>
        <div>
          <p>gender:<span>{radioValue}</span></p>
          <label>male:
            <input type="radio" value="male" checked={radioValue === 'male'} onChange={this.handleRadioChange}/>
          </label>
          <label>female:
            <input type="radio" value="female" checked={radioValue === 'female'} onChange={this.handleRadioChange}/>
          </label>
        </div>
      </div>
    );
  }
}

export default Forms;
