import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTags = styled.div`
    p {
        display:inline-block;
        font-size: 1rem;
        font-weight: bold;
        color: ${props => props.color};
        text-transform: uppercase;
        border: 1px solid;
        border-color: ${props => props.color};
        padding: 4px 12px;
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
`;

const Tags = ({ tags, color }) => (
  <StyledTags color={color}>
    {tags.map(tag => <p key={tag}>{tag}</p>)}
  </StyledTags>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
};

Tags.defaultProps = {
  tags: [],
  color: 'white',
};

export default Tags;
