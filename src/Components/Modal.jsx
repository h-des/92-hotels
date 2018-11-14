import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import closeIcon from '../images/close.svg';

const modalContainer = document.getElementById('modal-container');

const StyledModal = styled.div`
  position: fixed;
  z-index: 8000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  text-align: center;
`;

const StyledCloseButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #f6f6f6;
    border-radius: 50%;
  }
`;

const CloseIcon = styled.img`
  height: 50px;
  width: 50px;
`;

export default class Modal extends Component {
  element = document.createElement('div');

  componentDidMount() {
    modalContainer.appendChild(this.element);
  }
  componentWillUnmount() {
    modalContainer.removeChild(this.element);
  }

  render() {
    return ReactDOM.createPortal(
      <StyledModal>
        <StyledCloseButton onClick={this.props.close}>
          <CloseIcon src={closeIcon} />
        </StyledCloseButton>
        {this.props.children}
      </StyledModal>,
      this.element
    );
  }
}
