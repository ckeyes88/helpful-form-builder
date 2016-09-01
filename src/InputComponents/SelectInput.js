import React from 'react';
import { includes } from 'lodash';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.setState({
      value: this.props.value
    });
  }

  renderOptions() {

    return this.props.options.map((tag, i) => {
      return (<option
        key={i}
        value={tag}>{tag}</option>);
    });

  }

  setSelectedOptions(eventID, eventOptions) {
    let options = eventOptions;
    let selected = [];
    for(let i = 0; i < options.length; i++) {
      if(options[i].selected) {
        selected.push(options[i].value);
      }
    }
    return selected;
  }

  render() {
    let validationState = this.props.getValidationState ? this.props.getValidationState(this.state.value) : {};
    return (
      <FormGroup
        controlId={this.props.label}
        validationState={validationState.state}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          value={this.props.selected}
          componentClass="select"
          onChange={this.props.onChange}>
          {this.renderOptions()}
        </FormControl>
        <HelpBlock>{validationState.message}</HelpBlock>
      </FormGroup>
    );
  }
}

SelectInput.propTypes = {
  selected: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  options: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
  getValidationState: React.PropTypes.func,
  isDisabled: React.PropTypes.func,
  onChange: React.PropTypes.func.isRequired
}
