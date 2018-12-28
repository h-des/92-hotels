import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import hamburgerIcon from './../images/hamburger.svg';
import Modal from './Modal';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import AuthContainer from '../Pages/Auth/AuthContainer';

const breakPoint = '425px';

const StyledNav = styled.header`
  display: flex;
  justify-content: space-between;
  position: ${props => (props.landing ? 'absolute' : 'fixed')};
  z-index: 1000;
  width: 100%;
  background-color: ${props => (props.landing ? 'transparent' : 'white')};
  box-shadow: ${props =>
    props.landing ? 'none' : '0 2px 4px 0 rgba(0, 0, 0, 0.1)'};

  @media only screen and (max-width: 425px) {
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;

  @media only screen and (max-width: 425px) {
    flex-direction: column;
    width: 100%;
  }
`;

const NavHamburger = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: none;
  visibility: collapsed;

  @media only screen and (max-width: ${breakPoint}) {
    display: initial;
    visibility: visible;
  }

  &:hover {
    background-color: #f6f6f6;
  }
`;

const NavLogo = styled(Link)`
  align-self: center;
  text-decoration: none;

  @media only screen and (max-width: ${breakPoint}) {
    text-align: center;
  }
`;

const StyledH1 = styled.h1`
  font-weight: 900;
  font-size: 1.8rem;
  margin: 2rem;
  color: ${props => (props.landing ? 'white' : '#0c0c0c')};

  @media only screen and (max-width: ${breakPoint}) {
    color: #0c0c0c;
  }
`;

const HideSpan = styled.span`
  @media (max-width: 700px) {
    display: none;
  }
`;

const NavItems = styled.ul`
  align-self: center;
  justify-self: right;

  @media only screen and (max-width: ${breakPoint}) {
    position: absolute;
    top: 53px;
    left: 0;
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    justify-self: center;
    width: 100%;
  }
`;

const LoginButton = styled.button`
  color: ${props => (props.landing ? 'white' : `#0c0c0c`)};
  font-size: 1.6rem;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  margin: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  @media only screen and (max-width: ${breakPoint}) {
    /* width: 100%; */
    color: #0c0c0c;
    text-align: center;
    margin-left: 0;
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${props => (props.landing ? `#ccc` : `#777`)};
  }
`;

const NavLink = styled(({ landing, ...props }) => <Link {...props} />)`
  text-decoration: none;
  color: ${props =>
    props.isActive ? `#5862ef` : props.landing ? 'white' : `#0c0c0c`};
  font-size: 1.6rem;
  font-weight: 600;
  margin: 2rem;

  @media only screen and (max-width: ${breakPoint}) {
    width: 100%;
    text-align: center;
    color: ${props => (props.isActive ? `#5862ef` : `#0c0c0c`)};
    margin-left: 0;
    margin-right: 0;
  }

  &:hover {
    color: ${props => (props.landing ? `#ccc` : `#777`)};
  }
`;
const NavIcon = styled.img`
  height: 50px;
  padding: 15px;

  &:hover {
    background-color: #f6f6f6;
  }
`;

class Nav extends Component {
  state = {
    showList: false,
    showModal: false
  };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal
      };
    });
  };

  toggleList = () => {
    this.setState(prevState => {
      return {
        showList: !prevState.showList
      };
    });
  };

  renderList = () => {
    const { pathname } = this.props.history.location;
    const list = this.props.user.data
      ? ['rooms', 'about', 'settings']
      : ['rooms', 'about'];
    return list.map(e => {
      if (e === pathname.slice(1)) {
        return (
          <NavLink
            to={`/${e}`}
            landing={pathname === '/' ? true : undefined}
            isActive
            key={e}
          >
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </NavLink>
        );
      } else {
        return (
          <NavLink
            to={`/${e}`}
            landing={pathname === '/' ? true : undefined}
            key={e}
          >
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </NavLink>
        );
      }
    });
  };

  render() {
    const { pathname } = this.props.history.location;
    return (
      <StyledNav landing={pathname === '/' ? true : undefined}>
        <NavHamburger onClick={() => this.toggleList()}>
          <NavIcon src={hamburgerIcon} />
        </NavHamburger>
        <NavContainer>
          <NavLogo to="/">
            <StyledH1 landing={pathname === '/' ? true : undefined}>
              92 <HideSpan>Hotels</HideSpan>
            </StyledH1>
          </NavLogo>
          <NavItems
            onClick={() => this.toggleList()}
            show={this.state.showList}
          >
            {this.renderList()}
          </NavItems>
        </NavContainer>
        {this.props.user.data ? (
          <LoginButton
            landing={pathname === '/' ? true : undefined}
            onClick={this.props.logOut}
          >
            Logout
          </LoginButton>
        ) : (
          <LoginButton
            landing={pathname === '/' ? true : undefined}
            onClick={() => this.toggleModal()}
          >
            Login
          </LoginButton>
        )}
        {this.state.showModal && (
          <Modal close={() => this.toggleModal()}>
            <AuthContainer close={() => this.toggleModal()} />
          </Modal>
        )}
      </StyledNav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Nav)
);
