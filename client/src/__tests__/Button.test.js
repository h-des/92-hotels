import React from 'react';
import { shallow } from 'enzyme';

import theme from '../utils/theme';
import { Button } from '../Components/Buttons';

test('Button renders properly', () => {
  const wrapper = shallow(<Button theme={theme} />);
  expect(wrapper).toMatchSnapshot();
});

describe('Button renders with theme', () => {
  const wrapper = shallow(<Button theme={theme} />);

  it('primary', () => {
    wrapper.setProps({ color: 'primary' });
    expect(wrapper).toHaveStyleRule('background-color', theme.colors.primary);
  });

  it('secondary', () => {
    wrapper.setProps({ color: 'secondary' });
    expect(wrapper).toHaveStyleRule('background-color', theme.colors.secondary);
  });

  it('black', () => {
    wrapper.setProps({ color: 'black' });
    expect(wrapper).toHaveStyleRule('background-color', theme.colors.black);
  });

  it('green', () => {
    wrapper.setProps({ color: 'green' });
    expect(wrapper).toHaveStyleRule('background-color', theme.colors.green);
  });

  it('disabled', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toHaveStyleRule('transform', undefined, {
      modifier: ':hover'
    });
    expect(wrapper).toHaveStyleRule('box-shadow', undefined, {
      modifier: ':hover'
    });
  });
});
