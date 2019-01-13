import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTabsPanel = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`;

const StyledTabTitle = styled.li`
  background-color: ${props => (props.active ? 'white' : '#DFDFDF')};
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 1rem 2rem;
  margin-right: 1rem;
  min-width: 7rem;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
`;

const StyledTab = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
  display: block;
  z-index: 30;
  box-shadow: 0 0.8rem 1.3rem rgba(0, 0, 0, 0.1);
  padding: ${props => (props.padding ? props.padding : '2rem')};
  font-size: 1.6rem;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '5rem')};
`;

const StyledButton = styled.button`
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
  color: ${props => (props.active ? 'black' : 'rgba(0,0,0, 0.6)')};
  font-size: 1.6rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export class Tabs extends Component {
  state = {
    activeTab: 0
  };

  changeTab = id => {
    this.setState({
      activeTab: id
    });
  };

  render() {
    const { children } = this.props;
    const { activeTab } = this.state;
    //pass data to children
    const childrenToRender = React.Children.map(children, child => {
      return React.cloneElement(child, {
        activeTab,
        changeTab: this.changeTab
      });
    });

    return <div>{childrenToRender}</div>;
  }
}

export class TabsPanel extends Component {
  render() {
    const { activeTab, children, changeTab } = this.props;
    //pass data to children
    const childrenToRender = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        click: changeTab,
        isActive: index === activeTab ? true : false,
        index
      });
    });
    return <StyledTabsPanel role="tablist">{childrenToRender}</StyledTabsPanel>;
  }
}

export const TabTitle = ({ click, isActive, index, children }) => {
  return (
    <StyledTabTitle active={isActive} onClick={() => click(index)}>
      <StyledButton role="tab" aria-selected={isActive ? 'true' : 'false'}>
        {children}
      </StyledButton>
    </StyledTabTitle>
  );
};

export class TabsContainer extends Component {
  render() {
    const { activeTab, children, changeTab } = this.props;
    //pass data to children
    const childrenToRender = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        click: changeTab,
        isActive: index === activeTab ? true : false,
        index
      });
    });
    return childrenToRender;
  }
}

export const Tab = ({ isActive, children }) => {
  //render only active tab
  return !isActive ? null : <StyledTab>{children}</StyledTab>;
};

TabTitle.propTypes = {
  click: PropTypes.func,
  isActive: PropTypes.bool,
  index: PropTypes.number,
  children: PropTypes.node
};

Tab.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node
};
