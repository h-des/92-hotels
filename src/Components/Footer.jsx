import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import fbIcon from '../images/facebook.svg'
import youtubeIcon from '../images/youtube.svg'
import instagramIcon from '../images/instagram.svg'
import twitterIcon from '../images/twitter.svg'

const StyledFooter = styled.footer`
  width: 100%;
  background-color: black;
  display: grid;
  color: white;
  font-size: 16px;
  grid-template-columns: minmax(20px, auto) minmax(auto, 960px) minmax(20px, auto);
`

const SocialIcon = styled.img`
  height: 30px;
`

const Container = styled.div`
  grid-column: 2 / span 1;
  padding-top: 10vh;
  width: 100%;
  padding-bottom: 10vh;
  text-align: center;
`

const SocialContainer = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  max-width: 300px;
`
const UpperContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  

  @media only screen and (max-width: 650px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;

  @media only screen and (max-width: 650px) {
    width: 100%;
    justify-content: space-around;
  }

  @media only screen and (max-width: 425px) {
    flex-direction: column-reverse;
  }
`
const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  @media only screen and (max-width: 425px) {
    text-align: center;
    margin-bottom: 30px;
  }
`
const ContactContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  max-width: 200px;

  @media only screen and (max-width: 425px) {
    text-align: center;
    margin: 0 auto;
    margin-bottom: 30px;
  }
`
const ActionContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  text-align: left;

  @media only screen and (max-width: 650px) {
    width: 80%;
    margin-bottom: 20px;
  } 
`
const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 650px) {
    width: 80%;
    margin: 0 auto;
  } 

   @media only screen and (max-width: 425px) {
    flex-direction: column;
    align-items: center;
  }
`
const Logo = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  :hover {
    color: #ddd;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
  :hover {
    color: #ddd;
  }
`
const StyledInput = styled.input`
  height: 30px;
  font-weight: 700;
  font-family: 'Source Sans Pro', sans-serif;
  color: #333;
  padding: 10px 20px;
  width: 80%;
`

const StyledButton = styled.button`
  width: 20%;
  height: 30px;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  font-weight: 900;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.colorsHover.primary};
  }
`

const StyledUl = styled.ul`
  list-style: none;
`

export default class Footer extends Component {
  render() {
    return <StyledFooter>
      <Container>
        <UpperContainer>
          <InfoContainer>
            <LinksContainer>
              <h4>Map</h4>
              <StyledUl>
                <li>
                  <StyledLink to="/Rooms">Rooms</StyledLink>
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
                574 Cronin Cliffs, Edenton Cambridgeshire, 68575-0942
                United Kingdom
                </p>
            </ContactContainer>
          </InfoContainer>
          <ActionContainer>
            <label htmlFor="subscribe">Subscribe!</label>
            <div>
              <StyledInput type="email" id="subscribe" />
              <StyledButton type="submit">GO</StyledButton>
              <p>
                Sign up for a newsletter to Dolor nostrum saepe ea sequi
                quisquam.
                </p>
            </div>
          </ActionContainer>
        </UpperContainer>
        <BottomContainer>
          <SocialContainer>
            <li>
              <StyledLink to="/">
                <SocialIcon src={ fbIcon } />
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/">
                <SocialIcon src={ youtubeIcon } />
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/">
                <SocialIcon src={ instagramIcon } />
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/">
                <SocialIcon src={ twitterIcon } />
              </StyledLink>
            </li>
          </SocialContainer>
          <Logo to="/">Hotel Black 92</Logo>
        </BottomContainer>
      </Container>
    </StyledFooter>
  }
}
