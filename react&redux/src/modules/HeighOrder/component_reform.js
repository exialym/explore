import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';



class ComponentReform extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}
class SelectInput extends Component {
  static displayName = 'SelectInput';
    render() {
      const { selectedItem, isActive, onClickHeader, placeholder } = this.props;
      const { text } = selectedItem;
      return (
        <div>
          <div onClick={onClickHeader}>
            <input type="text" disabled value={text} placeholder={placeholder}/>
            <icon className={isActive} name="angle-down" />
          </div>
        </div>
      );
    }
  }

const searchDecorator = WrappedComponent => {
  class SearchDecorator extends Component {
    constructor(props) {
      super(props);
      this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(keyword) {
      this.setState({
        data: this.props.data,
        keyword,
      });
      this.props.onSearch(keyword);
    }
    render() {
      const { data, keyword } = this.state;
      return (
        <WrappedComponent {...this.props} data={data} keyword={keyword} onSearch={this.handleSearch} />
      );
    }
  }
  return SearchDecorator;
}
const asyncSelectDecorator = WrappedComponent => {
  class AsyncSelectDecorator extends Component {
    componentDidMount() {
      const { url, params } = this.props;
      fetch(url, { params }).then(data => {
        this.setState({
          data,
        });
      });
    }
    render() {
      return (
        <WrappedComponent {...this.props} data={this.state.data} />
      );
    }
  }
  return AsyncSelectDecorator;
}
const FinalSelector = compose(asyncSelectDecorator, searchDecorator, selectedItemDecorator)(Selector);
class SearchSelect extends Component {
  render() {
    return (
      <FinalSelector {...this.props}>
        <SelectInput />
        <SearchInput />
        <List />
      </FinalSelector>
    );
  }
}

export default ComponentReform;
