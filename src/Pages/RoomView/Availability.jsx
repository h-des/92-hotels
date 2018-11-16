import React, { Component } from 'react';
import { Button } from '../../Components/Buttons';
import moment from 'moment';
import styled from 'styled-components';
import { DatePicker } from '@atlaskit/datetime-picker';
import { NumberInput } from '../../Components/Input';

const Container = styled.form`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 425px) {
    flex-direction: column;
  }
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 425px) {
    flex-direction: row;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media only screen and (max-width: 425px) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
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

export default class Availability extends Component {
  state = {
    checkIn: moment().format('YYYY-MM-DD'),
    checkOut: moment()
      .add(1, 'days')
      .format('YYYY-MM-DD'),
    adults: 0,
    childs: 0
  };

  handleChange = e => {
    if (e.target) e.preventDefault();
  };

  render() {
    return (
      <Container>
        <Fields>
          <FieldGroup>
            <ResetCustomInput>
              <Field>
                <Label style={{ marginLeft: '-20px' }}>From</Label>
                <DatePicker onChangeEvent={this.handleChange} />
              </Field>
            </ResetCustomInput>
            <ResetCustomInput>
              <Field>
                <Label style={{ marginLeft: '-20px' }}>To</Label>
                <DatePicker onChangeEvent={this.handleChange} />
              </Field>
            </ResetCustomInput>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label>Adults</Label>
              <NumberInput onChangeEvent={this.handleChange} />
            </Field>
            <Field>
              <Label>Childs</Label>
              <NumberInput onChangeEvent={this.handleChange} />
            </Field>
          </FieldGroup>
        </Fields>
        <Actions>
          <Button color="primary">Check availability</Button>
          <p>error</p>
          <Button color="disabled" disabled>
            Book now!
          </Button>
        </Actions>
      </Container>
    );
  }
}
