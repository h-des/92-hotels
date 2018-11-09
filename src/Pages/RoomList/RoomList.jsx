import React from 'react';
import styled from 'styled-components';
import RoomCard from './RoomCard';
import FindRoom from '../../Components/FindRoom/FindRoom';

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(20px, auto) minmax(auto, 1140px) minmax(
      20px,
      auto
    );
  grid-auto-flow: row;
`;

const CenterCell = styled.div`
  grid-column: 2;
  display: grid;
  grid-auto-flow: row;
  grid-column-gap: 2rem;
`;

class RoomList extends React.Component {
  renderRooms = () => {
    return this.props.rooms.map((e, id) => <RoomCard data={e} key={id} />);
  };

  render() {
    return (
      <Grid>
        <FindRoom />
        <CenterCell>
          {this.props.rooms.length ? this.renderRooms() : 'Loading'}
        </CenterCell>
      </Grid>
    );
  }
}

export default RoomList;
