import React, {Component} from 'react'
import styled from 'styled-components';
import * as theme from './../../utils/theme';
import bedIcon from './../../images/bed.svg';
import dollarIcon from './../../images/dollar.svg';
import userIcon from './../../images/user.svg';
import heartIcon from './../../images/heart.svg';

const Card = styled.div `
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  // max-width: 450px;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 11px 26px 0px rgba(0,0,0,0.09);
  margin-bottom: 7.5rem;
  background-color: white;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  `

const CardImage = styled.div`
  width: 75%;
  height: 100%;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: 400px 400px;
  transition: all .3s;

  :hover {
    background-size: 600px 600px;
  }

  @media only screen and (max-width: 600px) {
    min-height: 30vh;
    width: 100%;
  }
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const CardBody = styled.div `
  display: flex;
  flex-direction: column;
  padding: 7rem;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;

  @media only screen and (max-width: 860px) {
    padding: 5rem;
  }

  @media only screen and (max-width: 680px) {
    padding: 5rem;
  }
 
  @media only screen and (max-width: 480px) {
    padding: 3rem;
  }

`

const CardTitle = styled.h3 `
  font-size: 2.4rem;
  font-weight: 700;
  color: ${theme.colors.black};
  margin-bottom: 1.5rem;
  line-height: 1;

  @media only screen and (max-width: 480px) {
    font-size: 1.8rem;
  }
  
`
const CardDesc = styled.p `
  font-size: 2rem;
  text-transform: capitalize;
  font-weight: 600;
  color: ${theme.colors.grey};
  margin-bottom: 5rem;

  @media only screen and (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 3rem;
  }
`

const CardDetails = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Detail = styled.p `
  color: ${theme.colors.primary};
  font-size: 2.8rem;
  font-weight: 400;
`

const Separator = styled.span`
  display: inline-block;
  // height: 20px;
  width: 2px;
  background-color: ${theme.colors.primary};
`

const Icon = styled.img`
  display: inline;
  height: 2rem;
  margin-bottom: -5px;
  margin-left: 5px;
`


const LoveButton = styled.button ` 
  height: 75px;
  width: 75px;
  border-radius: 50%;
  box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.1);
  position: absolute;
  bottom: 5rem;
  background-color: white;
  left: -4rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;


  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.2);
  }

  @media only screen and (max-width: 600px) {
    top: -3.5rem;
    right: 3rem;
    bottom: auto;
    left: auto;
    height: 55px;
    width: 55px;
  }
` 

export default class RoomCard extends Component {



  likeRoom = (id) => {
    console.log(`You liked room ${id}`)
  }
  
  render() {
    const { id, title, url } = this.props.data;
    const beds = Math.floor(Math.random() * 4) + 1;
    return (
      <Card>
        <CardImage image={url}/>
        <CardBody>
          <LoveButton onClick={() => this.likeRoom(id)}><Icon src={heartIcon}/></LoveButton>
          <FlexColumn>
            <CardTitle>Royal Appartment</CardTitle>
            <CardDesc>{title.slice(0, 80)}</CardDesc>
          </FlexColumn>
          <CardDetails>
            <Detail>
              200
              <Icon src={dollarIcon} alt="" />
            </Detail>
            <Separator />
            <Detail >
              {beds} 
              <Icon src={bedIcon} alt="" />
            </Detail>
            <Separator />
            <Detail>
              {beds * 2 - 1} 
              <Icon src={userIcon} alt="" />
            </Detail>
          </CardDetails>
        </CardBody>
      </Card>
    )
  }
}


