import React from 'react';
import TextInput from '../src/InputComponents/TextInput';
import renderer from 'react-test-renderer';
jest.mock('react-dom');

test("TextInput renders correctly", () => {
    const component = renderer.create(
        <TextInput 
            id={'text-field'}
            value={"Chip"}
            label={"First Name"}
            onChange={(ev) => {console.log(ev)}}/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    console.log(tree);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})