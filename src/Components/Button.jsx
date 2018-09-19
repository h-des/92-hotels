import React, { Component } from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.outline ? 'transparent' : (props.primary ? '#5862EF' : '#F50E5C')};
  color: ${props => props.outline ?  (props.primary ? '#5862EF' : '#F50E5C') : 'white' };
  border-radius: 4px;
  border: solid 1px;
  border-color: ${props => (props.primary ? '#5862EF' : '#F50E5C')};
  font-family: 'Source Sans Pro', sans-serif;
  // font-size: 2rem;
  padding: ${props => 
    props.large ? '1.5rem 2.5rem' : props.small ? '0.8rem 1.4rem' : '1rem 2rem'};
  font-weight: 600;
  width: 0%;
  min-width: ${props => 
    props.large ? '12rem' : props.small ? '8rem' : '10rem'};
  transition: all 0.2s;
  font-size: ${props => 
    props.large ? '3rem' : props.small ? '1.6rem' : '2rem'};
  


  &:hover {
    background-color: ${props => props.outline ? 'transparent' : (props.primary ? '#626BEF' : '#FC3679')};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 2px 14px 37px 0px rgba(0,0,0,0.31);
  }
`


export default (props) =>  {
  return <StyledButton {...props} >{props.children}</StyledButton>
};
