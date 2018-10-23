import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Carousel, CarouselImage, CarouselImagesContainer, CarouselPanel, CarouselTitle, CarouselSubTitle } from './Carousel';
import styled from 'styled-components';
import * as theme from '../../utils/theme'
import FeatureIcon from './FeatureIcon';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(auto, 960px) minmax(0, auto);
`

const MainContent = styled.div`
  grid-column: 2 / span 1;
  background-color: white;
  text-align: center;
`

const HeadingBig = styled.h3`
  color: ${theme.colors.black};
  font-size: 42px;
  padding-top: 10vh;
  margin-bottom: 3vh;
`
const StyledHr = styled.hr`
  color: ${theme.colors.black};
  margin: 0 auto;
  margin-bottom: 6vh;
`

const Paragraph = styled.p`
  color: ${theme.colors.black};
  font-size: 20px;
  text-align: justify;
  margin: 0 auto;

  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }
`

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 6vh;

  @media only screen and (max-width: 600px) {
    justify-content: space-between;
  }
`

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(auto, 80%) minmax(0, auto);
`
const Text = styled.div`
  grid-column: 2 / span 1;
`



class RoomView extends Component {
  state = {
    //fake data
    data: {}
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
      this.setState({data: FAKE_JSON});
    }, 1000)
  }
  
  renderImages = () => {
    return this.state.data.images.map( image => <CarouselImage img={image} key={image}/>)
  }

  renderFeatures = () => {
    return this.state.data.features.map( feature => <FeatureIcon description={feature.description} key={feature.description} bigText={feature.bigText} />)
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
              <Content>
                <Text>
                  <HeadingBig>{this.state.data.name}</HeadingBig>
                  <StyledHr/>
                  <Paragraph>{this.state.data.longDesc}</Paragraph>
                  <HeadingBig>{this.state.data.name}</HeadingBig>
                  <FeaturesContainer>
                    {this.renderFeatures()}
                  </FeaturesContainer>
                </Text>
              </Content>
            </MainContent>
        }
      </Container>
    )
  }
}

export default withRouter(RoomView)



const FAKE_JSON = {
  name: "Apartment Blue",
  desc: "Phased contextually-based model",
  longDesc: "Lorem ipsum dolor sit amet, fabellas facilisi assentior mea in, prompta menandri" +
      " iracundia pri eu. Eum ea volumus eligendi, te magna habeo duo. Cum homero volup" +
      "tatum te, esse consul tractatos ut nam. In nam rebum simul aliquando, ius et nul" +
      "la exerci vocibus, autem signiferumque pri et. An rebum minim electram vim, qui " +
      "ex graece sapientem. Nibh constituam cu mei. Nostro scaevola ne per, quis zril n" +
      "ostro ius ad, mutat admodum facilisi an qui. Quo ad sonet definitionem, sea eu d" +
      "ictas offendit abhorreant, noster facilis definitiones no pri. Quem fierent ea n" +
      "ec, eu meliore sententiae est. Quot eros molestie ex mea, has eu libris scribent" +
      "ur dissentiunt, te vitae graece eam. Vix te omnes mollis audiam, patrioque susci" +
      "piantur ea vis.",
  images: ['https://i.imgur.com/G2WYQoC.jpg', 'https://i.imgur.com/edofhYg.jpg', 'https://i.imgur.com/7R7KW10.jpg'],
  features: [
    {
      description: 'Cheaper',
      bigText: '15%'
    },
    {
      description: 'Faster',
      bigText: '2x'
    },
    {
      description: 'Better', 
      bigText: '8x'
    },
  ]
}