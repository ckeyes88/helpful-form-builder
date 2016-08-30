import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class TextInput extends React.Component {

  render() {
    let validationState = this.props.getValidationState ? this.props.getValidationState(this.props.value) : {};
    return (
      <FormGroup
        controlId={this.props.label}
        validationState={validationState.state} >
        <ControlLabel >{this.props.label}</ControlLabel>
        <FormControl
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}/>
        <FormControl.Feedback />
        <HelpBlock>{validationState.message}</HelpBlock>
      </FormGroup>
    );
  }
}

TextInput.propTypes = {
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]).isRequired,
  label: React.PropTypes.string.isRequired,
  getValidationState: React.PropTypes.func,
  isDisabled: React.PropTypes.func,
  onChange: React.PropTypes.func.isRequired
}
