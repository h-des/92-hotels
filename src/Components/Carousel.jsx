import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components';

const Container = styled.div`
  position: relative;
`
const fadeIn = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const AnimatedImage = styled.div`
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOut : fadeIn} 1s ease-out;
  transition: visibility 1s linear;
  height: 50vh;
  width: 100%;
  background-image: linear-gradient(to top, black 0%, transparent 30%), url(${props => props.source});
  background-position: left;
  background-size: cover;
`

const InvisibleImage = styled.img`
  visibility: hidden;
  display: none;
`
const ButtonGroup = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  border-radius: 6px;
  border: 2px solid white;

  @media only screen and (max-width: 425px) {
    bottom: auto;
    right: 20px;
    top: 80px;
  }
`
const StyledButton = styled.button`
  height: 40px;
  width: 40px;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.1s;

  :hover {
    background-color: rgba(255,255,255, 0.3)
  }

  :active {
    background-color: rgba(255,255,255, 0.5)
  }
`
const Separator = styled.span`
  height: 40px;
  width: 2px;
  background-color: white;
`

export const CarouselTitle = styled.h2`
  position: absolute;
  bottom: 40px;
  left: 10px;
  left: 10px;
  font-size: 32px;
  font-weight: 600;
  color: white;
`

export const CarouselSubTitle = styled.p`
  position: absolute; 
  bottom: 20px;
  left: 10px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
`
//prefetch next carousel images 
const PrefetchImage = ({obj}) => (<InvisibleImage src={obj.props.img} />)


//Main Component
export class Carousel extends Component {
  state = {
    activeIndex: 0
  }

  nextIndex = () => {
    const len = this.props.children.length;
    this.setState(prevState => {
      return {
        activeIndex: (prevState.activeIndex + 1) % len
      }
    })
  }

  prevIndex = () => {
    const len = this.props.children.length;
    this.setState(prevState => {
      return {
        activeIndex: (prevState.activeIndex > 0) ? (prevState.activeIndex - 1) : (len - 1)
      }
    })
  }

  render() {
    const { children } = this.props;
    const { activeIndex } = this.state;
    const renderChildren = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        activeIndex,
        prevIndexClick: this.prevIndex,
        nextIndexClick: this.nextIndex
      })
    })
    return (
      <Container>
        {renderChildren}
      </Container>
    )
  }
}

export class CarouselPanel extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <ButtonGroup>
            <StyledButton onClick={this.props.prevIndexClick}>&larr;</StyledButton>
            <Separator/>
            <StyledButton onClick={this.props.nextIndexClick}>&rarr;</StyledButton>
        </ButtonGroup>
      </React.Fragment>
    )
  }
}

export class CarouselImagesContainer extends Component {
  render () {
    const { children, activeIndex } = this.props;
    const prefetchIndex = activeIndex < children.length - 1 ? activeIndex + 1 : 0;
    const renderChildren = React.Children.map(children, (child,index) => {
      return React.cloneElement(child, {
        isActive: activeIndex === index
      })
    })

    return (
      <React.Fragment>
        <PrefetchImage obj={children[prefetchIndex]} />
        {renderChildren[activeIndex]}
      </React.Fragment>
    )
  }
} 


export const CarouselImage = ({img, isActive}) => {
  return (<AnimatedImage source={img} out={!isActive} />)
}


