import React, {Component} from 'react'
import RoomCard from './../Components/RoomCard';
import styled from 'styled-components';

const Grid = styled.div `
  display: grid;
  grid-template-columns: minmax(20px,auto) minmax(auto,1140px) minmax(20px,auto);
  grid-auto-flow: row;
  `

const CenterCell = styled.div `
  grid-column: 2;
  display: grid;
  grid-auto-flow: row;  
  grid-column-gap: 2rem; 
`

export default class RoomList extends Component {
  state = {
    roomList: []
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
      .then(response => response.json())
      .then(json => this.setState({
        roomList: [...json]
      }))
  }

  renderRooms = () => {
    console.log(this.state.roomList);
    return this
      .state
      .roomList
      .map((e, id) => <RoomCard data={e} key={id}/>)
  }

  render() {
    return (
      <Grid>
        <CenterCell >
          {this.renderRooms()}
        </CenterCell>
      </Grid>
    )
  }
}
