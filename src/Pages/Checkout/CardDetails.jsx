import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import arrow from '../../images/arrow-left.svg';

const Contaier = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 45rem;
  padding: 4rem;
  padding-top: 15rem;
  text-align: left;
  background-image: linear-gradient(to top right, #212121, #444444);
  border-radius: 16px;
  box-shadow: 0 9px 25px rgba(0, 0, 0, 0.4);

  @media only screen and (max-width: 425px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    box-shadow: none;
    padding-top: 4rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 6rem;
`;

const labelStyle = css`
  font-weight: 400;
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const Label = styled.label`
  ${labelStyle}
`;

const Legend = styled.legend`
  ${labelStyle}
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.36);
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
  color: white;
  margin-bottom: 3rem;
  transition: all 0.2s;
  text-align: ${props => (props.short ? `center` : `left`)};

  &::placeholder {
    text-align: center;
  }

  &:focus {
    border-bottom: 1px solid white;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  margin-bottom: 5rem;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 28%;
`;

const PayButton = styled.button`
  font-size: 2.4rem;
  border: none;
  border-radius: 16px;
  padding: 1.2rem 0;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colorsHover.primary};
  }

  &:disabled {
    cursor: initial;
    background-color: #ccc;
    color: ${props => props.theme.colors.black};
  }
`;

const BackIcon = styled.img`
  height: 4rem;
  width: 4rem;
`;

const BackButton = styled.button`
  margin-bottom: 10rem;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
  align-self: flex-start;
`;

export default class CardDetails extends Component {
  state = {
    owner: '',
    number: '',
    month: '',
    year: '',
    cvv: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCardInfo = e => {
    const val = e.target.value.replace(/\D/g, '');
    let allowChange = false;
    switch (e.target.name) {
      case 'number':
        if (
          this.state.number.length < 16 ||
          (this.state.number.length === 16 && val.length < 16)
        ) {
          allowChange = true;
        }
        break;
      case 'month':
        if (
          this.state.month.length < 2 ||
          (this.state.month.length === 2 && val.length < 2)
        ) {
          allowChange = true;
        }
        break;
      case 'year':
        if (
          this.state.year.length < 4 ||
          (this.state.year.length === 4 && val.length < 4)
        ) {
          allowChange = true;
        }
        break;
      case 'cvv':
        if (
          this.state.cvv.length < 3 ||
          (this.state.cvv.length === 3 && val.length < 3)
        ) {
          allowChange = true;
        }
        break;
      default:
        allowChange = false;
    }
    if (allowChange) {
      this.setState({
        [e.target.name]: val
      });
    }
  };

  renderButton = () => {
    const { month, year, owner, number, cvv } = this.state;
    if (
      month.length === 2 &&
      year.length === 4 &&
      owner.length > 0 &&
      number.length === 16 &&
      cvv.length === 3
    ) {
      return <PayButton>Pay {this.props.price}$</PayButton>;
    }
    return <PayButton disabled>Pay {this.props.price}$</PayButton>;
  };

  render() {
    return (
      <Contaier>
        <StyledForm>
          {/* <BackButton>
            <BackIcon src={arrow} />
          </BackButton> */}
          <FormTitle>Card details</FormTitle>
          <Label htmlFor="owner">Card owner</Label>
          <Input
            name="owner"
            id="owner"
            onChange={this.handleChange}
            value={this.state.owner}
          />
          <Label htmlFor="number">Number</Label>
          <Input
            value={this.state.number}
            name="number"
            id="number"
            onChange={this.handleCardInfo}
          />
          <Fieldset>
            <Legend>Expiration Date</Legend>
            <HorizontalContainer>
              <VerticalContainer>
                <Label htmlFor="month">Month</Label>
                <Input
                  value={this.state.month}
                  onChange={this.handleCardInfo}
                  short
                  placeholder="mm"
                  name="month"
                  id="month"
                />
              </VerticalContainer>
              <VerticalContainer>
                <Label htmlFor="year">Year</Label>
                <Input
                  value={this.state.year}
                  onChange={this.handleCardInfo}
                  short
                  placeholder="yyyy"
                  name="year"
                  id="year"
                />
              </VerticalContainer>
              <VerticalContainer>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  value={this.state.cvv}
                  onChange={this.handleCardInfo}
                  short
                  placeholder="xxx"
                  name="cvv"
                  id="cvv"
                />
              </VerticalContainer>
            </HorizontalContainer>
          </Fieldset>
          {this.renderButton()}
        </StyledForm>
      </Contaier>
    );
  }
}
