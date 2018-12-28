import styled from 'styled-components';
import React from 'react';

const SVG = styled.svg`
  height: 1.4rem;
`;

const Star = ({ fillColor }) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    aria-labelledby="title"
    aria-describedby="desc"
    role="img"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Star</title>
    <desc>A line styled icon from Orion Icon Library.</desc>
    <path
      data-name="layer1"
      fill={fillColor}
      stroke={fillColor}
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M32 47.2L13.5 61l7.1-22.2L2 25h23l7-22 7 22h23L43.4 38.8 50.5 61 32 47.2z"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </SVG>
);

const Badge = ({ fillColor }) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    aria-labelledby="title"
    aria-describedby="desc"
    role="img"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Quality</title>
    <desc>A solid styled icon from Orion Icon Library.</desc>
    <path
      data-name="layer2"
      d="M54 21.4l-3.9-3.6 1.1-5.2-5-1.7L45 5.8l-5.3.5-3.1-4.2L32 4.7l-4.6-2.6-3.1 4.2-5.3-.5-1.1 5.2-5 1.7 1.1 5.2-4 3.5 3.1 4.3-2.1 4.8 4.6 2.7v5.3l5.3.6 2.1 4.8 5-1.6 4 3.5 4-3.5 5 1.6 2.2-4.8 5.3-.6v-5.3l4.5-2.7-2.1-4.8zM32 33.9a10 10 0 1 1 10-10 10 10 0 0 1-10 10z"
      fill={fillColor}
    />
    <path
      data-name="layer1"
      d="M29.3 48.8l-2.3-2-2.9.9-1.2.2a4 4 0 0 1-3.6-2.3l-.9-2.1L16 61.9l14-5.3v-7.3zm15.3-3.2a4 4 0 0 1-3.6 2.3l-1.2-.2-2.9-.9-2.3 2-.7.5v7.4l14 5.3-2.2-18.7z"
      fill={fillColor}
    />
  </SVG>
);

const StyledUL = styled.ul`
  display: flex;
  list-style: none;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '0')};
`;

const Badges = ({ count, marginBottom, type }) => {
  let res = [];
  let fill = 'blue';
  if (type === 'stars') {
    fill = '#F7B32B';
  }

  for (let i = 0; i < 5; i++) {
    if (i < count) {
      res.push(
        <li key={i}>
          {type === 'stars' ? (
            <Star fillColor={fill} />
          ) : (
            <Badge fillColor={fill} />
          )}
        </li>
      );
    } else {
      res.push(
        <li key={i}>
          {type === 'stars' ? (
            <Star fillColor="#ccc" />
          ) : (
            <Badge fillColor="#ccc" />
          )}
        </li>
      );
    }
  }
  return <StyledUL marginBottom={marginBottom}>{res}</StyledUL>;
};

export default Badges;
