import React, {PureComponent} from 'react';
import Button from 'material-ui/RaisedButton';
import validator from 'validator';
import {uniqueId, find, remove} from 'lodash';

import logo from '../logo.svg';
import '../App.css';
import Grid from './Grid';

class Main extends PureComponent {
  constructor() {
    super();

    this.state = {
      items: [],
      editId: null,
      newEmailTextError: '',
      newNameTextError: ''
    };
  }

  _createObject = (name = '', email = '', edit = true) => {
    return {
      _id: uniqueId(),
      name: name,
      email: email,
      edit: edit
    };
  };

  _addNewHandler = () => {
    const filtered = find(this.state.items, item => item._id === this.state.editId);

    if (filtered) {
      return false;
    }
    let newObject = this._createObject();

    this.setState({
      items: [newObject, ...this.state.items],
      editId: newObject._id
    });
  };

  _editTextField = (field, value) => {
    let items = this.state.items.slice(0);
    items.forEach((item, index) => {
      if (item._id === this.state.editId) {
        switch (field) {
          case 'email':
            items[index].email = value;
            break;
          case 'name':
            items[index].name = value;
            break;
          default:
            return false;
        }
      }
    });

    this.setState({items});
  };

  _validate = (name, email) => {
    let valid = true;
    this.setState({
      newNameTextError: '',
      newEmailTextError: ''
    });

    if (!name) {
      this.setState({
        newNameTextError: 'Name should be not blank!'
      });

      valid = false;
    }

    if (!validator.isEmail(email)) {
      this.setState({
        newEmailTextError: 'Please, provide valid Email!'
      });

      valid = false;
    }

    if (!email) {
      this.setState({
        newEmailTextError: 'Email should be not blank!'
      });

      valid = false;
    }

    return valid;
  };

  _saveItemHandler = () => {
    let filtered = find(this.state.items, (item) => item._id === this.state.editId);
    if (this._validate(filtered.name, filtered.email)) {
      let items = this.state.items.slice(0);
      items.forEach((item, index) => {
        if (item._id === this.state.editId) {
          items[index].edit = false;
        }
      });

      this.setState({
        items,
        editId: null
      });
    }
  };

  _editButtonHandler = (e) => {
    const id = e.currentTarget.getAttribute('data-id');
    let items = this.state.items.slice(0);
    let editId = null;

    items.forEach((item, index) => {
      if (item._id === id) {
        items[index].edit = true;
        editId = item._id;
      } else {
        if (!this._validate(item.name, item.email)) {
          items.splice(index, 1);
        }
        items[index].edit = false;
      }
    });

    this.setState({
      items,
      editId,
      newNameTextError: '',
      newEmailTextError: ''
    });
  };

  _deleteButtonHandler = (e) => {
    if (!window.confirm('Are you sure?')) {
      return false;
    }

    let items = this.state.items.slice(0);

    remove(items, {
      _id: e.currentTarget.getAttribute('data-id')
    });

    this.setState({
      items: items,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Productive Mobile</h1>
        </header>

        <div className="padding-top-15px align-left">
          <Button primary={true} className="margin-15px" onClick={this._addNewHandler}>Add new</Button>

          <Grid
            items={this.state.items}
            saveItemHandler={this._saveItemHandler}
            newEmailTextError={this.state.newEmailTextError}
            newNameTextError={this.state.newNameTextError}
            editTextFieldHandler={this._editTextField}
            editButtonHandler={this._editButtonHandler}
            deleteButtonHandler={this._deleteButtonHandler}
          />
        </div>
      </div>
    )
  }
}

export default Main;