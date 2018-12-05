import React from 'react';
import styled from 'styled-components';
import RoomCard from './RoomCard';
import FindRoom from '../../Components/FindRoom';
import { Spinner } from '../../Components/Spinner';
const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(20px, auto) minmax(auto, 114rem) minmax(
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

const Center = styled.div`
  margin: 0 auto;
  text-align: center;
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
          {this.props.loading && (
            <Center>
              <Spinner />
            </Center>
          )}
        </CenterCell>
      </Grid>
    );
  }
}

export default RoomList;
