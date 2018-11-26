import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../Components/Inputs';
import { Button } from '../../Components/Buttons';
import Label from '../../Components/Label';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

class Profile extends Component {
  submitForm = e => {
    //fake api call
    console.log(e);
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
            <Button color="primary" type="submit">
              Save
            </Button>
          </StyledForm>
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
