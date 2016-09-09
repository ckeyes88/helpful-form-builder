import React from 'react';
import { includes } from 'lodash';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class MultiSelectInput extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.setState({
      value: this.props.value
    });
  }

  renderOptions() {
    let options = [];
    this.props.options.map((tag, i) => {
      options.push(<option
        key={i}
        value={tag}>{tag}</option>)
    });
    return options;
  }

  render() {
    let validationState = this.props.getValidationState ? this.props.getValidationState(this.state.value) : {};
    return (
      <FormGroup
        controlId={this.props.id}
        validationState={validationState.state}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          multiple
          componentClass="select"
          onChange={this.props.onChange}
          value={this.props.selected}>
          {this.renderOptions()}
        </FormControl>
        <HelpBlock>{validationState.message}</HelpBlock>
      </FormGroup>
    );
  }
}

MultiSelectInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  selected: React.PropTypes.array.isRequired,
  options: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
  getValidationState: React.PropTypes.func,
  isDisabled: React.PropTypes.func,
  onChange: React.PropTypes.func.isRequired
}
