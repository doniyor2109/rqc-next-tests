
import React from 'react';
import { RichText } from 'prismic-reactjs';

const { Elements } = RichText;

// -- Function to add unique key to props
const propsWithUniqueKey = (props, key) => Object.assign(props || {}, { key });

// -- HTML Serializer
// This function will be used to change the way the HTML is loaded
const htmlSerializer = (type, element, content, children, key) => {
  let props = {};
  switch (type) {
    // Add a class to hyperlinks
    case Elements.hyperlink:
      props = Object.assign({
        href: element.data.url,
      },
      {
        target: '_blank',
        rel: 'noopener noreferrer',
      });
      return React.createElement('a', propsWithUniqueKey(props, key), children);

    // Return null to stick with the default behavior
    default:
      return null;
  }
};

export default htmlSerializer;
