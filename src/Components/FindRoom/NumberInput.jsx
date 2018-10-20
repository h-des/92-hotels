import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import * as theme from './../../utils/theme'

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
  color: ${theme.colors.primary};
  font-weight: 700;
  border: none;
  font-size: 18px;
  cursor: pointer

  :hover {
    color: ${theme.colorsHover.primary}
  }
`

const NumberInput = ({defaultVal, currentVal, onPlusClick, onMinusClick}) => {
  return (
    <StyledDiv>
      <StyledButton onClick={onMinusClick}>-</StyledButton>
      <StyledInput defaultValue={defaultVal} value={currentVal}></StyledInput>
      <StyledButton onClick={onPlusClick}>+</StyledButton>
    </StyledDiv>
  )
}

NumberInput.propTypes = {
  onPlusClick: PropTypes.func,
  onMinusClick: PropTypes.func,
  defaultVal: PropTypes.number,
  currentVal: PropTypes.number
}

export default NumberInput

