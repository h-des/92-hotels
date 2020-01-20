import React from 'react'
import { shallow, mount } from 'enzyme'
import { Tab, TabTitle, TabsContainer } from '../Tabs'

describe('Tabs render properly', () => {
  test('Render tab body with children', () => {
    const wrapper = shallow(<Tab isActive={true}>Test</Tab>)
    expect(wrapper.props().children).toEqual('Test')
  })

  test('Tab body not rendered when isActive==false', () => {
    const wrapper = shallow(<Tab isActive={false}>Test</Tab>)
    expect(wrapper.type()).toBeFalsy()
  })

  test('Render tab title with children', () => {
    const wrapper = shallow(<TabTitle isActive={true}>Test</TabTitle>)
    expect(wrapper.props().children).toEqual('Test')
  })

  test('Render inactive Tab title', () => {
    const wrapper = shallow(<TabTitle isActive={false}>Test</TabTitle>)
    expect(wrapper).toHaveStyleRule('background-color', '#DFDFDF')
  })

  test('Render active Tab title', () => {
    const wrapper = shallow(<TabTitle isActive={true}>Test</TabTitle>)
    expect(wrapper).toHaveStyleRule('background-color', 'white')
  })

  test('Pass isActive to only one child', () => {
    const wrapper = shallow(
      <TabsContainer activeTab={0}>
        <Tab>Test</Tab>
        <Tab>Test</Tab>
        <Tab>Test</Tab>
      </TabsContainer>
    )

    expect(wrapper.find('[isActive=true]')).toHaveLength(1)
  })

  test('Render correct tab', () => {
    const wrapper = mount(
      <TabsContainer activeTab={0}>
        <Tab>0</Tab>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabsContainer>
    )

    expect(wrapper.find('[isActive=true]').get(0).props.children).toEqual('0')
    wrapper.setProps({ activeTab: 2 })
    expect(wrapper.find('[isActive=true]').get(0).props.children).toEqual('2')
    wrapper.unmount()
  })
})
