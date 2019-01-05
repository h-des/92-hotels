import React from 'react';
import styled from 'styled-components';
import HotelCard from './HotelCard';
import Filters from '../../Components/Filters';
import { Spinner } from '../../Components/Spinner';
import PropTypes from 'prop-types';

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

const Message = styled.p`
  padding: 2rem 4rem;
  font-size: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
`;

const Center = styled.div`
  margin: 0 auto;
  text-align: center;
`;

class HotelList extends React.PureComponent {
  renderHotels = () => {
    return this.props.hotels.map((hotel, id) => (
      <HotelCard data={hotel} key={id} />
    ));
  };

  render() {
    return (
      <Grid>
        <Filters cities={this.props.cities} />
        <CenterCell>
          {this.renderHotels()}
          {this.props.hotels.length === 0 && !this.props.loading && (
            <Message>No hotels found</Message>
          )}
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

HotelList.propTypes = {
  hotels: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired
};

export default HotelList;
