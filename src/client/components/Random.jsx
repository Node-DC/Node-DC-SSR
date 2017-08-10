
import React from 'react';
import PropTypes from 'prop-types';

import RandomTags from './generators/RandomTags';

class Random extends React.Component {

  render() {
    const id = this.props.params.id || 0;
    return (
        <RandomTags seed={id} />
      );
  }
}

export default Random;
