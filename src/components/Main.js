import React, {PureComponent} from 'react';
import Button from 'material-ui/RaisedButton';
import validator from 'validator';

import logo from '../logo.svg';
import '../App.css';
import Grid from './Grid';

class Main extends PureComponent {
  constructor() {
    super();

    let state = window.localStorage.getItem('_state');

    this.state = state ? JSON.parse(state) : {
      items: [],
      editKey: 0,
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

  _setState = (newState) => {
    this.setState(newState, () => {
      window.localStorage.setItem('_state', JSON.stringify(this.state));
    });
  };

  _addNewHandler = () => {
    const {items} = this.state;
    const filtered = items.filter(item => item.edit === true);

    if (filtered.length === 1) {
      return false;
    }

    this._setState({
      items: [this._createObject(), ...this.state.items]
    });
  };

  _editTextField = (field, value) => {
    let items = this.state.items.slice(0);
    switch (field) {
      case 'email':
        items[this.state.editKey].email = value;
        this._setState({items: items});
        break;
      case 'name':
        items[this.state.editKey].name = value;
        this._setState({items: items});
        break;
      default:
        return false;
    }
  };

  _validateNewItem = () => {
    let valid = true;
    this._setState({
      newNameTextError: '',
      newEmailTextError: ''
    });

    if (!this.state.items[this.state.editKey].name) {
      this._setState({
        newNameTextError: 'Name should be not blank!'
      });

      valid = false;
    }

    if (!validator.isEmail(this.state.items[this.state.editKey].email)) {
      this._setState({
        newEmailTextError: 'Please, provide valid Email!'
      });

      valid = false;
    }

    if (!this.state.items[this.state.editKey].email) {
      this._setState({
        newEmailTextError: 'Email should be not blank!'
      });

      valid = false;
    }

    return valid;
  };

  _saveItemHandler = () => {
    if (this._validateNewItem()) {
      let items = this.state.items.slice(0);
      items[this.state.editKey].edit = false;

      this._setState({
        items: items
      });
    }
  };

  _editButtonHandler = (e) => {
    const key = e.currentTarget.getAttribute('data-key');
    let items = this.state.items.slice(0);
    items[key].edit = true;

    this._setState({
      items: items,
      editKey: key
    });
  };

  _deleteButtonHandler = (e) => {
    if (!window.confirm('Are you sure?')) {
      return false;
    }

    const key = e.currentTarget.getAttribute('data-key');
    let items = this.state.items.slice(0);
    items.splice(key, 1);

    this._setState({
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