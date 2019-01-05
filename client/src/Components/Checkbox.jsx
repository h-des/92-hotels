import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  padding-right: 10px;
  line-height: 27px;
  margin: ${props => props.margin && props.margin};
`;

const Input = styled.input`
  position: absolute;
  visibility: hidden;
`;

const Span = styled.span`
  &:after {
    position: absolute;
    right: -25px;
    content: '';
    height: 25px;
    width: 25px;
    display: inline-block;
    border: 2px solid #aaa;
    border-radius: 3px;
    background-color: ${props =>
      props.checked ? props.theme.colors.primary : `transparent`};
  }
`;

const Checkbox = ({ name, onChange, checked, children, margin }) => (
  <Label htmlFor={name} margin={margin}>
    <Span checked={checked} />
    <Input
      name={name}
      id={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
    {children}
  </Label>
);

Checkbox.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  margin: PropTypes.string
};

export default Checkbox;
