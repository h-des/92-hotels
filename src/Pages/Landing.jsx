import React, { Component } from 'react'
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import backgroundPhoto from './../images/landing.JPG';
import FindRoom from './../Components/FindRoom/FindRoom';
import Button from './../Components/Button';

const StyledLanding = styled.div`
  background: url(${backgroundPhoto});
  height: 100vh;
`


const StyledH1 = styled.h1`
  font-size: 12rem;
  font-weight: 600;
  color: white;
`

const StyledH3 = styled.h3`
  font-size: 3.6rem;
  color: white;
  opacity: 0.9;
  font-weight: 600;
`

const Header = styled(Cell)`
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: center;
`




export default class Landing extends Component {
  render() {
    return (
      <StyledLanding>
        <Grid columns={"minmax(20px,auto) minmax(auto,1600px) minmax(20px,auto)"}>
          <Cell/>
          <Header>
            <StyledH1>Hotel Black 92</StyledH1>
            <StyledH3>Aut tempore dolorem labore quis quia officiis aut ex cumque.</StyledH3>
            <Button primary >Test</Button> 
            <Button secondary >Test</Button> 
            <Button secondary outline >Test</Button> 
            <Button secondary outline small>Test</Button> 
            <Button secondary outline large>Test</Button> 
          </Header>
          <Cell/>
        </Grid>
        <FindRoom />
      </StyledLanding>
      )
  }
}
