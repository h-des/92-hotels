import React, {Component} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Landing from './Pages/Landing';
import RoomFetcher from './Pages/RoomList/RoomFetcher';
import Nav from './Components/Nav';

const StyledApp = styled.div `
`

const TopMargin = styled.div`
  padding-top: 80px;
`

class App extends Component {
  render() {
    
    return (
      <Router>
        <StyledApp>
          {/* render Nav component everywhere except "/" */}
          <Route path="/" exact component={Landing} />
          <Route path="/" component={Nav} /> 
          <Route path="/rooms"  render={props => <TopMargin> <RoomFetcher/> </TopMargin>} />
        </StyledApp>
      </Router>
    );
  }
}

export default App;
