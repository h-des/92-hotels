import React, { Component } from 'react';
import Spinner from '../../Components/Spinner';
import Comments from './Comments';
import {
  Carousel,
  CarouselImage,
  CarouselImagesContainer,
  CarouselPanel,
  CarouselTitle,
  CarouselSubTitle
} from '../../Components/Carousel';
import styled from 'styled-components';
import FeatureIcon from './FeatureIcon';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(auto, 960px) minmax(0, auto);
`;

const MainContent = styled.div`
  grid-column: 2 / span 1;
  text-align: center;
`;

const HeadingBig = styled.h3`
  color: ${props => props.theme.colors.black};
  font-size: 42px;
  padding-top: 10vh;
  margin-bottom: 3vh;
`;
const StyledHr = styled.hr`
  color: ${props => props.theme.colors.black};
  margin: 0 auto;
  margin-bottom: 6vh;
`;

const Paragraph = styled.p`
  color: ${props => props.theme.colors.black};
  font-size: 20px;
  text-align: justify;
  margin: 0 auto;

  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 6vh;

  @media only screen and (max-width: 600px) {
    justify-content: space-between;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(auto, 80%) minmax(0, auto);
  background-color: white;
`;
const Content = styled.div`
  grid-column: 2 / span 1;
`;

class RoomView extends Component {
  renderImages = () => {
    return this.props.roomData.images.map(image => (
      <CarouselImage img={image} key={image} />
    ));
  };

  renderFeatures = () => {
    return this.props.roomData.features.map(feature => (
      <FeatureIcon
        description={feature.description}
        key={feature.description}
        bigText={feature.bigText}
      />
    ));
  };

  render() {
    const { roomData } = this.props;
    return (
      <Container>
        {!roomData ? (
          <MainContent>
            {' '}
            <Spinner />
          </MainContent> // loading spinner
        ) : (
          <MainContent>
            <Carousel>
              <CarouselImagesContainer>
                {this.renderImages()}
              </CarouselImagesContainer>
              <CarouselPanel>
                <CarouselTitle>{roomData.name}</CarouselTitle>
                <CarouselSubTitle>{roomData.desc}</CarouselSubTitle>
              </CarouselPanel>
            </Carousel>
            <ContentContainer>
              <Content>
                <HeadingBig>{roomData.name}</HeadingBig>
                <StyledHr />
                <Paragraph>{roomData.longDesc}</Paragraph>
                <HeadingBig>Features</HeadingBig>
                <StyledHr />
                <FeaturesContainer>{this.renderFeatures()}</FeaturesContainer>
                <HeadingBig>Comments</HeadingBig>
                <StyledHr />
                <Comments list={roomData.comments} />
              </Content>
            </ContentContainer>
          </MainContent>
        )}
      </Container>
    );
  }
}

export default RoomView;
