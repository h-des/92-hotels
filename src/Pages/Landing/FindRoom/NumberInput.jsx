import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  display: flex;
  flex: 1 1 0;
`

const StyledInput = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.6rem;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  padding-left: 1rem;
  width: 100%;
  height: 22px;
`

const StyledButton = styled.button`
  width: 20px;
  height: 20px;
  margin: 0 3px;
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
  border: none;
  font-size: 18px;
  cursor: pointer

  :hover {
    color: ${props => props.theme.colorsHover.primary}
  }
`

const NumberInput = ({defaultVal, currentVal, onPlusClick, onMinusClick, fieldName, onChangeEvent}) => {
  return (
    <StyledDiv>
      <StyledButton onClick={e => onMinusClick(e, fieldName)}>-</StyledButton>
      <StyledInput name={fieldName} min={0} onChange={onChangeEvent} value={currentVal}></StyledInput>
      <StyledButton onClick={e => onPlusClick(e, fieldName)}>+</StyledButton>
    </StyledDiv>
  )
}

NumberInput.propTypes = {
  onChangeEvent: PropTypes.func,
  onPlusClick: PropTypes.func,
  onMinusClick: PropTypes.func,
  currentVal: PropTypes.number,
  fieldName: PropTypes.string
}

export default NumberInput

