import React, { Component } from 'react';
import { Button, LinkButton } from '../../Components/Buttons';
import moment from 'moment';
import styled from 'styled-components';
import { DatePicker } from '@atlaskit/datetime-picker';
import Select from '@atlaskit/select';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import constants from '../../utils/constants';

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Message = styled.p`
  background-color: ${props => props.color};
  border-left-style: solid;
  border-left-width: 3px;
  border-left-color: ${props => props.borderColor};
  color: ${props => props.borderColor};
  padding: 1rem 2rem;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
`;

class Availability extends Component {
  state = {
    checkIn: moment().format('YYYY-MM-DD'),
    checkOut: moment()
      .add(1, 'days')
      .format('YYYY-MM-DD'),
    roomType: null,
    error: null
  };

  handleChange = (e, name) => {
    if (
      this.props.status === constants.ERROR ||
      this.props.status === constants.SUCCESS
    ) {
      this.props.resetAvailability();
    }
    this.setState({ [name]: e, error: null });
  };

  checkAvailability = e => {
    e.preventDefault();
    const { checkIn, checkOut, roomType } = this.state;
    if (!checkIn || !checkOut || !roomType) {
      return this.setState({ error: 'Fields cannot be empty!' });
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      return this.setState({ error: 'Invalid date!' });
    }
    const { _id } = this.props.data;
    const data = { from: checkIn, to: checkOut, roomType: roomType.value, _id };

    this.props.checkAvailability(data);
  };

  componentWillUnmount() {
    this.props.resetAvailability();
  }

  renderButtons = () => {
    switch (this.props.status) {
      case constants.LOADING:
        return <Button color="disabled" disabled loading />;

      case constants.ERROR:
        return (
          <React.Fragment>
            <Message color="#FFEE58" borderColor="#D32F2F">
              Not available.
            </Message>
            <Button color="disabled" disabled onClick={this.checkAvailability}>
              Check availability
            </Button>
          </React.Fragment>
        );

      case constants.SUCCESS:
        return (
          <React.Fragment>
            <Message color="#A5D6A7" borderColor="#388E3C">
              Available!
            </Message>
            <LinkButton color="green" to="/checkout/">
              Book now
            </LinkButton>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <Button color="primary" onClick={this.checkAvailability}>
              Check availability
            </Button>
          </React.Fragment>
        );
    }
  };

  render() {
    const { roomTypes } = this.props.data;
    return (
      <Container>
        <Field>
          <Label htmlFor="checkIn">Check in</Label>
          <DatePicker
            id="checkIn"
            name="checkIn"
            value={this.state.checkIn}
            onChange={e => this.handleChange(e, 'checkIn')}
          />
        </Field>
        <Field>
          <Label htmlFor="checkOut">Check out</Label>
          <DatePicker
            value={this.state.checkOut}
            id="checkOut"
            name="checkOut"
            onChange={e => this.handleChange(e, 'checkOut')}
          />
        </Field>
        <Field>
          <Label htmlFor="roomType">Room type</Label>
          <Select
            id="roomType"
            name="roomType"
            options={getSelectOptions(roomTypes)}
            onChange={e => this.handleChange(e, 'roomType')}
          />
        </Field>
        {this.state.error && (
          <Message color="#FFEE58" borderColor="#D32F2F">
            {this.state.error}
          </Message>
        )}
        {this.renderButtons()}
      </Container>
    );
  }
}

function getSelectOptions(arr) {
  return arr.map(e => {
    if (e > 1) return { label: `${e} people`, value: e };
    return { label: `${e} person`, value: e };
  });
}

const mapStateToProps = state => {
  return {
    availability: state.checkout
  };
};

export default connect(
  mapStateToProps,
  actions
)(Availability);
