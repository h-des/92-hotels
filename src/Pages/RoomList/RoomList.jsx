import React, {Component} from 'react'
import styled from 'styled-components';
import RoomCard from './RoomCard';

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

export default ({rooms}) => {
  
  this.renderRooms = () => {
    return rooms.map((e, id) => <RoomCard data={e} key={id}/>)
  }

  return (
    <Grid>
      <CenterCell >
        {rooms.length
          ? this.renderRooms()
          : 'Loading'
        }
      </CenterCell>
    </Grid>
  )
}


