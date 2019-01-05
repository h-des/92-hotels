import React from 'react';
import { shallow } from 'enzyme';
import { NumberInput } from '../Inputs';

describe('Test NumberInput', () => {
  let wrapper;
  const mockOnClickPlus = jest.fn();
  const mockOnClickMinus = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <NumberInput
        fieldName="test"
        onMinusClick={mockOnClickMinus}
        onPlusClick={mockOnClickPlus}
        currentValue={10}
      />
    );
  });

  test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Set input name', () => {
    expect(wrapper.find("[name='test']")).toHaveLength(1);
  });

  test('Test minus click button', () => {
    wrapper.find("[children='-']").simulate('click');
    expect(mockOnClickMinus.mock.calls.length).toEqual(1);
  });

  test('Test plus click button', () => {
    wrapper.find("[children='+']").simulate('click');
    expect(mockOnClickPlus.mock.calls.length).toEqual(1);
  });

  test('Set current val', () => {
    expect(wrapper.find('[value=10]')).toHaveLength(1);

    wrapper.setProps({ currentValue: 2 });
    expect(wrapper.find('[value=2]')).toHaveLength(1);
  });
});
