import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Login from './Login';
import NewAccount from './NewAccount';

class AuthContainer extends Component {
  state = {
    newAccount: false
  };

  toggleState = () => {
    this.setState(prevState => ({
      newAccount: !prevState.newAccount
    }));
  };

  render() {
    return this.state.newAccount ? (
      <NewAccount {...this.props} login={this.toggleState} />
    ) : (
      <Login {...this.props} newAccount={this.toggleState} />
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
  actions
)(AuthContainer);
