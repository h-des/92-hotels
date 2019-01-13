import React, { Component } from 'react';
import { Input } from '../../Components/Inputs';
import { Button } from '../../Components/Buttons';
import Label from '../../Components/Label';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';
import constants from '../../utils/constants';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default class UserData extends Component {
  submitForm = e => {
    this.props.editUser(e);
  };
  render() {
    return (
      <Form
        onSubmit={this.submitForm}
        initialValues={this.props.user.data}
        render={({ handleSubmit, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Field name="firstName">
              {({ input }) => (
                <React.Fragment>
                  <Label>First name</Label>
                  <Input {...input} marginBottom={'2.5rem'} />
                </React.Fragment>
              )}
            </Field>
            <Field name="lastName">
              {({ input }) => (
                <React.Fragment>
                  <Label>Last name</Label>
                  <Input {...input} marginBottom={'2.5rem'} />
                </React.Fragment>
              )}
            </Field>
            <Field name="email">
              {({ input }) => (
                <React.Fragment>
                  <Label>Email</Label>
                  <Input {...input} marginBottom={'2.5rem'} />
                </React.Fragment>
              )}
            </Field>
            <Field name="phone">
              {({ input }) => (
                <React.Fragment>
                  <Label>Phone</Label>
                  <Input {...input} marginBottom={'2.5rem'} />
                </React.Fragment>
              )}
            </Field>

            <SubmitButton {...this.props} />
          </StyledForm>
        )}
      />
    );
  }
}

function SubmitButton(props) {
  switch (props.user.editUserStatus) {
    case constants.LOADING:
      return <Button color="primary" loading />;
    case constants.ERROR:
      return (
        <Button color="disabled" disabled>
          Error
        </Button>
      );
    case constants.SUCCESS:
      return <Button color="green">Saved</Button>;
    default:
      return (
        <Button color="primary" type="submit">
          Save
        </Button>
      );
  }
}
