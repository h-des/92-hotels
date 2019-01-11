import React, { Component, Suspense, lazy } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './utils/theme';
import { connect } from 'react-redux';
import * as actions from './actions';

import ScrollToTop from './Components/Utils/ScrollToTop';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

import Landing from './Pages/Landing/Landing';
import CardDetails from './Pages/Checkout/CardDetails';
const HotelListContainer = lazy(() =>
  import('./Pages/HotelList/HotelListContainer')
);
const HotelContainer = lazy(() => import('./Pages/Hotel/HotelContainer'));
const About = lazy(() => import('./Pages/About/About'));
const Profile = lazy(() => import('./Pages/Settings/Profile'));
const Checkout = lazy(() => import('./Pages/Checkout/Checkout'));
const NotFound = lazy(() => import('./Pages/404/404'));
const Unauthorised = lazy(() => import('./Pages/404/Unauthorised'));

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

class App extends Component {
  componentDidMount() {
    const autoLogin = localStorage.getItem('#45123');
    if (this.props.user.data === null && autoLogin === 'true') {
      this.props.autoLogin();
    }
  }

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
                  <Route
                    path="/hotels/:id"
                    render={props => <HotelContainer {...props} />}
                  />
                  <Route
                    path="/hotels"
                    render={props => <HotelListContainer {...props} />}
                  />
                  <Route path="/about" render={props => <About {...props} />} />

                  {/* protected routes */}
                  <PrivateRoute
                    user={this.props.user}
                    path="/settings"
                    component={Profile}
                  />
                  <PrivateRoute
                    user={this.props.user}
                    path="/pay"
                    component={CardDetails}
                  />
                  <PrivateRoute
                    user={this.props.user}
                    path="/checkout"
                    component={Checkout}
                  />

                  <Route render={props => <NotFound {...props} />} />
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

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        user.data ? <Component {...props} /> : <Unauthorised />
      }
    />
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  actions
)(App);
