
import React from 'react';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

import Price from './Price';
import RatingStars from './RatingStars';

class ProductsPreview extends React.Component {
  render() {
    const {title, products} = this.props;
    if (!products || products.length < 1) {
      return <div />;
    }
    return (
      <div>
        <Subheader style={{
          marginTop: 10,
          lineHeight: '24px',
          color: 'black',
          fontSize: '18px'
        }}>{title}</Subheader>
        <div style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
          {products.map((pp, idx) =>
            <Paper key={idx} style={{padding: 10, width: 120, marginRight: 10}}>
              <img src={pp.pictures[0]} style={{width: 100, border: '1px solid gray'}} />
              <div>{pp.name}</div>
              <RatingStars rating={pp.rating.score} size={12}/>&nbsp;
              <Price size={15} value={pp.price} />
            </Paper>
          )}
        </div>
      </div>
    );
  }
}

export default ProductsPreview;
