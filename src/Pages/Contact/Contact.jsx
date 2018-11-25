import React, { Component } from 'react';
import {
  Tabs,
  TabsPanel,
  TabTitle,
  TabsContainer,
  Tab
} from '../../Components/Tabs';
import styled from 'styled-components';
import phoneIcon from '../../images/phone.svg';
import pinIcon from '../../images/pin.svg';
import socialIcon from '../../images/social.svg';
import mailIcon from '../../images/mail.svg';
import fbIcon from '../../images/facebook.svg';
import youtubeIcon from '../../images/youtube.svg';
import instagramIcon from '../../images/instagram.svg';
import twitterIcon from '../../images/twitter.svg';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { Button } from '../../Components/Buttons';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(auto, 960px) minmax(0, auto);
`;

const MainContent = styled.div`
  grid-column: 2 / span 1;
  padding-top: 80px;
  position: relative;
  width: 80%;
  margin: 0 auto;

  @media only screen and (max-width: 425px) {
    width: 98%;
  }
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 16px;
  margin-left: 10px;
  color: rgb(150, 150, 150);
`;

const P = styled.p`
  font-weight: 600;
  color: rgba(40, 40, 40);
  font-size: 18px;
`;

const Mail = styled.a`
  font-weight: 600;
  color: rgba(40, 40, 40);
  font-size: 18px;
`;

const NoDecorationLink = styled(Link)`
  text-decoration: none;
  padding-right: 20px;
`;

const Icon = styled.img`
  width: 25px;
  filter: brightness(0);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const MapContainer = styled.div`
  height: 50vh;
`;

export default class Contact extends Component {
  render() {
    return (
      <Container>
        <MainContent>
          <Tabs>
            <TabsPanel>
              <TabTitle>Info</TabTitle>
              <TabTitle>Address</TabTitle>
            </TabsPanel>
            <TabsContainer>
              <Tab>info</Tab>
              <Tab>address</Tab>
            </TabsContainer>
          </Tabs>
        </MainContent>
      </Container>
    );
  }
}
