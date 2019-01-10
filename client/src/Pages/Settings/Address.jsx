import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../Components/Inputs';
import { Button } from '../../Components/Buttons';
import Label from '../../Components/Label';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';
import { SpinnerRectangles } from '../../Components/Spinner';
import constants from '../../utils/constants';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

class Address extends Component {
  render() {
    return (
      <Form
        onSubmit={this.props.editUser}
        initialValues={this.props.user.data}
        render={({ handleSubmit, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Field name="address">
              {({ input }) => (
                <React.Fragment>
                  <Label>Address</Label>
                  <Input {...input} marginBottom={'2.5rem'} />
                </React.Fragment>
              )}
            </Field>
            <Field name="city">
              {({ input }) => (
                <React.Fragment>
                  <Label>City</Label>
                  <Input {...input} marginBottom={'2.5rem'} />
                </React.Fragment>
              )}
            </Field>
            <Field name="zipCode">
              {({ input }) => (
                <React.Fragment>
                  <Label>Zip code</Label>
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Address);

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
