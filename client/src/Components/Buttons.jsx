import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyles = css`
  background-color: ${props =>
    props.outline ? 'transparent' : props.theme.colors[props.color]};
  color: ${props =>
    props.outline ? props.theme.colors[props.color] : 'white'};
  border-radius: 4px;
  display: inline-block;
  border: solid 1px;
  border-color: ${props => props.theme.colors[props.color]};
  cursor: ${props => (props.color === 'disabled' ? undefined : `pointer`)};
  padding: ${props =>
    props.large
      ? '0.8rem 1.6rem'
      : props.small
      ? '0.4rem 0.8rem'
      : '.6rem 1.2rem'};
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  min-height: 4rem;
  font-family: 'Nunito', sans-serif;
  font-size: ${props =>
    props.large ? '2.4rem' : props.small ? '1.6rem' : '2rem'};
  margin: ${props => props.margin || '0px'};

  &:hover {
    background-color: ${props =>
      props.outline ? 'transparent' : props.theme.colorsHover[props.color]};
    box-shadow: ${props =>
      props.disabled ? undefined : ` 0 8px 15px 0px rgba(0,0,0,0.31)`};
  }
`;

const Button = styled.button`
  ${buttonStyles}
`;

const LinkButton = styled(Link)`
  ${buttonStyles}
  text-decoration: none;
`;

export { Button, LinkButton };
