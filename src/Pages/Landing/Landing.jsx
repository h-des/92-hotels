import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Main from './Main';
import Featured from './Featured';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchRoomTiles();
  }

  render() {
    return (
      <div>
        {/* <Main tiles={this.props.filters.tiles} /> */}
        <Featured cities={this.props.filters.tiles} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    filters: state.filters
  };
};

export default connect(
  mapStateToProps,
  actions
)(Landing);
