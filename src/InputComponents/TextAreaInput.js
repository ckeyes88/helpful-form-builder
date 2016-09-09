import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class TextAreaInput extends React.Component {

  render() {
    let validationState = this.props.getValidationState ? this.props.getValidationState(this.state.value) : {};
    return (
      <FormGroup
        controlId={this.props.id}
        validationState={validationState.state}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          componentClass="textarea"
          value={this.props.value}
          onChange={this.props.onChange}/>
        <FormControl.Feedback />
        <HelpBlock>{validationState.message}</HelpBlock>
      </FormGroup>
    );
  }
}

TextAreaInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  label: React.PropTypes.string.isRequired,
  getValidationState: React.PropTypes.func,
  isDisabled: React.PropTypes.func,
  onChange: React.PropTypes.func.isRequired
}
