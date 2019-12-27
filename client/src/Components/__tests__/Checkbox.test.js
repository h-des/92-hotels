import theme from '../../utils/theme'
import React from 'react'
import { mountWithTheme } from '../../utils/utilsFunctions  '
import Checkbox from '../Checkbox'
import 'jest-styled-components'

describe('Checkbox', () => {
  const mockLabelClick = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = mountWithTheme(
      <Checkbox
        name="test"
        theme={theme}
        checked={false}
        onChange={mockLabelClick}
      >
        Test
      </Checkbox>,
      theme
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Checbkox renders properly', () => {
    expect(wrapper.find('label').exists()).toBeTruthy()
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.find('span').exists()).toBeTruthy()
    expect(wrapper.find('label').text()).toEqual('Test')
  })

  it("Set input's name prop and label's for prop", () => {
    expect(wrapper.find('input').props().name).toEqual('test')
    expect(wrapper.find('label').props().htmlFor).toEqual('test')
  })

  it('Set correct checked prop', () => {
    let checkbox = wrapper.find('input')
    expect(checkbox.props().checked).toBeFalsy()
    wrapper.setProps({ checked: true })
    checkbox = wrapper.find('input')
    expect(checkbox.props().checked).toBeTruthy()
  })

  it('Test onChange function call', () => {
    let checkbox = wrapper.find('input')
    checkbox.simulate('change')
    expect(mockLabelClick.mock.calls.length).toEqual(1)
  })
})
