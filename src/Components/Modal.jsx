import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const modalContainer = document.getElementById('modal-container');
const root = document.getElementById('root');

const StyledModal = styled.div`
  position: fixed;
  z-index: 8000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 80rem;
  max-width: 90%;
  background-color: white;
  border-radius: 8px;
  display: block;
  box-shadow: 0 30px 70px 0 rgba(0,0,0,0.4);
`


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
        {this.props.children}
      </StyledModal>,
      this.element,    
    )
  }
}
