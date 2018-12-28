import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Main from './Main';
import Featured from './Featured';
import Subscribe from './Subscribe';
import constants from '../../utils/constants';

class Landing extends Component {
  componentDidMount() {
    if (this.props.promoted.status !== constants.SUCCESS) {
      this.props.fetchPromoted();
    }
    if (this.props.promoted.status !== constants.SUCCESS) {
      this.props.fetchTiles();
    }
  }

  render() {
    return (
      <div>
        <Main tiles={this.props.tiles.list} />
        <Featured hotels={this.props.promoted.list} />
        <Subscribe />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    promoted: state.promoted,
    tiles: state.tiles
  };
};

export default connect(
  mapStateToProps,
  actions
)(Landing);
