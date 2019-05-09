import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;

    img {
      width: 10rem;
    }
`;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLoading: false,
    };
    this.enableLoading = this.enableLoading.bind(this);
    this.timer = setTimeout(this.enableLoading, 1000);
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
      <Styled>
        <img src="/static/RQCloader.gif" alt="loading animaton" />
      </Styled>
    );
  }
}

export default Loading;
