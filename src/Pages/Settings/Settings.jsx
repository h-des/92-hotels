import React, { Component } from 'react';
import {
  Tabs,
  TabsPanel,
  TabTitle,
  TabsContainer,
  Tab
} from '../../Components/Tabs';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import Address from './Address';
import History from './History';

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

export default class Contact extends Component {
  render() {
    return (
      <Container>
        <MainContent>
          <Tabs>
            <TabsPanel>
              <TabTitle>Info</TabTitle>
              <TabTitle>Address</TabTitle>
              <TabTitle>History</TabTitle>
            </TabsPanel>
            <TabsContainer>
              <Tab>
                <Profile />
              </Tab>
              <Tab>
                <Address />
              </Tab>
              <Tab>
                <History />
              </Tab>
            </TabsContainer>
          </Tabs>
        </MainContent>
      </Container>
    );
  }
}
