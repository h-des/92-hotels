import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
  font-size: 1.4rem;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  color: ${props => props.theme.colors.black};
  padding: 0.9rem 2rem;
  border: 2px solid transparent;
  width: 100%;
  outline: none;
  border-radius: 3px;
  background-color: #f4f5f7;
  margin-bottom: ${props =>
    props.marginBottom ? props.marginBottom : `2.5rem`};

  &:focus {
    background-color: transparent;
    border: 2px solid #4c9aff;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex: 1 1 0;
`;

const StyledButton = styled.button`
  width: 20px;
  height: 20px;
  margin: 0 3px;
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
  border: none;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colorsHover.primary};
  }
`;

const NumberInput = ({
  currentVal,
  onPlusClick,
  onMinusClick,
  fieldName,
  onChangeEvent
}) => {
  return (
    <StyledDiv>
      <StyledButton onClick={e => onMinusClick(e, fieldName)}>-</StyledButton>
      <Input
        name={fieldName}
        id={fieldName}
        min={0}
        onChange={onChangeEvent}
        value={currentVal}
        marginBottom="0.5rem"
      />
      <StyledButton onClick={e => onPlusClick(e, fieldName)}>+</StyledButton>
    </StyledDiv>
  );
};

NumberInput.propTypes = {
  onChangeEvent: PropTypes.func,
  onPlusClick: PropTypes.func,
  onMinusClick: PropTypes.func,
  currentVal: PropTypes.number,
  fieldName: PropTypes.string
};

export { Input, NumberInput };
