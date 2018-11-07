import React, { Component } from 'react';
import RoomList from './RoomList';
import withScrollPosition from './withScrollPostion';

class RoomFetcher extends Component {
  state = {
    roomList: []
  };

  async componentDidMount() {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/photos?_limit=10'
    );
    const roomList = await response.json();
    this.setState({
      roomList: [...roomList]
    });
  }

  loadMore = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/photos?_limit=10'
    );
    const nextItems = await response.json();
    this.setState(prevstate => {
      return {
        roomList: [...prevstate.roomList, ...nextItems]
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scrollInfo && prevProps.scrollInfo) {
      const { scrollY, innerHeight, scrollHeight } = this.props.scrollInfo;

      const scrollPos = scrollHeight - scrollY - innerHeight;
      if (
        scrollPos < innerHeight &&
        scrollY > 0 &&
        scrollHeight == prevProps.scrollInfo.scrollHeight &&
        scrollY !== prevProps.scrollInfo.scrollY
      ) {
        this.loadMore();
      }
    }
  }

  render() {
    return <RoomList loadmore={this.loadMore} rooms={this.state.roomList} />;
  }
}

export default withScrollPosition(RoomFetcher);
