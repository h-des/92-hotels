import styled, { keyframes } from 'styled-components';
import React from 'react';

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
`;

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  padding-top: 30vh;
  padding-bottom: 30vh;

  :after {
    content: ' ';
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
`;

const skStretchdelay = keyframes`
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
`;

const SpinnerContainer = styled.div`
  margin: 0 auto;
  width: 50px;
  height: 30px;
  text-align: center;
  font-size: 8px;
`;

const Rect = styled.div`
  background-color: ${props => props.bgColor || 'white'};
  height: 100%;
  width: 6px;
  display: inline-block;
  margin: 0 2px;

  -webkit-animation: ${skStretchdelay} 1.2s infinite ease-in-out;
  animation: ${skStretchdelay} 1.2s infinite ease-in-out;
  -webkit-animation-delay: ${props => props.delay};
  animation-delay: ${props => props.delay};
`;

const SpinnerRectangles = ({ color }) => (
  <SpinnerContainer>
    <Rect delay="-1.2s" bgColor={color} />
    <Rect delay="-1.1s" bgColor={color} />
    <Rect delay="-1.0s" bgColor={color} />
    <Rect delay="-0.9s" bgColor={color} />
    <Rect delay="-0.8s" bgColor={color} />
  </SpinnerContainer>
);

export { Spinner, SpinnerRectangles };
