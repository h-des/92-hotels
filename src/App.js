import React, {Component} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Landing from './Pages/Landing';
import RoomList from './Pages/RoomList';

const StyledApp = styled.div `
  
`

class App extends Component {
  render() {
    return (
      <Router>
        <StyledApp>
          <Route path="/" exact component={Landing} />
          <Route path="/rooms"  component={RoomList} />
        </StyledApp>
      </Router>
    );
  }
}

export default App;
