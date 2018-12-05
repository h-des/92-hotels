import React, { Component } from 'react';
import styled from 'styled-components';

const StyledTabsPanel = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`;

const StyledTabTitle = styled.li`
  background-color: ${props => (props.active ? 'white' : '#DFDFDF')};
  color: ${props => (props.active ? 'black' : 'rgba(0,0,0, 0.6)')};
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
  font-size: 1.6rem;
  z-index: 30;
  box-shadow: 0 0.8rem 1.3rem rgba(0, 0, 0, 0.1);
  padding: ${props => (props.padding ? props.padding : '2rem')};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '5rem')};
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
    <StyledTabTitle
      active={isActive}
      role="tab"
      aria-selected={isActive ? 'true' : 'false'}
      onClick={() => click(index)}
    >
      {children}
    </StyledTabTitle>
  );
};

export class TabsContainer extends Component {
  render() {
    const { activeTab, children, changeTab } = this.props;
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
  return !isActive ? null : <StyledTab>{children}</StyledTab>;
};
