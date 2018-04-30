import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class EditableField extends PureComponent {
  render () {
    return (
      <React.Fragment>
        {
          this.props.edit === true ?
            <TextField errorText={this.props.errorText} hintText={this.props.label} onChange={this.props.onTextChange} value={this.props.value}/> :
            <span>{this.props.value}</span>
        }
      </React.Fragment>
    );
  }
}

EditableField.propTypes = {
  value: PropTypes.string,
  edit: PropTypes.bool,
  label: PropTypes.string,
  onTextChange: PropTypes.func,
  errorText: PropTypes.string
};

export default EditableField;