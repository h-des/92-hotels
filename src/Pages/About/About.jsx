import React, { Component } from 'react';
import styled from 'styled-components';
import image1 from './../../images/landing.JPG';

const Article = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(min-content, 96rem) minmax(
      0,
      1fr
    );
`;

const Text = styled.div`
  grid-column: 2 / span 1;
  background-color: white;
  height: 100%;
  display: block;
  padding-top: 2rem;
  padding-bottom: 10rem;
  margin: 0 auto;
  padding-left: 7rem;
  padding-right: 7rem;
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;

  @media only screen and (max-width: 600px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media only screen and (max-width: 425px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Title = styled.h2`
  font-size: 4rem;
  color: rgba(30, 30, 30);
  margin-bottom: 1rem;
`;

const Subtitle = styled.h3`
  font-size: 2.6rem;
  color: rgb(50, 50, 50);
  margin-bottom: 2rem;
`;

const Paragraph = styled.p`
  font-size: 2rem;
  text-align: justify;
`;

const ImageWide = styled.div`
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
  height: 30vh;
  width: 100%;
  grid-column: 1/-1;
`;
export default class About extends Component {
  render() {
    return (
      <div>
        <Article>
          <ImageWide image={image1} />
          <Text>
            <Title>Test</Title>
            <Subtitle>Longer Text</Subtitle>
            <Paragraph>
              Et est quidem a rerum. Harum assumenda modi eum eaque delectus
              asperiores ut. Dicta possimus aliquid ratione molestias omnis ad
              explicabo. Alias officiis numquam. Voluptas iste dicta rerum sed.
              Debitis ipsum nulla et tempore dolor sit facilis. Enim voluptas
              numquam culpa atque quae qui eaque velit. Vero sit delectus
              nostrum at animi harum sed. Neque id vitae. Distinctio laboriosam
              itaque explicabo perspiciatis laboriosam facere laborum et.
              Necessitatibus et nam animi sit quia impedit illum deserunt iusto.
              Asperiores non molestiae. Et illum atque qui doloremque aliquam
              quia vero dolorem qui. Libero quis magnam voluptate rerum eveniet
              quae voluptatem.
            </Paragraph>
          </Text>
          <ImageWide image={image1} />
          <Text>
            <Subtitle>Longer Text</Subtitle>
            <Paragraph>
              Et est quidem a rerum. Harum assumenda modi eum eaque delectus
              asperiores ut. Dicta possimus aliquid ratione molestias omnis ad
              explicabo. Alias officiis numquam. Voluptas iste dicta rerum sed.
              Debitis ipsum nulla et tempore dolor sit facilis. Enim voluptas
              numquam culpa atque quae qui eaque velit. Vero sit delectus
              nostrum at animi harum sed. Neque id vitae. Distinctio laboriosam
              itaque explicabo perspiciatis laboriosam facere laborum et.
              Necessitatibus et nam animi sit quia impedit illum deserunt iusto.
              Asperiores non molestiae. Et illum atque qui doloremque aliquam
              quia vero dolorem qui. Libero quis magnam voluptate rerum eveniet
              quae voluptatem.
            </Paragraph>
          </Text>
          <Text>
            <Subtitle>Longer Text</Subtitle>
            <Paragraph>
              Et est quidem a rerum. Harum assumenda modi eum eaque delectus
              asperiores ut. Dicta possimus aliquid ratione molestias omnis ad
              explicabo. Alias officiis numquam. Voluptas iste dicta rerum sed.
              Debitis ipsum nulla et tempore dolor sit facilis. Enim voluptas
              numquam culpa atque quae qui eaque velit. Vero sit delectus
              nostrum at animi harum sed. Neque id vitae. Distinctio laboriosam
              itaque explicabo perspiciatis laboriosam facere laborum et.
              Necessitatibus et nam animi sit quia impedit illum deserunt iusto.
              Asperiores non molestiae. Et illum atque qui doloremque aliquam
              quia vero dolorem qui. Libero quis magnam voluptate rerum eveniet
              quae voluptatem.
            </Paragraph>
          </Text>
        </Article>
      </div>
    );
  }
}
