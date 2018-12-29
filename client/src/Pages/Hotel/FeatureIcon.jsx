import React from 'react'
import styled from 'styled-components';


const RoundedBorder = styled.div`
  border: 2px solid black;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
  height: 14vh;
  width:  14vh;
` 

const Desc = styled.p`
  font-size: 2vh;
`

const Title = styled.h4`
  font-size: 4vh;
  font-weight: 600;
`

export default ({description, bigText}) => {
  return (
    <RoundedBorder>
      <Title>{bigText}</Title>
      <Desc>{description}</Desc>
    </RoundedBorder>
  )  
}
