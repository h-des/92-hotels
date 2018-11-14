import React, { Component } from 'react';
import RoomList from './RoomList';
import withScrollPosition from '../../Components/Utils/withScrollPostion';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class RoomListContainer extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  loadMore = () => {
    this.props.fetchMoreRooms();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scrollInfo && prevProps.scrollInfo) {
      const { scrollY, innerHeight, scrollHeight } = this.props.scrollInfo;

      const scrollPos = scrollHeight - scrollY - innerHeight;
      if (
        scrollPos < innerHeight &&
        scrollY > 0 &&
        scrollHeight === prevProps.scrollInfo.scrollHeight &&
        scrollY !== prevProps.scrollInfo.scrollY
      ) {
        this.loadMore();
      }
    }
  }

  render() {
    switch (this.props.rooms.status) {
      case 'LOADING':
        return (
          <RoomList
            loadmore={this.loadMore}
            rooms={this.props.rooms.list}
            loading
          />
        );
      case 'SUCCESS':
        return (
          <RoomList loadmore={this.loadMore} rooms={this.props.rooms.list} />
        );
      case 'FAILURE':
        return 'Error: Cannot load rooms';
      default:
        return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  };
};

export default withScrollPosition(
  connect(
    mapStateToProps,
    actions
  )(RoomListContainer)
);
