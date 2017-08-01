
import React from 'react';
import Divider from 'material-ui/Divider';

import ProductReview from './ProductReview';

class ProductReviewPage extends React.Component {

  static defaultProps = {
    reviews: [],
    currentPage: 0,
    itemsPerPage: 3
  };


  render() {

    const {
        reviews,
        currentPage,
        itemsPerPage
      } = this.props;

    const startIndex = currentPage * itemsPerPage;
    const elems = [];
    for (const [idx, review] of reviews.slice(startIndex,
                                (currentPage + 1) * itemsPerPage)
                              .entries()) {

      if (idx > 0) {
        elems.push(<Divider key={`hr${idx}`} />);
      }

      elems.push(
        <ProductReview
              key={startIndex + idx}
              review={review}
            />);

    }

    return (
      <div>
      { elems.length > 0 ?
        elems :
        'No questions has no reviews'
      }
      </div>
    );
  }
}

export default ProductReviewPage;
