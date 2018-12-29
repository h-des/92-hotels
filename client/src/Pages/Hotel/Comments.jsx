import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const CommentHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CommentHeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  justify-content: space-between;
`;

const CommentAvatar = styled.img`
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 50%;
`;

const CommentAuthor = styled.h4`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.black};
  font-weight: 700;
`;

const CommentDate = styled.p`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.grey};
  font-weight: 600;
`;

const CommentBody = styled.p`
  font-size: 1.8rem;
  width: 90%;
  text-align: justify;
  font-style: italic;
  align-self: flex-end;
  color: ${props => props.theme.colors.black};
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

class Comments extends React.Component {
  state = { reviews: [] };
  async componentDidMount() {
    const { id } = this.props;
    const res = await axios.get(`/api/review/?hotel=${id}`);
    let reviews = res.data;
    let arr = await Promise.all(
      reviews.map(async elem => {
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
      <CommentsContainer>
        {this.state.reviews
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(e => (
            <Comment
              author={e.username}
              date={moment(e.createdAt).format('YYYY-MM-DD')}
              body={e.body}
              avatar={e.avatar}
            />
          ))}
      </CommentsContainer>
    );
  }
}

const Comment = ({ author, date, body, avatar }) => (
  <StyledComment>
    <CommentHead>
      <CommentAvatar src={avatar} />
      <CommentHeadContainer>
        <CommentAuthor>{author}</CommentAuthor>
        <CommentDate>{date}</CommentDate>
      </CommentHeadContainer>
    </CommentHead>
    <CommentBody>{body}</CommentBody>
  </StyledComment>
);

export default Comments;
