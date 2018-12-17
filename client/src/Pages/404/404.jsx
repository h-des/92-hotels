import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-items: center;

  @media only screen and (max-width: 600px) {
    height: 60rem;
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
`;

const Error = styled.p`
  font-size: 3rem;
  text-decoration: uppercase;
  color: ${props => props.theme.colors.secondary};
`;

const Heading = styled.h2`
  font-size: 5rem;
  color: ${props => props.theme.colors.black};
  font-weight: 700;
`;
const Text = styled.p`
  font-size: 3rem;
`;

const StyledLink = styled(Link)``;

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <Container>
          <Inner>
            <Error>Error 404</Error>
            <Heading>Ooops, something went wrong but...</Heading>
            <Text>
              You can{' '}
              <StyledLink to="/rooms">
                find yourself a nice room here
              </StyledLink>
            </Text>
          </Inner>
        </Container>
      </div>
    );
  }
}
