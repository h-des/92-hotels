import React, { Component } from 'react';

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

function withScrollPosition(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        scrollInfo: { scrollY: 0, innerHeight: 0, scrollHeight: 0 }
      };
    }

    componentDidMount() {
      window.addEventListener('scroll', throttle(this.handleScroll, 100));
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', throttle(this.handleScroll, 100));
    }

    handleScroll = e => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      this.setState({
        scrollInfo: {
          scrollY,
          innerHeight,
          scrollHeight
        }
      });
    };

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent scrollInfo={this.state.scrollInfo} {...this.props} />
      );
    }
  };
}

export default withScrollPosition;
