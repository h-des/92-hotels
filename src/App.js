import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './utils/theme';

import ScrollToTop from './Components/Utils/ScrollToTop';
import Landing from './Pages/Landing/Landing';
import RoomListContainer from './Pages/RoomList/RoomListContainer';
import Nav from './Components/Nav';
import About from './Pages/About/About';
import RoomViewContainer from './Pages/RoomView/RoomViewContainer';
import Footer from './Components/Footer';
import Settings from './Pages/Settings/Settings';
import Checkout from './Pages/Checkout/Checkout';
import NotFound from './Pages/404/404';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

const TopMargin = styled.div`
  padding-top: 8rem;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <StyledApp>
            <ScrollToTop>
              {/* render Nav component everywhere except "/" */}
              <Route path="/" component={Nav} />
              <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/rooms/:id" component={RoomViewContainer} />
                <Route
                  path="/rooms"
                  render={props => (
                    <TopMargin>
                      <RoomListContainer />
                    </TopMargin>
                  )}
                />
                <Route path="/about" component={About} />
                <Route path="/settings" component={Settings} />
                <Route path="/checkout" component={Checkout} />
                <Route component={NotFound} />
              </Switch>

              <Route path="/" component={Footer} />
            </ScrollToTop>
          </StyledApp>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
