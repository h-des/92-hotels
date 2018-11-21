import React from 'react';
import { shallow } from 'enzyme';
import { NumberInput } from '../Components/Inputs';

describe('Test NumberInput', () => {
  const mockOnClickPlus = jest.fn();
  const mockOnClickMinus = jest.fn();
  const wrapper = shallow(
    <NumberInput
      fieldName="test"
      onMinusClick={mockOnClickMinus}
      onPlusClick={mockOnClickPlus}
      currentVal={10}
    />
  );

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

    wrapper.setProps({ currentVal: 2 });
    expect(wrapper.find('[value=2]')).toHaveLength(1);
  });
});
