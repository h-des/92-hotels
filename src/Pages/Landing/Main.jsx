import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import backgroundPhoto from '../../images/landing.JPG';
import CarouselSliding from '../../Components/CarouselSliding';
import { DatePicker } from '@atlaskit/datetime-picker';
import Select from '@atlaskit/select';
import { Button } from '../../Components/Buttons';

const StyledContainer = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1)),
    url(${backgroundPhoto});
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
    height: 200vh;
    background-image: linear-gradient(
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 1) 50%
      ),
      url(${backgroundPhoto});
  }
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 20rem;
  left: 50%;
  width: 70%;
  transform: translateX(-50%);

  @media only screen and (max-width: 600px) {
    width: 95%;
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(-100vh);
  }
  70% {
    transform: translateY(1rem);
  }
  90% {
    transform: translateY(0rem);
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(100vh);
  }
  70% {
    transform: translateY(-1rem);
  }
  90% {
    transform: translateY(0);
  }
`;

const BottomContainer = styled.div`
  animation: ${slideUp} 1s ease-in-out forwards;
`;

const Heading = styled.h2`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 4rem;
  color: white;
  animation: ${slideDown} 1s ease-in-out forwards;
`;

const SecondaryHeading = styled.h3`
  font-size: 3rem;
  margin-bottom: 4rem;
  font-weight: 400;
  color: white;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  margin-right: 2rem;
  font-size: 1.4rem;

  @media only screen and (max-width: 600px) {
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  font-size: 1.6rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: white;
  margin-bottom: 20rem;
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export default class Main extends Component {
  render() {
    return (
      <StyledContainer>
        <InnerContainer>
          <Heading>Find your next favourite place!</Heading>
          <BottomContainer>
            <StyledForm>
              <Field>
                <Label>City</Label>
                <Select
                  options={[
                    { label: 'Adelaide', value: 'adelaide' },
                    { label: 'Brisbane', value: 'brisbane' },
                    { label: 'Canberra', value: 'canberra' },
                    { label: 'Darwin', value: 'darwin' },
                    { label: 'Hobart', value: 'hobart' },
                    { label: 'Melbourne', value: 'melbourne' },
                    { label: 'Perth', value: 'perth' },
                    { label: 'Sydney', value: 'sydney' }
                  ]}
                />
              </Field>
              <Field>
                <Label>Check In</Label>
                <DatePicker />
              </Field>
              <Field>
                <Label>Check Out</Label>
                <DatePicker />
              </Field>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </StyledForm>
            <SecondaryHeading>Get inspired</SecondaryHeading>
            <CarouselSliding items={this.props.tiles} onClick={() => {}} />
          </BottomContainer>
        </InnerContainer>
      </StyledContainer>
    );
  }
}
