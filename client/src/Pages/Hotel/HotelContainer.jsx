import React, { Component } from 'react';
import Hotel from './Hotel';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class HotelContainer extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchHotelInfo(id);
  }

  // componentWillUnmount() {
  //   this.props.hotelUnmount();
  // }

  render() {
    const { id } = this.props.match.params;
    const hotel = this.props.hotels.find(e => e._id === id);
    return <Hotel data={hotel} status={this.props.status} />;
  }
}

const mapStateToProps = state => {
  return {
    hotels: state.hotels.list,
    status: state.hotels.specificHotelStatus
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(HotelContainer)
);
