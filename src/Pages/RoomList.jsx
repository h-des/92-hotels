import React, { Component } from 'react'
import RoomCard from './../Components/RoomCard';




export default class RoomList extends Component {
  state = {
    roomList: []
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
      .then(response => response.json())
      .then(json => this.setState({
        roomList: [ ...json]
      }))
  }

  renderRooms = () => {
    console.log(this.state.roomList);
    return this.state.roomList.map((e, id) => <RoomCard data={e} key={id} />)
  }

  render() {
    return (
      <div>
        {this.renderRooms()}
      </div>
    )
  }
}
