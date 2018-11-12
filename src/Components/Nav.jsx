import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import messageIcon from './../images/message.svg';
import hamburgerIcon from './../images/hamburger.svg';
import Modal from './Modal';
import { withRouter } from 'react-router-dom';

const breakPoint = '425px';

const StyledNav = styled.nav`
  display: grid;
  position: fixed;
  z-index: 1000;
  width: 100%;
  grid-template-columns: max-content 1fr min-content;
  grid-template-rows: 60px 0px;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: ${breakPoint}) {
    grid-template-columns: max-content 1fr min-content;
    grid-template-rows: 60px max-content;
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
  grid-column: 1 / span 1;
  align-self: center;
  font-weight: 900;
  font-size: 1.8rem;
  margin: 2rem;
  text-decoration: none;
  color: #0c0c0c;

  @media only screen and (max-width: ${breakPoint}) {
    grid-column: 2 / span 1;
    text-align: center;
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
    grid-row: 2/3;
    grid-column: 1/-1;
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    justify-self: center;
    width: 100%;
  }
`;
const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => (props.isActive ? `#5862ef` : `#0c0c0c`)};
  font-size: 1.6rem;
  font-weight: 600;
  margin: 2rem;

  @media only screen and (max-width: ${breakPoint}) {
    width: 100%;
    text-align: center;
    margin-left: 0;
    margin-right: 0;
  }

  &:hover {
    color: #777777;
  }
`;
const NavIcon = styled.img`
  height: 5rem;
  padding: 15px;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const NavChatIcon = styled.img`
  height: 5.5rem;
  align-self: center;
  padding: 15px;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
  }
`;

class Nav extends Component {
  state = {
    showList: false,
    showModal: false
  };

  showModal = () => {
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
    console.log(pathname.slice(1));
    return ['rooms', 'about', 'contact'].map(e => {
      if (e === pathname.slice(1)) {
        return (
          <NavLink to={e} isActive key={e}>
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </NavLink>
        );
      } else {
        return (
          <NavLink to={e} key={e}>
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </NavLink>
        );
      }
    });
  };

  render() {
    return (
      <StyledNav>
        <NavHamburger onClick={() => this.toggleList()}>
          <NavIcon src={hamburgerIcon} />
        </NavHamburger>
        <NavLogo to="/">
          <HideSpan>Hotel Black</HideSpan>92
        </NavLogo>
        <NavItems onClick={() => this.toggleList()} show={this.state.showList}>
          {this.renderList()}
        </NavItems>
        <NavChatIcon onClick={() => this.showModal()} src={messageIcon} />{' '}
        {this.state.showModal && <Modal />}
      </StyledNav>
    );
  }
}

export default withRouter(Nav);
