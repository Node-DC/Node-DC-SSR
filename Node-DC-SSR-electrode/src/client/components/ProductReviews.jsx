
import React from 'react';
import {
  Card,
  CardTitle,
  CardText
} from 'material-ui/Card';

import ProductReviewSummary from './ProductReviewSummary';
import ProductReviewPage from './ProductReviewPage';
import Pager from './Pager';

class ProductReviews extends React.Component {

  state = {
    currentPage: 0
  };

  static defaultProps = {
    reviews: [],
    summary: {},
    reviewsPerPage: 3
  };

 updatePage = page => {
    this.setState({
      currentPage: page
    });
  }

  render() {
    const {currentPage} = this.state;
    const {
        reviews,
        summary,
        reviewsPerPage
      } = this.props;
    return (
      <Card style={{marginTop: 24}}>
        <CardTitle
          title="Reviews"
          style={{paddingBottom: 0}}
        />
        <CardText style={{paddingTop: 0, paddingBottom: 0}}>
          <ProductReviewSummary summary={summary} />
          <ProductReviewPage
            reviews={reviews}
            currentPage={currentPage}
            itemsPerPage={reviewsPerPage}/>
          <Pager
            onUpdate={this.updatePage}
            selected={currentPage}
            totalItems={(reviews && reviews.length) || 0}
            itemsPerPage={reviewsPerPage}
             /> <br/>
        </CardText>
      </Card>
    );
  }
}

export default ProductReviews;
