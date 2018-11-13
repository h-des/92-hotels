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

  renderRoomView = () => {
    const { id } = this.props.match.params;
    const { list, status } = this.props.rooms;
    const myRoom = list.filter(e => e.id == id)[0];
    if (myRoom && myRoom.comments) {
      return <RoomView roomData={myRoom} />;
    } else {
      return <RoomView />;
    }
  };

  render() {
    return <React.Fragment>{this.renderRoomView()}</React.Fragment>;
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
