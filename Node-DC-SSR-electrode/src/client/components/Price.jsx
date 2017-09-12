
import React from 'react';
import {cyan500} from 'material-ui/styles/colors';

class Price extends React.Component {

  static defaultProps = {
    value: '0.00',
    size: 24
  };

  render() {
    const {value, size} = this.props;

    return (
        <div style={{display: 'inline-block', fontSize: Math.max(size, 4), color: cyan500}}>
          <span style={{verticalAlign: 'super', fontSize: Math.max(size - 8, 2)}}>$</span>
          {value}
        </div>
      );
  }
}

export default Price;
