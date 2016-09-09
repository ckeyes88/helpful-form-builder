import React from 'react';
import { includes } from 'lodash';
import { FormGroup, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';

export default class CheckBoxInput extends React.Component {

  renderBoxes(optionsArray) {
    let optionComponents = optionsArray.map((currentOption, i) => {
      let selectedState = includes(this.props.selected, currentOption);
      return(
        <Checkbox key={i} id={this.props.id + "-" + currentOption} checked={selectedState} onChange={this.props.onChange}>{currentOption}</Checkbox>
      )
    });
    return optionComponents
  }

  render() {
    let validationState = this.props.getValidationState ? this.props.getValidationState(this.props.value) : {};
    return (
      <FormGroup validationState={validationState.state}>
        <ControlLabel>{this.props.label}</ControlLabel>
          {this.renderBoxes(this.props.options)}
        <HelpBlock>{validationState.message}</HelpBlock>
      </FormGroup>
    );
  }
}

CheckBoxInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  selected: React.PropTypes.array.isRequired,
  options: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
  getValidationState: React.PropTypes.func,
  isDisabled: React.PropTypes.func,
  onChange: React.PropTypes.func.isRequired
}
