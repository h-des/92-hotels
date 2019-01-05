import theme from '../../utils/theme';
import Card from '../Card';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-styled-components';
import { mountWithTheme } from '../../utils/utilsFunctions';

describe('Card', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(
      <Router>
        <Card
          image="path"
          name="test"
          city="city"
          stars={3}
          rating={4}
          _id="aaa123"
          reviewsCount="100"
        />
      </Router>,
      theme
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Render proper image src', () => {
    // console.log(wrapper.debug());
    expect(wrapper.find({ url: 'path' }).exists()).toBeTruthy();
  });

  it('Render 5 stars and 5 badges', () => {
    expect(wrapper.find('Star')).toHaveLength(5);
    expect(wrapper.find('Badge')).toHaveLength(5);
  });

  it('Render proper title', () => {
    expect(wrapper.find('h3').text()).toEqual('test');
  });

  it('Set correct link path', () => {
    expect(wrapper.find('Link').exists()).toBeTruthy();
    expect(wrapper.find('Link').props().to).toEqual('/hotels/aaa123');
  });
});
