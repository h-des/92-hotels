import React, {Component} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Landing from './Pages/Landing';
import RoomFetcher from './Pages/RoomList/RoomFetcher';

const StyledApp = styled.div `
  
`

class App extends Component {
  render() {
    return (
      <Router>
        <StyledApp>
          <Route path="/" exact component={Landing} />
          <Route path="/rooms"  component={RoomFetcher} />
        </StyledApp>
      </Router>
    );
  }
}

export default App;
