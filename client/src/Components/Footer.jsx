import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import fbIcon from '../images/facebook.svg';
import youtubeIcon from '../images/youtube.svg';
import instagramIcon from '../images/instagram.svg';
import twitterIcon from '../images/twitter.svg';

const StyledFooter = styled.footer`
  width: 100%;
  background-color: black;
  display: grid;
  color: white;
  font-size: 1.6rem;
  grid-template-columns: minmax(2rem, auto) minmax(auto, 96rem) minmax(
      20px,
      auto
    );
`;

export const SocialIcon = styled.img`
  height: 30px;
  margin: 0 1rem;
`;

const Container = styled.div`
  grid-column: 2 / span 1;
  padding-top: 10vh;
  width: 100%;
  padding-bottom: 10vh;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media only screen and (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SocialIconsContainer = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  max-width: 30rem;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;

  @media only screen and (max-width: 650px) {
    width: 100%;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  @media only screen and (max-width: 425px) {
    flex-direction: column;
  }
`;
const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  @media only screen and (max-width: 425px) {
    text-align: center;
    margin-bottom: 30px;
  }
`;
const ContactContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  max-width: 20rem;

  @media only screen and (max-width: 425px) {
    text-align: center;
    margin: 0 auto;
    margin-bottom: 30px;
  }
`;
const Logo = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  :hover {
    color: #ddd;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
  :hover {
    color: #ddd;
  }
`;
export const StyledButton = styled.button`
  width: 20%;
  height: 3rem;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  font-weight: 900;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.colorsHover.primary};
  }
`;

const StyledUl = styled.ul`
  list-style: none;
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <Container>
          <InfoContainer>
            <LinksContainer>
              <h4>Map</h4>
              <StyledUl>
                <li>
                  <StyledLink to="/Hotels">Hotels</StyledLink>
                </li>
                <li>
                  <StyledLink to="/About">About</StyledLink>
                </li>
                <li>
                  <StyledLink to="/Contact">Contact</StyledLink>
                </li>
              </StyledUl>
            </LinksContainer>
            <ContactContainer>
              <h4>Contact</h4>
              <p>Hotel Black 92</p>
              <p>
                574 Cronin Cliffs, Edenton Cambridgeshire, 68575-0942 United
                Kingdom
              </p>
            </ContactContainer>
          </InfoContainer>
          <SocialContainer>
            <SocialIconsContainer>
              <li>
                <StyledLink to="/">
                  <SocialIcon src={fbIcon} />
                </StyledLink>
              </li>
              <li>
                <StyledLink to="/">
                  <SocialIcon src={youtubeIcon} />
                </StyledLink>
              </li>
              <li>
                <StyledLink to="/">
                  <SocialIcon src={instagramIcon} />
                </StyledLink>
              </li>
              <li>
                <StyledLink to="/">
                  <SocialIcon src={twitterIcon} />
                </StyledLink>
              </li>
            </SocialIconsContainer>
            <Logo to="/">Hotel Black 92</Logo>
          </SocialContainer>
        </Container>
      </StyledFooter>
    );
  }
}
