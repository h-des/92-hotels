import React from 'react';
import styled from 'styled-components';

const Title = styled.p`
  font-size: 2rem;
  color: white;
  padding: 1rem 2rem;
  text-align: right;
`;
const StyledCarousel = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  background: transparent;
  font-size: 5rem;
  border: none;
  font-weight: 700;
  cursor: pointer;
  position: absolute;
  z-index: 10;
  height: 20rem;
  color: white;

  :last-child {
    right: 2rem;
    padding-right: 1rem;
  }

  :not(:last-child) {
    padding-left: 1rem;
    left: 2rem;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const COORDS_A = ['4%', '109%', '240%'];
const COORDS_B = ['-109%', '4%', '109%'];
const COORDS_C = ['4%', '109%'];
const getXCoord = (id, status) => {
  switch (status) {
    case 'MOVE_LEFT_START':
    case 'MOVE_RIGHT':
      return COORDS_A[id];
    case 'MOVE_RIGHT_START':
    case 'MOVE_LEFT':
      return COORDS_B[id];
    default:
      return COORDS_C[id];
  }
};

const List = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 118rem;
  margin: auto;
  overflow: hidden;
  position: relative;
  height: 24rem;
`;

//gets ID, and animation status
const Item = styled.button`
  width: 47%;
  height: 20rem;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-image: url(${props => props.url});
  background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.3)),
    url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  display: flex;
  cursor: pointer;
  font-weight: 600;
  flex-direction: column;
  justify-content: flex-end;
  transform: translateX(${props => getXCoord(props.index, props.status)});
  transition: all 0.3s;
`;

const TIMEOUT = 300;
export default class CarouselSliding extends React.Component {
  state = {
    active: 0,
    status: 'STILL'
  };

  moveRight = () => {
    this.setState(
      prevstate => ({
        active:
          (prevstate.active - 1 + this.props.items.length) %
          this.props.items.length,
        status: 'MOVE_RIGHT_START'
      }),
      () => {
        setTimeout(() => {
          this.setState({ status: 'MOVE_RIGHT' }, () => {
            setTimeout(() => {
              this.setState({ status: 'STILL' });
            }, TIMEOUT);
          });
        }, 10);
      }
    );
  };

  moveLeft = () => {
    this.setState(
      prevstate => ({
        active: (prevstate.active + 1) % this.props.items.length,
        status: 'MOVE_LEFT_START'
      }),
      () => {
        setTimeout(() => {
          this.setState({ status: 'MOVE_LEFT' }, () => {
            setTimeout(() => {
              this.setState({ status: 'STILL' });
            }, TIMEOUT);
          });
        }, 10);
      }
    );
  };

  getList = (arr, status) => {
    return arr.map((id, index) => {
      const item = this.props.items[id];
      return (
        <Item
          onClick={() => this.props.onClick(item.city)}
          key={item.url}
          index={index}
          status={status}
          url={item.url}
        >
          <Title>{item.city}</Title>
        </Item>
      );
    });
  };

  renderItems = () => {
    const { active, status } = this.state;
    const { items } = this.props;
    const len = items.length;
    let toShow = [];
    switch (status) {
      case 'MOVE_RIGHT_START':
      case 'MOVE_RIGHT':
        toShow = [active, (active + 1) % len, (active + 2) % len];
        break;
      case 'MOVE_LEFT_START':
      case 'MOVE_LEFT':
        toShow = [(active - 1 + len) % len, active, (active + 1) % len];
        break;
      default:
        toShow = [active, (active + 1) % len];
        break;
    }
    return this.getList(toShow, status);
  };

  preloadImages = () => {
    const { items } = this.props;
    const { active } = this.state;
    const preLeft = (active - 1 + items.length) % items.length || 0;
    const preRight = (active + 2) % items.length || 0;

    [preLeft, preRight].map(id => {
      let image = new Image();
      image.src = items[id].url;
      return image;
    });
  };

  render() {
    if (this.props.items.length) this.preloadImages();
    return (
      <StyledCarousel>
        <List>
          <StyledButton onClick={this.moveLeft}>&lsaquo;</StyledButton>
          {this.props.items.length > 0 && this.renderItems()}
          <StyledButton onClick={this.moveRight}>&rsaquo;</StyledButton>
        </List>
      </StyledCarousel>
    );
  }
}

CarouselSliding.defaultProps = {
  items: []
};
