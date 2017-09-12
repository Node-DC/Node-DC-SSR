
import React from 'react';
import PropTypes from 'prop-types';

export default class TagCount extends React.Component {
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
    useCache: false
  };

  static cache = {};

  createTag(children) {
    const {node, leaf} = this.props;
    if(children.length > 0) {
      return React.createElement(node, null, ...children);
    } else {
      return React.createElement(node, null, leaf);
    }
  }

  generateTagsHelper(curdepth, children, genState) {
    const {count, depth} = this.props;

    if(curdepth >= depth) {
      return this.createTag([]);
    }

    const newChildren = Math.max(0, Math.min(children, count - genState.count));
    genState.count += newChildren;

    const elems = new Array(newChildren);
    for(let ii = 0; ii < newChildren; ++ii) {
      elems[ii] = this.generateTagsHelper(curdepth + 1, children, genState);
    }

    return this.createTag(elems);
  }

  generateTags() {
    const {depth, node, count} = this.props;

    let children = 2;

    for(; ; ++children) {
      let nc = (Math.pow(children, depth + 1) - 1) / (children - 1);
      if(nc >= count) {
        break;
      }
    }

    const genState = {count: 1};

    const tags = React.createElement(node, null,
      this.generateTagsHelper(0, children, genState));

    return tags;
  }

  render() {
    const {useCache, count, depth, node, leaf} = this.props;
    let key;
    if(useCache) {
      key = [count, depth, node, leaf].join('<=>');
      if(TagCount.cache[key]) {
        return TagCount.cache[key];
      }
    }

    const tags = this.generateTags();

    if(useCache) {
      TagCount.cache[key] = tags;
    }

    return tags;
  }
};
