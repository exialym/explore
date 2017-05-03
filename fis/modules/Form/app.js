import React, { Component, PropTypes, cloneElement } from 'react';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      textareaValue: '',
      radioValue: '',
      coffee:[],
      area:[],
    };
  }


  handleChange(name,e) {
    switch (name) {
      case 'name':
        this.setState({
          inputValue: e.target.value.toUpperCase(),
        });
        break;
      case 'info':
        this.setState({
          textareaValue: e.target.value,
        });
        break;
      case 'gender':
        this.setState({
          radioValue: e.target.value,
        });
        break;
      case 'coffee':
        const { checked, value } = e.target;
        let { coffee } = this.state;
        if (checked && coffee.indexOf(value) === -1) {
          coffee.push(value);
        } else {
          coffee = coffee.filter(i => i !== value);
        }
        this.setState({
          coffee,
        });
        break;
      case 'area':
        const { options } = e.target;
        const area = Object.keys(options)
          .filter(i => options[i].selected === true)
          .map(i => options[i].value);
        this.setState({
          area,
        });
    }

  }



  render() {
    const { inputValue, textareaValue, radioValue, coffee ,area} = this.state;
    const style = {
      color: 'red',
      WebkitTransition: 'all',   // -webkit-transition
      msTransition: 'all',
      width:100,  //大小有关的样式会自动添加px
    };
    return (
      <div>
        <p>
          name:
          <input type="text" style={style} value={inputValue} onChange={this.handleChange.bind(this,'name')} />
          <span>{inputValue}</span>
        </p>
        <p>
          info:
          <textarea value={textareaValue} onChange={this.handleChange.bind(this,'info')} />
          <span>{textareaValue}</span>
        </p>
        <div>
          <p>gender:<span>{radioValue}</span></p>
          <label>male:
            <input type="radio" value="male" checked={radioValue === 'male'} onChange={this.handleChange.bind(this,'gender')}/>
          </label>
          <label>female:
            <input type="radio" value="female" checked={radioValue === 'female'} onChange={this.handleChange.bind(this,'gender')}/>
          </label>
        </div>
        <div>
          <p>coffee:<span>{coffee}</span></p>
          <label>
            <input type="checkbox" value="Cappuccino" checked={coffee.indexOf('Cappuccino') !== -1} onChange={this.handleChange.bind(this,'coffee')} />
            Cappuccino
          </label>
          <br/>
          <label>
            <input type="checkbox" value="CafeMocha" checked={coffee.indexOf('CafeMocha') !== -1} onChange={this.handleChange.bind(this,'coffee')} />
            CafeMocha
          </label>
          <br/>
          <label>
            <input type="checkbox" value="CaffeLatte" checked={coffee.indexOf('CaffeLatte') !== -1} onChange={this.handleChange.bind(this,'coffee')} />
            Caffè Latte
          </label>
          <br/>
          <label>
            <input type="checkbox" value="Machiatto" checked={coffee.indexOf('Machiatto') !== -1} onChange={this.handleChange.bind(this,'coffee')} />
            Machiatto
          </label>
        </div>
        <div>
          <span>{area}</span>
          <select multiple={true} value={area} onChange={this.handleChange.bind(this,'area')}>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="hangzhou">杭州</option>
          </select>

        </div>
      </div>
    );
  }
}

export default Forms;
