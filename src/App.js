import React, {Component} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Landing from './Pages/Landing';
import RoomFetcher from './Pages/RoomList/RoomFetcher';
import Nav from './Components/Nav';
import About from './Pages/About/About';
import RoomView from './Pages/RoomView/RoomView';

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
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/" component={Nav} /> 
          </Switch>
          <Switch>
            <Route path="/rooms/:id" component={RoomView}/>
            <Route path="/rooms" render={props => <TopMargin> <RoomFetcher/> </TopMargin>} />
          </Switch>
          <Route path="/about" component={About} />
        </StyledApp>
      </Router>
    );
  }
}

export default App;
