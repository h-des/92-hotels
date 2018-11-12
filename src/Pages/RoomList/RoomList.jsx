import React from 'react';
import styled from 'styled-components';
import RoomCard from './RoomCard';
import FindRoom from '../../Components/FindRoom/FindRoom';
import Spinner from '../../Components/Spinner';

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

class RoomList extends React.PureComponent {
  renderRooms = () => {
    return this.props.rooms.map((e, id) => <RoomCard data={e} key={id} />);
  };

  render() {
    return (
      <Grid>
        <FindRoom />
        <CenterCell>
          {this.renderRooms()}
          {this.props.loading && <Spinner />}
        </CenterCell>
      </Grid>
    );
  }
}

export default RoomList;
