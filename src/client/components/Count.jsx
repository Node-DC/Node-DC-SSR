
import React from 'react';
import PropTypes from 'prop-types';

import TagCount from './generators/TagCount';

class Count extends React.Component {

  render() {
    const count = this.props.params.count || 5000;
    const depth = this.props.params.depth || 7;
    return (
        <TagCount count={parseInt(count, 10)} depth={parseInt(depth, 10)} />
      );
  }
}

export default Count;
