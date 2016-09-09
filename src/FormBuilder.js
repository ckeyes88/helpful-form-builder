import React from 'react';
import { includes, pull, isEmpty } from 'lodash';
import { FormGroup, ButtonToolbar, Button } from 'react-bootstrap';

import MultiSelectInput from './InputComponents/MultiSelectInput';
import CheckBoxInput from './InputComponents/CheckBoxInput';
import RadioButtonInput from './InputComponents/RadioButtonInput';
import SelectInput from './InputComponents/SelectInput';
import TextInput from './InputComponents/TextInput';
import TextAreaInput from './InputComponents/TextAreaInput';

const FORM_TYPES = {
  TEXT_AREA: "TEXT_AREA",
  TEXT_FIELD: "TEXT_FIELD",
  CHECKBOX: "CHECKBOX",
  RADIO: "RADIO",
  SELECT: "SELECT",
  MULTI: "MULTI"
};

export default class FormBuilder extends React.Component {

    componentWillMount() {
      let newState = {...this.props.editAttributes};

      this.setState({item: newState});
    }

    componentWillReceiveProps(newProps) {
      let newState = {...newProps.editAttributes};

      this.setState({item: newState});
    }
/***************************FORM GENERATORS*****************************/
    generateForm(formData = this.state.item, parent = '') {
      let formItems = [];
      let attributes = formData;
      let selectorOptions = this.props.selectorOptions;
      for(let key in attributes) {
        let currentVal = attributes[key];
         if(!(currentVal instanceof Array) && typeof(currentVal) == 'object') {
           if(!isEmpty(currentVal)) {
             const parentName = parent + key + "*";
             formItems.push(<h4 key={key}>{key}</h4>)
             formItems = formItems.concat(this.generateForm(currentVal, parentName));
           }
         } else if(selectorOptions.hasOwnProperty(key)) {
          let options = selectorOptions[key]
          if(options.length <= 4) {
            if( currentVal instanceof Array ) {
              formItems.push(this.generateInputField(FORM_TYPES.CHECKBOX, parent, key, currentVal, options));
            } else {
              formItems.push(this.generateInputField(FORM_TYPES.RADIO, parent, key, currentVal, options));
            }
          } else {
            if( currentVal instanceof Array ) {
              formItems.push(this.generateInputField(FORM_TYPES.MULTI, parent, key, currentVal, options));
            } else {
              formItems.push(this.generateInputField(FORM_TYPES.SELECT, parent, key, currentVal, options));
            }
          }
        } else {
          if( typeof(currentVal) == 'string' && (/\r|\n/.exec(currentVal) || currentVal.length > 50 )) {
            formItems.push(this.generateInputField(FORM_TYPES.TEXT_AREA, parent, key, currentVal, null));
          } else {
            formItems.push(this.generateInputField(FORM_TYPES.TEXT_FIELD, parent, key, currentVal, null));
          }
        }
      }

      return formItems;
    }

    generateInputField(inputType, parentString, inputLabel, inputValues, inputOptions) {
      let inputComponent = null;
      switch (inputType) {
        case FORM_TYPES.TEXT_AREA:
          inputComponent = <TextAreaInput
            id={parentString + inputLabel}
            key={parentString + inputLabel}
            value={inputValues}
            label={inputLabel}
            onChange={this.textAreaChangeHandler.bind(this)}/>
          break;
        case FORM_TYPES.TEXT_FIELD:
          inputComponent = <TextInput
            id={parentString + inputLabel}
            key={parentString + inputLabel}
            value={inputValues}
            label={inputLabel}
            onChange={this.textFieldChangeHandler.bind(this)}/>
          break;
        case FORM_TYPES.CHECKBOX:
          inputComponent = <CheckBoxInput
            id={parentString + inputLabel}
            key={parentString + inputLabel}
            selected={inputValues}
            options={inputOptions}
            label={inputLabel}
            onChange={this.checkboxChangeHandler.bind(this)}/>
          break;
        case FORM_TYPES.RADIO:
          inputComponent = <RadioButtonInput
            id={parentString + inputLabel}
            key={parentString + inputLabel}
            selected={inputValues}
            options={inputOptions}
            label={inputLabel}
            onChange={this.radioChangeHandler.bind(this)}/>
          break;
        case FORM_TYPES.SELECT:
          inputComponent = <SelectInput
            id={parentString + inputLabel}
            key={parentString + inputLabel}
            selected={inputValues}
            options={inputOptions}
            label={inputLabel}
            onChange={this.selectChangeHandler.bind(this)}/>
            break;
        case FORM_TYPES.MULTI:
          inputComponent = <MultiSelectInput
            id={parentString + inputLabel}
            key={parentString + inputLabel}
            selected={inputValues}
            options={inputOptions}
            label={inputLabel}
            onChange={this.multiSelectChangeHandler.bind(this)}/>
          break;
        default:
      }
      return inputComponent;
    }

/***************************CHANGE HANDLERS*****************************/
    textAreaChangeHandler(ev) {
      const keys = ev.target.id.split('*');
      let newState = {...this.state.item};
      newState = this.generateNewState(newState, ev.target.id, ev.target.value);
      this.setState({item: newState});
    }

