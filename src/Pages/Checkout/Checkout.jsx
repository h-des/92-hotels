import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';
import moment from 'moment';
import { Input } from '../../Components/Inputs';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Checkbox from '../../Components/Checkbox';

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const CheckoutBody = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  margin-top: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);

  @media only screen and (max-width: 625px) {
    flex-direction: column;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  /* align-items: stretch; */
  padding: 4rem 5rem;
  width: 67%;
  color: ${props => props.theme.colors.black};

  @media only screen and (max-width: 625px) {
    width: 100%;
  }
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 33%;
  background-color: #f6f6f6;
  padding-top: 13rem;
  padding-bottom: 5rem;
  color: ${props => props.theme.colors.black};

  @media only screen and (max-width: 625px) {
    width: 100%;
    padding-top: 2rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 4rem;
`;
const FormSubTitle = styled.h4`
  font-size: 2.4rem;
  font-weight: 600;
  color: #414141;
  margin-bottom: 3rem;
`;

const Group = styled.div`
  margin-bottom: 2rem;
`;
const Label = styled.label`
  font-size: 1.6rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const TotalTitle = styled.h3`
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 3rem;
`;

const Price = styled.p`
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 4rem;
  color: #1fb6ff;
`;

const Features = styled.ul``;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Feature = styled.li`
  font-size: 1.4rem;
  color: #4c4c4c;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  color: ${props => props.theme.colors.grey};
  font-size: 1.6rem;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  max-width: 100px;
  transition: all 0.2s;
  padding: 0.5rem 0;

  &:hover {
    background-color: #ddd;
  }
`;

const NextButton = styled.button`
  border-radius: 2rem;
  justify-self: flex-end;
  border: none;
  height: 4rem;
  width: 80px;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  font-size: 1.6rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1fb6ff;
  }

  &:disabled {
    background-color: #ccc;
    color: ${props => props.theme.colors.black};
    cursor: initial;
  }
`;

const ResetCustomInput = styled.span`
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
`;

const RadioButton = styled.input``;

class Checkout extends Component {
  state = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: '',
    price: '',
    breakfast: false
  };

  componentDidMount() {
    if (this.props.checkout) {
      if (this.props.checkout.status === 'AVAILABLE') {
        const { checkIn, checkOut, price } = this.props.checkout.data;
        let a = moment(checkIn);
        let b = moment(checkOut);
        const len = Math.abs(a.diff(b, 'days'));
        this.setState({
          price: len * price
        });
      }
    }
  }

  handleCheckbox = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleChange = e => {
    if (e.target.name === 'phone') {
      const val = e.target.value.replace(/\D/g, '');
      this.setState({
        [e.target.name]: val
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  pay = () => {
    const data = { ...this.state };
    this.props.proceedToPayment(data);
  };

  render() {
    if (this.props.checkout.status !== 'AVAILABLE') {
      return <Redirect to="/rooms" />;
    }
    const renderPayButton = () => {
      let shouldRender =
        Object.values(this.state).filter(e => e === '').length > 0
          ? false
          : true;
      if (shouldRender) return <NextButton onClick={this.pay}>Pay</NextButton>;
      return <NextButton disabled>Pay</NextButton>;
    };
    const {
      checkIn,
      checkOut,
      adults,
      children,
      price
    } = this.props.checkout.data;
    return (
      <Container>
        <CheckoutBody>
          <Form>
            <FormTitle>Checkout</FormTitle>
            <Group>
              <FormSubTitle>Details</FormSubTitle>
              <Checkbox
                onChangeE={this.handleCheckbox}
                name="breakfast"
                checked={this.state.breakfast}
              >
                Breakfast included
              </Checkbox>
            </Group>
            <Group>
              <FormSubTitle>Personal</FormSubTitle>
              <Label htmlFor="firstName">First name</Label>
              <Input
                onChange={this.handleChange}
                name="firstName"
                id="firstName"
                value={this.state.firstName}
              />
              <Label htmlFor="lastName">Last name</Label>
              <Input
                onChange={this.handleChange}
                name="lastName"
                id="lastName"
                value={this.state.lastName}
              />
            </Group>
            <Group>
              <FormSubTitle>Contact</FormSubTitle>
              <Label htmlFor="address">Address</Label>
              <Input
                onChange={this.handleChange}
                name="address"
                id="address"
                value={this.state.address}
              />
              <Label htmlFor="city">City</Label>
              <Input
                onChange={this.handleChange}
                name="city"
                id="city"
                value={this.state.city}
              />
              <Label htmlFor="phone">Phone</Label>
              <Input
                onChange={this.handleChange}
                name="phone"
                id="phone"
                value={this.state.phone}
              />
            </Group>
            <BackButton onClick={() => this.props.history.goBack()}>
              Back
            </BackButton>
          </Form>
          <Total>
            <FlexColumn>
              <TotalTitle>Total</TotalTitle>
              <Price>{this.state.price}$</Price>
              <Features>
                <Feature>{price}$ per night</Feature>
                <Feature>From: {checkIn}</Feature>
                <Feature>To: {checkOut}</Feature>
                <Feature>
                  {adults} {adults !== 1 ? 'adults' : 'adult'}
                </Feature>
                <Feature>
                  {children} {children !== 1 ? 'children' : 'child'}
                </Feature>
                <Feature>All inclusive</Feature>
              </Features>
            </FlexColumn>
            {renderPayButton()}
          </Total>
        </CheckoutBody>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkout: state.checkout
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Checkout)
);
