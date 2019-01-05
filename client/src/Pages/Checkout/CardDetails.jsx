import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import formatString from 'format-string-by-pattern';
import { Form, Field } from 'react-final-form';
import { capitalizeFirstLetter } from '../../utils/utilsFunctions';
import { SpinnerRectangles } from '../../Components/Spinner';
import Modal from '../../Components/Modal';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Redirect } from 'react-router-dom';

const Contaier = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 45rem;
  padding: 4rem;
  padding-top: 15rem;
  text-align: left;
  background-image: linear-gradient(to top right, #212121, #444444);
  border-radius: 16px;
  box-shadow: 0 9px 25px rgba(0, 0, 0, 0.4);

  @media only screen and (max-width: 425px) {
    max-width: unset;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    border-radius: 0;
    box-shadow: none;
    padding-top: 4rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 6rem;
`;

const labelStyle = css`
  font-weight: 400;
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const Label = styled.label`
  ${labelStyle}
`;

const Legend = styled.legend`
  ${labelStyle}
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  border-bottom: ${props =>
    props.error ? '1px solid red' : '1px solid rgba(255, 255, 255, 0.36)'};
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
  color: white;
  margin-bottom: ${props => (props.error ? '0' : `3rem`)};
  transition: border 0.2s;
  text-align: ${props => (props.short ? `center` : `left`)};

  &::placeholder {
    text-align: center;
  }

  &:focus {
    border-bottom: 1px solid white;
  }
`;

const Message = styled.p`
  color: red;
  font-size: 1.2rem;
  margin-bottom: 1.4rem;
`;

const Status = styled.p`
  color: ${props => props.color || props.theme.colors.green};
  font-size: 2.4rem;
`;

const Fieldset = styled.fieldset`
  border: none;
  margin-bottom: 5rem;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 28%;
`;

const PayButton = styled.button`
  font-size: 2.4rem;
  border: none;
  border-radius: 16px;
  padding: 1.2rem 0;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colorsHover.primary};
  }

  &:disabled {
    cursor: initial;
    background-color: #ccc;
    color: ${props => props.theme.colors.black};
  }
`;

//validation
const required = value => (value ? undefined : 'Required');
const lengthEqualTo = len => value => {
  if (!value) return 'Required';
  if (value.length < len) return 'Invalid length';
  return undefined;
};
const lengthEqualTo2 = lengthEqualTo(2); //month
const lengthEqualTo3 = lengthEqualTo(3); //cvv
const lengthEqualTo4 = lengthEqualTo(4); //year
const lengthEqualTo16 = lengthEqualTo(16 + 3); //card number 16 characters + 3 spaces
const formatOnlyNumbers = mask => str => {
  const onlyNumbers = str.replace(/[^\d]/g, '');
  if (!onlyNumbers) return null;
  return formatString(mask, onlyNumbers);
};
const mask = { name: 'card', parse: '0000 0000 0000 0000' };
const details = [
  { name: 'month', parse: 'mm', validate: lengthEqualTo2 },
  { name: 'year', parse: 'yyyy', validate: lengthEqualTo4 },
  { name: 'cvv', parse: 'xxx', validate: lengthEqualTo3 }
];

class CardDetails extends Component {
  pay = e => {
    const { hash } = this.props.checkout;
    this.props.pay(e);
  };

  close = () => {
    this.props.resetTransaction();
  };

  render() {
    if (!this.props.checkout.hash) {
      return <Redirect to="/hotels" />;
    }
    if (this.props.status === 'PAYMENT_SUCCESS')
      return (
        <Contaier>
          <Status>Success!</Status>
        </Contaier>
      );
    if (this.props.status === 'PAYMENT_ERROR')
      return (
        <Contaier>
          <Status color={'red'}>Something went wrong. Try again</Status>
        </Contaier>
      );
    return (
      <Modal close={this.close}>
        <Contaier>
          <Form
            onSubmit={this.pay}
            render={({ handleSubmit, invalid, pristine }) => (
              <StyledForm>
                <FormTitle>Card details</FormTitle>
                <Field
                  name="owner"
                  validate={required}
                  render={({ input, meta }) => (
                    <React.Fragment>
                      <Label htmlFor="owner">Card owner</Label>
                      <Input
                        {...input}
                        error={meta.touched && meta.error && meta.invalid}
                      />
                      {meta.touched && meta.error && (
                        <Message>{meta.error}</Message>
                      )}
                    </React.Fragment>
                  )}
                />
                <Field
                  name="number"
                  validate={lengthEqualTo16}
                  parse={formatOnlyNumbers(mask.parse)}
                  render={({ input, meta }) => (
                    <React.Fragment>
                      <Label htmlFor="number">Number</Label>
                      <Input
                        {...input}
                        error={meta.touched && meta.error && meta.invalid}
                      />
                      {meta.touched && meta.error && (
                        <Message>{meta.error}</Message>
                      )}
                    </React.Fragment>
                  )}
                />
                <Fieldset>
                  <Legend>Expiration Date</Legend>
                  <HorizontalContainer>
                    {details.map(e => (
                      <VerticalContainer key={e.name}>
                        <Field
                          name={e.name}
                          validate={e.validate}
                          parse={formatOnlyNumbers(e.parse)}
                          render={({ input, meta }) => (
                            <React.Fragment>
                              <Label htmlFor={e.name}>
                                {capitalizeFirstLetter(e.name)}
                              </Label>
                              <Input
                                short
                                placeholder={e.parse}
                                {...input}
                                error={
                                  meta.touched && meta.error && meta.invalid
                                }
                              />
                              {meta.touched && meta.error && (
                                <Message>{meta.error}</Message>
                              )}
                            </React.Fragment>
                          )}
                        />
                      </VerticalContainer>
                    ))}
                  </HorizontalContainer>
                </Fieldset>
                <PayButton
                  onClick={handleSubmit}
                  type="submit"
                  disabled={pristine || invalid}
                >
                  {this.props.status === 'PAYMENT_IN_PROGRESS' ? (
                    <SpinnerRectangles color={'#333'} />
                  ) : (
                    `Pay`
                  )}
                </PayButton>
              </StyledForm>
            )}
          />
        </Contaier>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    checkout: state.checkout
  };
};

export default connect(
  mapStateToProps,
  actions
)(CardDetails);