    textFieldChangeHandler(ev) {
      let keys = ev.target.id.split("*");
      let newState = {...this.state.item};
      newState = this.generateNewState(newState, ev.target.id, ev.target.value);
      this.setState({item: newState});
    }

    selectChangeHandler(ev) {
      const keys = ev.target.id.split("*");
      let selectedIndex = ev.target.options.selectedIndex;
      let newState = {...this.state.item};
      newState = this.generateNewState(newState, ev.target.id, ev.target.options[selectedIndex].value);
      this.setState({item: newState});
    }

    multiSelectChangeHandler(ev) {
      const keys = ev.target.id.split("*");
      let selectedOptions = [];
      let options = ev.target.options;
      let newState = {...this.state.item};
      for(let i = 0; i < options.length; i++) {
        if(options[i].selected) {
          if(Number(options[i].value)) {
            selectedOptions.push(Number(options[i].value));
          } else {
            selectedOptions.push(options[i].value);
          }
        }
      }
      this.generateNewState(newState, ev.target.id, selectedOptions);
      this.setState({item: newState});
    }

    radioChangeHandler(ev) {
      let newState = {...this.state.item};
      let newData = (ev.target.id).split("-");
      newState = this.generateNewState(newState, ev.target.id, newData[1])
      this.setState({item: newState});
    }

    checkboxChangeHandler(ev) {
      let newState = {...this.state.item};
      let newData = (ev.target.id).split("-");

      let selectedValues = newData[0].split("*").reduce((prev, cur) => {
        return prev[cur];
      }, newState);
      if(Number(newData[1])) {
        if(includes(selectedValues, Number(newData[1]))) {
          pull(selectedValues, Number(newData[1]));
        } else {
          selectedValues.push(Number(newData[1]));
        }
      } else {
        if(includes(selectedValues, newData[1])) {
          pull(selectedValues, newData[1])
        } else {
          selectedValues.push(newData[1]);
        }
      }

      newState = this.generateNewState(newState, ev.target.id, selectedValues);
      this.setState({item: newState});
    }

/***************************HELPER FUNCTIONS****************************/

    generateNewState(currentState, eventID, newValue) {
      const keysArr = eventID.split("-")[0].split("*");
      keysArr.reduce((prev, cur) => {
        return !(prev[cur] instanceof Array) && typeof(prev[cur]) === 'object' ?
          prev[cur] : prev[cur] = newValue;
      }, currentState);
      return currentState;
    }

/***************************BUTTON HANDLERS*****************************/

    onResetPressed() {
      this.setState({item: this.props.editAttributes});
    }

    onSavePressed() {
      this.props.onSavePressed(this.state.item);
    }

/***************************RENDER FUNCTION*****************************/
    render() {
      return(
        <form>
          {this.generateForm()}
          <ButtonToolbar>
            <Button
              bsStyle="danger"
              bsSize="xs"
              onClick={this.props.onDeletePressed}>Delete</Button>
            <Button
              bsStyle="info"
              bsSize="xs" onClick={this.onResetPressed.bind(this)}>Reset</Button>
            <Button
              bsStyle="success"
              bsSize="xs"
              onClick={this.props.onSavePressed.bind(null, this.state.item)}>Save</Button>
          </ButtonToolbar>
        </form>
      )
    }
}

FormBuilder.propTypes = {
  editAttributes: React.PropTypes.object.isRequired,
  selectorOptions: React.PropTypes.object.isRequired,
  onDeletePressed: React.PropTypes.func.isRequired,
  onSavePressed: React.PropTypes.func.isRequired,
};
