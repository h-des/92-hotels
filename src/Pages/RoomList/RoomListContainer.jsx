import React, { Component } from 'react';
import RoomList from './RoomList';
import withScrollPosition from '../../Components/Utils/withScrollPostion';
import CarouselSLiding from '../../Components/CarouselSliding';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class RoomListContainer extends Component {
  componentDidMount() {
    this.props.fetchRooms();
    this.props.fetchRoomTiles();
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

  selectCityFilter = city => {
    //fake api call
    console.log(city);
  };

  render() {
    const { status } = this.props.rooms;
    if (status === 'FAILURE') {
      return 'Error: Cannot load rooms';
    }
    return (
      <React.Fragment>
        <CarouselSLiding
          items={this.props.filters.tiles}
          onClick={this.selectCityFilter}
        />
        <RoomList
          loadmore={this.loadMore}
          rooms={this.props.rooms.list}
          loading={status === 'LOADING'}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    filters: state.filters
  };
};

export default withScrollPosition(
  connect(
    mapStateToProps,
    actions
  )(RoomListContainer)
);
