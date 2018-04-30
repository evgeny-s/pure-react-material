import React, {PureComponent} from 'react';
import Button from 'material-ui/RaisedButton';
import validator from 'validator';

import logo from '../logo.svg';
import '../App.css';
import Grid from './Grid';

class Main extends PureComponent {
  constructor() {
    super();

    this.state = {
      items: [],
      editKey: null,
      newEmailTextError: '',
      newNameTextError: ''
    };
  }

  _createObject = (name = '', email = '', edit = true) => {
    return {
      name: name,
      email: email,
      edit: edit
    };
  };

  _addNewHandler = () => {
    const {items} = this.state;
    const filtered = items.filter(item => item.edit === true);

    if (filtered.length === 1) {
      return false;
    }

    this.setState({
      items: [this._createObject(), ...this.state.items],
      editKey: 0
    });
  };

  _editTextField = (field, value) => {
    let items = this.state.items.slice(0);
    switch (field) {
      case 'email':
        items[this.state.editKey].email = value;
        this.setState({items: items});
        break;
      case 'name':
        items[this.state.editKey].name = value;
        this.setState({items: items});
        break;
      default:
        return false;
    }
  };

  _validateNewItem = (name, email) => {
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
    if (this._validateNewItem(this.state.items[this.state.editKey].name, this.state.items[this.state.editKey].email)) {
      let items = this.state.items.slice(0);
      items[this.state.editKey].edit = false;

      this.setState({
        items: items,
        editKey: null
      });
    }
  };

  _editButtonHandler = (e) => {
    const key = e.currentTarget.getAttribute('data-key');
    let items = this.state.items.slice(0);

    items.map((item, key) => items[key].edit = false);
    items[key].edit = true;

    this.setState({
      items: items,
      editKey: key,
      newNameTextError: '',
      newEmailTextError: ''
    });
  };

  _deleteButtonHandler = (e) => {
    if (!window.confirm('Are you sure?')) {
      return false;
    }

    const key = e.currentTarget.getAttribute('data-key');
    let items = this.state.items.slice(0);
    items.splice(key, 1);

    this.setState({
      items: items,
      editKey: key
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