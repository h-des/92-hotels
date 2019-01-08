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
import * as actions from '../../actions';

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
  saveUser = data => {
    this.props.editUser({ ...this.props.user.data, ...data });
  };

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
                <UserData editUser={this.saveUser} user={this.props.user} />
              </Tab>
              <Tab>
                <Address editUser={this.saveUser} user={this.props.user} />
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
  actions
)(Profile);
