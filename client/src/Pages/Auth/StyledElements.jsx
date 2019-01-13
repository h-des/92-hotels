import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  width: 100%;
`;

const LoginIcon = styled.img`
  height: 10rem;
  margin-bottom: 2.5rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 1rem;
  }
`;

const LoginTitle = styled.h3`
  color: #000e50;
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 3rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  border: 2px solid #13ce66;
  border-radius: 5px;
  margin-bottom: 2rem;
  height: 5rem;
  min-height: 4rem;
  padding: 0 2rem;
  font-size: 2rem;
  color: #5a5a5a;
  font-weight: 700;
  font-family: 'Nunito';

  &:invalid {
    border: 2px solid #ff3636;
  }
`;

const StyledLabel = styled.label`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #5a5a5a;
  font-weight: 600;

  @media only screen and (max-width: 600px) {
    margin-bottom: 0.5rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 40rem;
  max-width: 90vw;
  text-align: left;
`;

const ErrorMessage = styled.p`
  border-left: 3px solid red;
  background-color: #fff9ed;
  color: #744f11;
  font-size: 1.6rem;
  padding: 0.4rem 0.8rem;
`;

const ForgotLink = styled.a`
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  color: #5a5a5a;

  &:hover {
    color: ${props => props.theme.colors.black};
    text-decoration: underline;
  }

  &:visited {
    text-decoration: none;
  }
`;

export {
  ForgotLink,
  Container,
  LoginIcon,
  LoginTitle,
  StyledInput,
  StyledForm,
  StyledLabel,
  ErrorMessage
};
