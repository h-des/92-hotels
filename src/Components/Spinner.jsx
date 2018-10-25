import React from 'react';
import styled, { keyframes } from 'styled-components';

//css by https://loading.io/css/

const spinnerKeyframes = keyframes`
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`

const StyledSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  padding-top: 30vh;
  padding-bottom: 30vh;

  :after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 6px;
    box-sizing: border-box;
    border: 26px solid #fff;
    border-color: #000 transparent #000 transparent;
    animation: ${spinnerKeyframes} 1.2s infinite;
  }
`


export default StyledSpinner;