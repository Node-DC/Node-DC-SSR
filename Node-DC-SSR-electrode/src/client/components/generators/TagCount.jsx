
import React from 'react';
import PropTypes from 'prop-types';

const numberOfChildren = (depth, count) => {

    if(depth == 1 || depth > count) {
      return count;
    }

    let children = 2;

    for(; ; ++children) {
      let nc = (Math.pow(children, depth + 1) - 1) / (children - 1);
      if(nc >= count) {
        break;
      }
    }

    return children;
  };

export default class TagCount extends React.Component {

  render() {
    let {depth, count: tagCount} = this.props;

    if(depth <= 0) {
      return <div>{'This is a leaf'}</div>;
    }

    tagCount -= 1;

    const childCount = numberOfChildren(depth, tagCount);
    const childTagCount = Math.ceil(tagCount / childCount);
    let tagsRemaining = tagCount;

    const children = [];

    for(let ii = 0; ii < childCount; ++ii) {
      children.push(<TagCount
                        key={ii}
                        depth={depth - 1}
                        count={Math.min(tagsRemaining, childTagCount)}
                        />);

      tagsRemaining -= childTagCount;
    }

    return <div>{children}</div>;
  }
}
