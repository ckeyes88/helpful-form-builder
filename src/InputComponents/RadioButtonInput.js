import React from 'react';
import { includes } from 'lodash';
import { FormGroup, ControlLabel, Radio, HelpBlock } from 'react-bootstrap';

export default class RadioButtonInput extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.setState({
      value: this.props.value
    });
  }

  renderButtons(optionsArray) {
    let optionComponents = optionsArray.map((currentOption, i) => {
      let selectedState = includes(this.props.selected, currentOption);
      return(
        <Radio key={i} id={this.props.label + "-" + currentOption} checked={selectedState} onChange={this.props.onChange}>{currentOption}</Radio>
      )
    });
    return optionComponents
  }

  render() {
    let validationState = this.props.getValidationState ? this.props.getValidationState(this.state.value) : {};
    return (
      <FormGroup validationState={validationState.state}>
        <ControlLabel>{this.props.label}</ControlLabel>
          {this.renderButtons(this.props.options)}
        <HelpBlock>{validationState.message}</HelpBlock>
      </FormGroup>
    );
  }
}

RadioButtonInput.propTypes = {
  selected: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  options: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
  getValidationState: React.PropTypes.func,
  isDisabled: React.PropTypes.func,
  onChange: React.PropTypes.func.isRequired
}
