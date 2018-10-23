import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Carousel, CarouselImage, CarouselImagesContainer, CarouselPanel, CarouselTitle, CarouselSubTitle } from './Carousel';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(auto, 960px) minmax(0, auto);
`

const MainContent = styled.div`
  grid-column: 2 / span 1;
  background-color: white;
`

class RoomView extends Component {
  state = {
    //fake data
    data: {}
  }

  componentWillMount() {
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    //fake api call to download room data goes here
    // try {
    //  const response = await fetch(`https://api.hotelblack92/roomData/${id}`);
    //  const json = await response.json();
    // this.setState({ data: json });
    // } catch (error) {
    //  console.log(error);
    // }
    setTimeout(() => {
      const json = {
        name: "Apartment Blue",
        desc: "Phased contextually-based model",
        images: [
          'https://i.imgur.com/G2WYQoC.jpg',
          'https://i.imgur.com/edofhYg.jpg',
          'https://i.imgur.com/7R7KW10.jpg'
        ]
      }
      this.setState({data: json});
    }, 1000)
  }
  
  renderImages = () => {
    return this.state.data.images.map( image => <CarouselImage img={image} key={image}/>)
  }

  render() {
    const len = Object.keys(this.state.data).length;
    return (
      <Container>
        {!len 
          ? <MainContent> LOADING </MainContent> // loading spinner
          : <MainContent>
              <Carousel>
                <CarouselImagesContainer>
                  {this.renderImages()}
                </CarouselImagesContainer>
                <CarouselPanel>
                  <CarouselTitle>{this.state.data.name}</CarouselTitle>
                  <CarouselSubTitle>{this.state.data.desc}</CarouselSubTitle>
                </CarouselPanel>
              </Carousel>
            </MainContent>
        }
      </Container>
    )
  }
}

export default withRouter(RoomView)