import React, { Component } from 'react';
import styled from 'styled-components';
import { randomDate, capitalizeFirstLetter } from '../../utils/utilsFunctions';

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

export default ({ list }) => {
  return (
    <CommentsContainer>
      {list.map(e => {
        const { body, email } = e;
        const tempDate = randomDate(new Date(2015, 0, 1), new Date());
        const date = `${tempDate.getUTCDate()}/${tempDate.getUTCMonth() +
          1}/${tempDate.getUTCFullYear()}`;
        const author = email.match(/^([^@]*)@/)[1];
        return (
          <Comment
            body={capitalizeFirstLetter(body)}
            date={date}
            author={author}
          />
        );
      })}
    </CommentsContainer>
  );
};

const Comment = ({ author, date, body, avatar }) => (
  <StyledComment>
    <CommentHead>
      <CommentAvatar src="https://via.placeholder.com/600/51aa97" />
      <CommentHeadContainer>
        <CommentAuthor>{author}</CommentAuthor>
        <CommentDate>{date}</CommentDate>
      </CommentHeadContainer>
    </CommentHead>
    <CommentBody>{body}</CommentBody>
  </StyledComment>
);
