import React, { Component } from 'react';
import Main from './Main';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchRoomTiles();
  }

  render() {
    return (
      <div>
        <Main tiles={this.props.filters.tiles} />
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
