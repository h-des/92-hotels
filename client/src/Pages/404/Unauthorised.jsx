import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '../../Components/Modal';
import AuthContainer from '../Auth/AuthContainer';
import { Button } from '../../Components/Buttons';

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

const Text = styled.p`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

export default class NotFound extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal
      };
    });
  };

  render() {
    return (
      <div>
        {this.state.showModal && (
          <Modal close={() => this.toggleModal()}>
            <AuthContainer close={() => this.toggleModal()} />
          </Modal>
        )}
        <Container>
          <Inner>
            <Text>You need to be logged in to see this page.</Text>
            <Button color="primary" onClick={this.toggleModal}>
              Login
            </Button>
          </Inner>
        </Container>
      </div>
    );
  }
}
