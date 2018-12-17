import React, { Component, Suspense, lazy } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './utils/theme';

import ScrollToTop from './Components/Utils/ScrollToTop';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

import Landing from './Pages/Landing/Landing';
const RoomListContainer = lazy(() =>
  import('./Pages/RoomList/RoomListContainer')
);
const RoomViewContainer = lazy(() =>
  import('./Pages/RoomView/RoomViewContainer')
);
const About = lazy(() => import('./Pages/About/About'));
const Settings = lazy(() => import('./Pages/Settings/Settings'));
const Checkout = lazy(() => import('./Pages/Checkout/Checkout'));
const NotFound = lazy(() => import('./Pages/404/404'));

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <StyledApp>
            <ScrollToTop>
              <Route path="/" component={Nav} />
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path="/" exact component={Landing} />
                  <Route path="/rooms/:id" component={RoomViewContainer} />
                  <Route path="/rooms" component={RoomListContainer} />
                  <Route path="/about" component={About} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/checkout" component={Checkout} />
                  <Route component={NotFound} />
                </Switch>
              </Suspense>
              <Route path="/" component={Footer} />
            </ScrollToTop>
          </StyledApp>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
