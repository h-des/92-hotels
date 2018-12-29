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
    const { id } = this.props;
    const data = { from: checkIn, to: checkOut, roomType: roomType.value, id };

    this.props.checkAvailability(data);
  };

  componentWillUnmount() {
    this.props.resetAvailability();
  }

  renderButtons = () => {
    switch (this.props.status) {
      case constants.INITIAL:
        return (
          <React.Fragment>
            <Button color="primary" onClick={this.checkAvailability}>
              Check availability
            </Button>
          </React.Fragment>
        );
      case constants.LOADING:
        return (
          <React.Fragment>
            <Button color="disabled" disabled onClick={this.checkAvailability}>
              Loading...
            </Button>
          </React.Fragment>
        );

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
            <Button color="green" onClick={this.checkAvailability}>
              Book now
            </Button>
          </React.Fragment>
        );
    }
  };

  render() {
    return (
      <Container>
        <Field>
          <Label htmlFor="checkIn">Check in</Label>
          <DatePicker
            id="checkIn"
            name="checkIn"
            onChange={e => this.handleChange(e, 'checkIn')}
          />
        </Field>
        <Field>
          <Label htmlFor="checkOut">Check out</Label>
          <DatePicker
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
            options={[
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 }
            ]}
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

const mapStateToProps = state => {
  return {
    availability: state.checkout
  };
};

export default connect(
  mapStateToProps,
  actions
)(Availability);
