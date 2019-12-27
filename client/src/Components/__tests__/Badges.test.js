import React from 'react'
import { shallow } from 'enzyme'
import Badges from '../Badges'

describe('Badges component ', () => {
  it('renders correct number of badges', () => {
    const wrapper = shallow(<Badges count={2} type="stars" />)
    expect(wrapper.find('li')).toHaveLength(5)
    wrapper.setProps({ count: 10 })
    expect(wrapper.find('li')).toHaveLength(5)
  })

  it('renders correct type of badge', () => {
    const wrapper = shallow(<Badges count={2} type="stars" />)
    expect(wrapper.find('Star')).toHaveLength(5)
    wrapper.setProps({ type: 'badge' })
    expect(wrapper.find('Badge')).toHaveLength(5)
  })

  it('renders correct number of filled badges', () => {
    let count = 2
    const wrapper = shallow(<Badges count={count} type="stars" />)
    expect(wrapper.find('[fillColor="#ccc"]')).toHaveLength(5 - count)
    count = 5
    wrapper.setProps({ count })
    expect(wrapper.find('[fillColor="#ccc"]')).toHaveLength(5 - count)
  })
})
