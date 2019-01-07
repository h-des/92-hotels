import React, { Component } from 'react';
import {
  Tabs,
  TabsPanel,
  TabTitle,
  TabsContainer,
  Tab
} from '../../Components/Tabs';
import styled from 'styled-components';
import UserData from './UserData';
import Address from './Address';
import Reviews from './Reviews';
import History from './History';
import { connect } from 'react-redux';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(auto, 96rem) minmax(0, auto);
`;

const MainContent = styled.div`
  grid-column: 2 / span 1;
  padding-top: 8rem;
  position: relative;
  width: 80%;
  margin: 0 auto;

  @media only screen and (max-width: 425px) {
    width: 98%;
  }
`;

class Profile extends Component {
  render() {
    return (
      <Container>
        <MainContent>
          <Tabs>
            <TabsPanel>
              <TabTitle>Info</TabTitle>
              <TabTitle>Address</TabTitle>
              <TabTitle>Reviews</TabTitle>
              <TabTitle>History</TabTitle>
            </TabsPanel>
            <TabsContainer>
              <Tab>
                <UserData user={this.props.user} />
              </Tab>
              <Tab>
                <Address user={this.props.user} />
              </Tab>
              <Tab>
                <Reviews user={this.props.user} />
              </Tab>
              <Tab>
                <History user={this.props.user} />
              </Tab>
            </TabsContainer>
          </Tabs>
        </MainContent>
      </Container>
    );
  }
}
const mapStateToProps = state => ({ user: state.user });

export default connect(
  mapStateToProps,
  null
)(Profile);
