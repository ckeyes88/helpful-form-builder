# Helpful Form Builder
Dynamic react form generator using react-bootstrap

## General
This is a collection of React components (currently using React-Bootstrap...see `Coming Soon...` below) for input fields that can dynamically generate any form
type given a set of current input values and a set of options for each of the selector type inputs.
Since much of form building is basic boilerplate, this library allows you to simply pass in a JSON 
object indicating what the current values for each field are. For fields that have a finite number of 
options, a second JSON object can be passed in with the possible values for that field and it will be
rendered as the respective input field.

## Getting Started

* Add `helpful-form-builder` as a dependency to your project

```shell
npm install --save helpful-form-builder
```

* Require the main `FormBuilder` component wherever you decide to use the form builder

```js
import FormBuilder from 'helpful-form-builder';
```

* Add the `FormBuilder` component in your `render` function of the component passing in a JSON object of
  attributes to put in the form, the JSON object of selector values, a save handler and a delete handler.

```js
export default class CustomComponent extends React.Component {

    ...
    savePressed() {
        //Save your data...
    }

    deletePressed() {
        //Delete the object here...
    }

    render() {

        // This can come from props or wherever the developer generates this data.
        const formValues = {
            FirstName: "Doctor"
            LastName: "Who",
            FavoritePlanet: "Earth"
        };

        const formOptions = {
            FavoritePlanet: ["Earth", "Gallifrey", "Jupiter"]
        };

        return (
            <div>
                <FormBuilder
                    editAttributes={formValues}
                    selectorOptions={formOptions}
                    onSavePressed={this.savePressed.bind(this)}
                    onDeletePressed={this.deletePressed.bind(this)}/>
            </div>
        )
    }
}
```

## Generator Logic

The Form Builder makes some educated guesses about how data should be rendered in a form. It is important to 
understand how these logical decisions made in order to render the desired form.

### Infinite vs. Finite Input Options

The first decision is made when the Form Builder looks at the two objects passed to it. If an input field in the `editAttributes` object has
a matching value in the `selectorOptions` object, then it is assumed that the user should be presented with some type of selector field that
limits the available input options. In the above example, because the form attribute `FavoritePlanet` is found in both `formValues` and `formOptions`
it can be assumed that the `FavoritePlanet` field should be rendered as one of the following:

```html
<select>...</select>
<select multiple>...</select>
<radio>...</radio>
<checkbox>...</checkbox>
```

In contrast, the `FirstName` attribute is not found in the `selectorOptions` object, therefore it is assumed that this field should be rendered as
a type of text input.

```html
<input type="text" .../>
<input type="field" .../>
```

### Single Select vs. Multiple Select

The next decision point is whether to allow the user to select a single value or multiple values. The Form Builder distinguishes these two use cases
by looking at the type of the value for the input attribute. Using the above example again, `FavoritePlanet` is of type `String`, therefore it renders
the input as a single select.

```html
<select>...</select>
<radio>...</radio>
```

If, however, the value is of type `Array`, Form builder assumes that the user should be allowed to select multiple options and will render one of the
following.

```html
<select multiple>...</select>
<checkbox>...</checkbox>
```

### Few Options vs. Many Options

The next branching point looks at the number of options passed for a given selector field. Since it is undesirable to render a radio or checkbox with
a massive amount of options and likewise a dropdown menu with only two options, the Form Builder sets an arbitrary cutoff when the number of options reaches
five. When the length of options goes beyond four, the input field is rendered as a drop down selector instead of a radio or checkbox selector.

### Single Line Text vs. Multiple Line Text

Finally, a distinction is made between the text input and text field. If the value for a given text attribute contains either a `carriage return` or 
`new line` character then it is assumed that the text should be rendered in a text field box. Also, if the text length exceeds 50 characters the same 
assumption is made.

> NOTE: Currently only distinguishes between text and text-field but password, email, etc. are on the todolist.
> This criteria is likely to change as this decision point is fleshed out into different text inputs and made more flexible.

## Coming soon...

* ##### Decouple React-Bootstrap components so that styles can be added by the developer

* ##### Support for file upload field

* ##### More flexible event handlers and form validation functions

* ##### More flexibility for developers to pass in input parameters i.e. placeholder text, validation functions, etc.
