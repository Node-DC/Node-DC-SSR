
import React from 'react';
import PropTypes from 'prop-types';

export default class RandomTags extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    depth: PropTypes.number,
    node: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
      ]),
    leaf: PropTypes.node,
    useCache: PropTypes.bool
  };

  static defaultProps = {
    count: 3000,
    depth: 7,
    node: 'div',
    leaf: '.',
    useCache: true
  };

  static cache = {};

  createTag(children) {
    const {node, leaf} = this.props;
    if(children.length > 0) {
      return React.createElement(node, null, ...children);
    } else {
      return leaf;
    }
  }

  generateTagsHelper(curdepth, children) {
    const {depth} = this.props;

    if(curdepth >= depth) {
      return this.createTag([]);
    }

    const elems = new Array(children);
    for(let ii = 0; ii < children; ++ii) {
      elems[ii] = this.generateTagsHelper(curdepth + 1, children);
    }

    return this.createTag(elems);
  }

  generateTags() {
    const {depth, node, count} = this.props;

    let children = 0;

    for(children = 0; ; ++children) {
      let nc = (Math.pow(children, depth + 1) - 1) / (children - 1);
      if(nc >= count) {
        break;
      }
    }

    return React.createElement(node, null,
      this.generateTagsHelper(0, children));
  }

  render() {
    const {useCache, count, depth} = this.props;
    const key = count + ' ' + depth;
    if(useCache && RandomTags.cache[key]) {
      return RandomTags.cache[key];
    }

    const tags = this.generateTags();

    if(useCache) {
      RandomTags.cache[key] = tags;
    }

    return tags;
  }
};
