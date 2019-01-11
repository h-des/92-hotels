import React, { Component } from 'react';
import { Spinner } from '../../Components/Spinner';
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

import Availability from './Availability';
import constants from '../../utils/constants';

const Container = styled.div`
  display: grid;
  padding-top: 6rem;
  grid-template-columns: minmax(0, auto) minmax(auto, 96rem) minmax(0, auto);
`;

const MainContent = styled.div`
  grid-column: 2 / span 1;
  text-align: center;
`;

const HeadingBig = styled.h3`
  color: ${props => props.theme.colors.black};
  font-size: 4.2rem;
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
  font-size: 2rem;
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

class Hotel extends Component {
  renderImages = () => {
    return this.props.data.interiorPhotos.map(image => (
      <CarouselImage img={image} key={image} />
    ));
  };

  // renderFeatures = () => {
  //   return this.props.roomData.features.map(feature => (
  //     <FeatureIcon
  //       description={feature.description}
  //       key={feature.description}
  //       bigText={feature.bigText}
  //     />
  //   ));
  // };

  render() {
    const { status, data } = this.props;
    switch (status) {
      case constants.LOADING:
        return (
          <Container>
            <MainContent>
              <Spinner />
            </MainContent>
          </Container>
        );
      case constants.SUCCESS:
        return (
          <Container>
            <MainContent>
              <Carousel>
                <CarouselImagesContainer>
                  {this.renderImages()}
                </CarouselImagesContainer>
                <CarouselPanel>
                  <CarouselTitle>{data.name}</CarouselTitle>
                  <CarouselSubTitle>{data.city}</CarouselSubTitle>
                </CarouselPanel>
              </Carousel>
              <ContentContainer>
                <Content>
                  <HeadingBig>{data.name}</HeadingBig>
                  <StyledHr />
                  <Paragraph>{data.description}</Paragraph>
                  <HeadingBig>Book</HeadingBig>
                  <StyledHr />
                  <Availability
                    resetAvailability={this.props.resetAvailability}
                    status={this.props.availability}
                    data={data}
                  />
                  <HeadingBig>Reviews</HeadingBig>
                  <StyledHr />
                  <Comments id={data._id} />
                </Content>
              </ContentContainer>
            </MainContent>
          </Container>
        );
      default:
        return null;
    }
  }
}

export default Hotel;
