import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import PropTypes from 'prop-types';

const SVG = styled.svg`
  height: 3rem;
`;

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

const StyledReview = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-right: 1rem;
`;
const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewHeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ReviewAvatar = styled.img`
  height: 4.5rem;
  justify-self: center;
  width: 4.5rem;
  border-radius: 50%;
`;

const ReviewAuthor = styled.h4`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.black};
  font-weight: 700;
`;

const ReviewDate = styled.p`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.grey};
  font-weight: 600;
`;

const ReviewBody = styled.p`
  font-size: 1.8rem;
  text-align: justify;
  font-style: italic;
  align-self: flex-end;
  color: ${props => props.theme.colors.black};
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rating = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-self: start;
  font-size: 1.4rem;
`;

class Reviews extends React.Component {
  state = { reviews: [] };
  async componentDidMount() {
    const { id } = this.props;
    //get all reviews
    const res = await axios.get(`/api/review/?hotel=${id}`);
    let reviews = res.data;
    let arr = await Promise.all(
      reviews.map(async elem => {
        //get review's author info
        const res = await axios.get(`/api/profile/${elem.user}`);
        const user = res.data;
        return {
          ...elem,
          username: user.firstName,
          avatar: user.avatar.medium
        };
      })
    );

    this.setState({
      reviews: arr
    });
  }

  render() {
    return (
      <ReviewsContainer>
        {/* show all reviews, sort by date, newest first */}
        {this.state.reviews
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(e => (
            <Review
              key={e.username}
              author={e.username}
              date={moment(e.createdAt).format('YYYY-MM-DD')}
              body={e.body}
              avatar={e.avatar}
              rating={e.rate}
            />
          ))}
      </ReviewsContainer>
    );
  }
}

const Review = ({ author, date, body, avatar, rating }) => (
  <StyledReview>
    <ContainerLeft>
      <ReviewAvatar src={avatar} />
      <Rating>
        <Badge fillColor="blue" />
        <p>{rating}/5</p>
      </Rating>
    </ContainerLeft>
    <ContainerRight>
      <ReviewHeadContainer>
        <ReviewAuthor>{author}</ReviewAuthor>
        <ReviewDate>{date}</ReviewDate>
      </ReviewHeadContainer>
      <ReviewBody>{body}</ReviewBody>
    </ContainerRight>
  </StyledReview>
);

Reviews.propTypes = {
  id: PropTypes.string.isRequired
};

Review.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default Reviews;
