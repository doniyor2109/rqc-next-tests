import React from 'react';
import styled from 'styled-components';
import Loading from './loading';

const StyledLoading = styled.div`
    .transparent-wall{
      height: 104vh;
      position: fixed;
      width: 100%;
      background: rgba(255, 255, 255, 0.9);
      z-index: 99;
      display: block;
    }
    .transparent-wall > div {
      height: 100%;
    }
`;

class LoadingFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLoading: false,
    };
    this.enableLoading = this.enableLoading.bind(this);
    this.timer = setTimeout(this.enableLoading, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableLoading() {
    this.setState({
      displayLoading: true,
    });
  }


  render() {
    const { displayLoading } = this.state;
    if (!displayLoading) {
      return null;
    }
    return (
      <StyledLoading>
        <div className="transparent-wall">
          <Loading noDelay />
        </div>
      </StyledLoading>
    );
  }
}

export default LoadingFull;
