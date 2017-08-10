
import React from 'react';
import PropTypes from 'prop-types';

import TagCount from './generators/TagCount';

class Count extends React.Component {

  render() {
    const count = this.props.params.count || 5000;
    return (
        <TagCount count={count} />
      );
  }
}

export default Count;
