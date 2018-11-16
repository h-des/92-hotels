import React, { Component } from 'react';
import { Button } from '../../Components/Buttons';
import moment from 'moment';
import styled from 'styled-components';
import { DatePicker } from '@atlaskit/datetime-picker';
import { NumberInput } from '../../Components/Inputs';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const Container = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 70%; */
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 20%; */
  justify-content: space-between;
  padding-top: 3.7rem;
  padding-bottom: 0.7rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media only screen and (max-width: 670px) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.6rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ResetCustomInput = styled.span`
  font-size: 1.4rem;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 2.5rem;
`;

const Message = styled.p`
  border-radius: 4px;
  border: solid 1px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  font-size: 2rem;
  border-color: ${props =>
    props.available ? props.theme.colors.green : 'red'};
`;

class Availability extends Component {
  state = {
    checkIn: moment().format('YYYY-MM-DD'),
    checkOut: moment()
      .add(1, 'days')
      .format('YYYY-MM-DD'),
    adults: 1,
    children: 0,
    status: null,
    available: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (this.props.availability.status !== 'WAITING') {
      this.props.resetAvailability();
    }
    if (
      (name === 'adults' || name === 'childs') &&
      value < 0 &&
      !isNaN(value)
    ) {
      this.setState({
        [name]: 0
      });
    } else if (!isNaN(value)) {
      this.setState({
        [name]: value
      });
    }
  };

  handleDateChange = (e, name) => {
    if (this.props.availability.status !== 'WAITING') {
      this.props.resetAvailability();
    }
    this.setState({ [name]: e });
  };

  stepUp = (e, name) => {
    e.preventDefault();
    if (this.props.availability.status !== 'WAITING') {
      this.props.resetAvailability();
    }
    this.setState(prevState => {
      return {
        [name]: parseInt(prevState[name], 10) + 1
      };
    });
  };

  stepDown = (e, name) => {
    e.preventDefault();
    if (this.props.availability.status !== 'WAITING') {
      this.props.resetAvailability();
    }
    if (this.state[name] > 0) {
      this.setState(prevState => {
        return {
          [name]: parseInt(prevState[name], 10) - 1
        };
      });
    }
  };

  checkAvailability = e => {
    e.preventDefault();
    const { checkIn, checkOut, adults, children } = this.state;
    const data = { checkIn, checkOut, adults, children };

    this.props.checkAvailability(data);
  };

  renderCTA = () => {
    switch (this.props.availability.status) {
      case 'AVAILABLE':
        return <Message available>Available!</Message>;
      case 'NOT_AVAILABLE':
        return <Message>Not avaiable</Message>;
      default:
        return (
          <Button color="primary" onClick={this.checkAvailability}>
            Check availability
          </Button>
        );
    }
  };

  render() {
    return (
      <Container>
        <Fields>
          <FieldGroup>
            <ResetCustomInput>
              <Field>
                <Label htmlFor="checkIn" style={{ marginLeft: '-20px' }}>
                  Check in
                </Label>
                <DatePicker
                  id="checkIn"
                  name="checkIn"
                  onChange={e => this.handleDateChange(e, 'checkIn')}
                />
              </Field>
            </ResetCustomInput>
            <ResetCustomInput>
              <Field>
                <Label htmlFor="checkOut" style={{ marginLeft: '-20px' }}>
                  Check out
                </Label>
                <DatePicker
                  id="checkOut"
                  name="checkOut"
                  onChange={e => this.handleDateChange(e, 'checkOut')}
                />
              </Field>
            </ResetCustomInput>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label htmlFor="adults">Adults</Label>
              <NumberInput
                fieldName="adults"
                onPlusClick={this.stepUp}
                onMinusClick={this.stepDown}
                currentValue={this.state.adults}
                onChangeEvent={this.handleChange}
                marginBottom="2.5rem"
              />
            </Field>
            <Field>
              <Label htmlFor="children">Children</Label>
              <NumberInput
                fieldName="children"
                onPlusClick={this.stepUp}
                onMinusClick={this.stepDown}
                currentValue={this.state.children}
                onChangeEvent={this.handleChange}
                marginBottom="2.5rem"
              />
            </Field>
          </FieldGroup>
        </Fields>
        <Actions>
          {this.renderCTA()}
          {this.props.availability.status == 'AVAILABLE' ? (
            <Button color="green">Book now!</Button>
          ) : (
            <Button color="disabled" disabled>
              Book now!
            </Button>
          )}
        </Actions>
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
