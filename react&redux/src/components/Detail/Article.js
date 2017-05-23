/**
 * Created by exialym on 2017/5/22 0022.
 */

import React, { PropTypes, Component } from 'react';
import { createForm } from 'redux-form-utils';
import Frames from "../../layouts/Frame";
class Article extends Component {
  static PropTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.object,
    loadPage: PropTypes.func,
  };
  componentDidMount() {
    this.props.loadPage(this.props.id);
  }
  render() {
    const { loading, error, page } = this.props;
    if (error) {
      return <p className="message">Oops, something is wrong.</p>;
    }
    if (loading) {
      return <p className="message">Loading...</p>;
    }
    return (
      <div>
        <h1>{page.title}</h1>
        <p>{page.detail}</p>
        <Form/>
      </div>
    );
  }
}
export default Article;

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.state = {
      name: '',
      address: '',
      gender: '',
    };
  }
  handleChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }
  handleChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }
  render() {
    const { name, address, gender } = this.state;
    return (
      <form className="form"><input name="name" value={name} onChange={this.handleChangeName} />
        <input name="address" value={address} onChange={this.handleChangeAddress} />
        <select name="gender" value={gender} onChange={this.handleChangeGender}>
          <option value="male" />
          <option value="female" />
        </select>
      </form>
    );
  }
}
