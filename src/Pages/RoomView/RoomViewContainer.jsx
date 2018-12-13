import React, { Component } from 'react';
import RoomView from './RoomView';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class RoomViewContainer extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchFullRoomInfo(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { list } = this.props.rooms;
    const myRoom = list.find(e => e.id === parseInt(id, 10));
    if (myRoom && myRoom.comments) {
      return <RoomView roomData={myRoom} />;
    } else {
      return <RoomView />;
    }
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(RoomViewContainer)
);
