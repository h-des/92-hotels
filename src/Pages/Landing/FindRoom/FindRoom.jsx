import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import * as theme from '../../../utils/theme';
import moment from 'moment';
import NumberInput from './NumberInput';

const StyledContainer = styled.form`
  /* height: 14rem; */
  width: 100%;
  background-color: white;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  bottom: 0;


  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);

  }

  @media only screen and (max-width: 620px) {
    grid-template-columns: 1fr;
    position: relative;

  }
`

const ItemTitle = styled.label`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: 2rem;
`

const StyledInput = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.6rem;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  padding-left: 1rem;
  width: 100%;
`
  
const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 3.5rem;
`

const SubmitButton = styled.button`
  background-color: ${theme.colors.primary};
  cursor: pointer;
  font-weight: 600;
  color: white;
  font-size: 20px;
  min-height: 100px;
  border: none;

  :hover {
    background-color: ${theme.colorsHover.primary}
  }
`


class FindRoom extends Component {
  state = {
    checkIn: moment().format("YYYY-MM-DD"),
    checkOut: moment().add(1, 'days').format("YYYY-MM-DD"),
    adults: 0,
    childs: 0,
    allIncusive: false,
  }

  sumbitForm = (e) => {
    e.preventDefault();

    //fake api call
    this.props.history.push('rooms')
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    if((name === 'adults' || name === 'childs') && value < 0) {
      this.setState({
        [name]: 0
      })
    } else {
      this.setState({
        [name]: value
      })
    }
    
    console.log(name, value);
  }

  stepUp = (e,name) => {
    e.preventDefault();
    this.setState(prevState => {
      return {
        [name]: parseInt(prevState[name], 10) + 1,
      }
    })
  }
  
  stepDown = (e,name) => {
    e.preventDefault();
    if(this.state[name] > 0) {
      this.setState(prevState => {
        return {
          [name]: parseInt(prevState[name], 10) - 1,
        }
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <StyledContainer>
        <Item>
          <ItemTitle htmlFor="checkIn">Check in</ItemTitle>
          <StyledInput type="date" id="checkIn" value={this.state.checkIn} name="checkIn" onChange={(e)=>this.handleChange(e)}></StyledInput>
        </Item>
        <Item>
          <ItemTitle htmlFor="checkOut">Check out</ItemTitle>
          <StyledInput type="date" id="checkOut" value={this.state.checkOut} name="checkOut" onChange={(e)=>this.handleChange(e)}></StyledInput>
        </Item>
        <Item>
          <ItemTitle htmlFor="adults">Adults</ItemTitle>
          <NumberInput 
            fieldName={"adults"}
            currentVal={this.state.adults}
            onPlusClick={this.stepUp}
            onChangeEvent={this.handleChange}
            onMinusClick={this.stepDown}
            />
        </Item>
        <Item>
          <ItemTitle htmlFor="childs">Childs</ItemTitle>
          <NumberInput 
            fieldName={'childs'}
            onChangeEvent={this.handleChange}
            currentVal={this.state.childs}
            onPlusClick={this.stepUp}
            onMinusClick={this.stepDown}
            />
        </Item>
        <Item>
          <ItemTitle htmlFor="childs">Childs</ItemTitle>
          <NumberInput 
            fieldName={"childs"}
            onChangeEvent={this.handleChange}
            currentVal={this.state.childs} 
            onPlusClick={(e) => this.stepUp(e, "childs")}
            onMinusClick={(e) => this.stepDown(e, "childs")}
            />
        </Item>
        <SubmitButton type="submit" onClick={this.sumbitForm}>Submit</SubmitButton>
      </StyledContainer>
      )
  }
}


export default withRouter(FindRoom);
