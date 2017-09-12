
import React from 'react';
import PropTypes from 'prop-types';
import randomSeed from 'random-seed';

export default class RandomTags extends React.Component {
  static propTypes = {
    seed: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
    minDepth: PropTypes.number,
    maxDepth: PropTypes.number,
    minChildrenPerNode: PropTypes.number,
    maxChildrenPerNode: PropTypes.number,
    node: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
      ]),
    leaf: PropTypes.node,
    useCache: PropTypes.bool
  };

  static defaultProps = {
    minDepth: 3,
    maxDepth: 3,
    minChildrenPerNode: 20,
    maxChildrenPerNode: 20,
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

  generateTagsHelper(rand, depth) {
    const {
      minDepth,
      maxDepth,
      minChildrenPerNode,
      maxChildrenPerNode,
      leaf} = this.props;

    const children = rand.intBetween(
                          minChildrenPerNode,
                          maxChildrenPerNode);

    const elems = new Array(children);
    for(let ii = 0; ii < children; ++ii) {
      const testDepth = rand.intBetween(
                            minDepth,
                            maxDepth);
      if(depth < testDepth) {

        elems[ii] = this.generateTagsHelper(
            rand, depth + 1);
      } else {
        elems[ii] = leaf;
      }
    }

    return this.createTag(elems);
  }

  generateTags(seed) {
    const {minDepth, node} = this.props;
    const rand = randomSeed(seed);

    return React.createElement(node, null,
      this.generateTagsHelper(rand, 0));
  }

  render() {
    const {useCache, seed} = this.props;
    if(useCache && RandomTags.cache[seed]) {
      return RandomTags.cache[seed];
    }

    const tags = this.generateTags(seed);

    if(useCache) {
      RandomTags.cache[seed] = tags;
    }

    return tags;
  }
};
