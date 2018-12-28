import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Main from './Main';
import Featured from './Featured';
import Subscribe from './Subscribe';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchPromoted();
  }

  render() {
    return (
      <div>
        <Main tiles={[]} />
        <Featured hotels={this.props.promoted.list} />
        <Subscribe />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    promoted: state.promoted
  };
};

export default connect(
  mapStateToProps,
  actions
)(Landing);
