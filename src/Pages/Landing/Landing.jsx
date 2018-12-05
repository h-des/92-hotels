import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import backgroundPhoto from '../../images/landing.JPG';
import CardDetails from '../Checkout/CardDetails';
import { LinkButton } from '../../Components/Buttons';

const StyledLanding = styled.div`
  background: url(${backgroundPhoto});
  height: 100vh;
`;

export default class Landing extends Component {
  render() {
    return <StyledLanding />;
  }
}
