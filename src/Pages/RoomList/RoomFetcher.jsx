import React, {Component} from 'react'
import RoomList from './RoomList';

export default class RoomFetcher extends Component {
  state = {
    roomList: []
  }

  async componentDidMount() {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10');
    const roomList = await response.json();
    this.setState({
      roomList: [...roomList]
    })    
  }

  render() {
      return <RoomList rooms={this.state.roomList} />
  }
}
