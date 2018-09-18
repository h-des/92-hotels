import React, {Component} from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import Landing from './Pages/Landing';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const StyledApp = styled.div `

`

class App extends Component {
  render() {
    return (
      <Router>
        <StyledApp>
          <Route path="/" exact component={Landing} />
        </StyledApp>
      </Router>
    );
  }
}

export default App;
