import React, { Component } from 'react';
import styled from 'styled-components';

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
  height: 45px;
  width: 45px;
  border-radius: 50%;
`;

const CommentAuthor = styled.h4`
  font-size: 24px;
  color: ${props => props.theme.colors.black};
  font-weight: 700;
`;

const CommentDate = styled.p`
  font-size: 24px;
  color: ${props => props.theme.colors.grey};
  font-weight: 600;
`;

const CommentBody = styled.p`
  font-size: 18px;
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

export default class Comments extends Component {
  render() {
    return (
      <CommentsContainer>
        {Array(10)
          .fill('')
          .map(e => (
            <Comment />
          ))}
      </CommentsContainer>
    );
  }
}

const Comment = ({ author, date, body, avatar }) => (
  <StyledComment>
    <CommentHead>
      <CommentAvatar src="https://via.placeholder.com/600/51aa97" />
      <CommentHeadContainer>
        <CommentAuthor>John lennon</CommentAuthor>
        <CommentDate>20.20.1203</CommentDate>
      </CommentHeadContainer>
    </CommentHead>
    <CommentBody>
      Many forms will become obsolete as data entry becomes standardized, OCR
      capabilities increase, and software automates manual processes. However,
      an user interface will always be needed. I hope these different form
      presentations help you build better apps. Let me know what I missed.
    </CommentBody>
  </StyledComment>
);
