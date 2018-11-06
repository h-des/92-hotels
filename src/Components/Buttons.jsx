import React from 'react'
import styled, { css } from 'styled-components';
// import * as theme from './../utils/theme';
import { Link } from 'react-router-dom';


const buttonStyles = css`
  background-color: ${props => props.outline ? 'transparent' : props.theme.colors[props.color] };
  color: ${props => props.outline ? props.theme.colors[props.color] : 'white' };
  border-radius: 4px;
  display: inline-block;
  border: solid 1px;
  border-color: ${props => props.theme.colors[props.color] };
  cursor: ${props => props.color === 'disabled' ? undefined : `pointer`};
  padding: ${props => 
    props.large ? '0.8rem 1.6rem' : props.small ? '0.4rem 0.8rem' : '.6rem 1.2rem'};
  transition: all 0.2s;
  font-weight: 600;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: ${props => 
    props.large ? '2.4rem' : props.small ? '1.6rem' : '2rem'};
  margin: ${props => props.margin || '0px'};


  &:hover {
    background-color: ${props => props.outline ? 'transparent' : props.theme.colorsHover[props.color] };
    transform: ${props => props.disabled ? undefined : `translateY(-2px) scale(1.05)`};
    box-shadow: ${props => props.disabled ? undefined : ` 2px 14px 37px 0px rgba(0,0,0,0.31)`};
  }
`

const StyledButton = styled.button`
  ${buttonStyles}
`

const StyledLink = styled(Link)`
  ${buttonStyles}
  text-decoration: none;
`


export const Button = (props) =>  {
  return <StyledButton {...props} >{props.children}</StyledButton>
};

export const LinkButton = (props) =>  {
  return <StyledLink {...props} >{props.children}</StyledLink>
};
