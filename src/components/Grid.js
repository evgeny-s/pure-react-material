import React, {PureComponent} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Button from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import EditableField from './EditableField';

class Grid extends PureComponent {
  render() {
    return (
      <Table selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn/>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            this.props.items.map((item, index) => (
              <TableRow key={item._id}>
                <TableRowColumn>
                  <EditableField
                    value={item.name}
                    edit={item.edit}
                    label="Name"
                    errorText={this.props.newNameTextError}
                    onTextChange={(object, value) => {
                      this.props.editTextFieldHandler('name', value)
                    }}
                  /></TableRowColumn>
                <TableRowColumn>
                  <EditableField
                    value={item.email}
                    edit={item.edit}
                    label="Email"
                    errorText={this.props.newEmailTextError}
                    onTextChange={(object, value) => {
                      this.props.editTextFieldHandler('email', value)
                    }}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  {
                    item.edit ?
                      <Button onClick={this.props.saveItemHandler}>Save</Button> :
                      <div>
                        <Button primary={true} data-id={item._id} onClick={this.props.editButtonHandler}>Edit</Button>
                        <Button secondary={true} data-id={item._id} onClick={this.props.deleteButtonHandler}>Delete</Button>
                      </div>
                  }
                </TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    );
  }
}

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    edit: PropTypes.bool,
  })),
  saveItemHandler: PropTypes.func,
  editButtonHandler: PropTypes.func,
  deleteButtonHandler: PropTypes.func,
  editTextFieldHandler: PropTypes.func,
  newEmailTextError: PropTypes.string,
  newNameTextError: PropTypes.string
};

export default Grid;