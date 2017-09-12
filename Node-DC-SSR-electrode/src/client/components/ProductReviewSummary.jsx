
import React from 'react';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import SocialPeople from 'material-ui/svg-icons/social/people';
import range from 'lodash/range';

import RatingStars from './RatingStars';
import ProductReview from './ProductReview';

class ProductReviewSummary extends React.Component {

  static defaultProps = {
    summary: {}
  };

  render() {
    const {
        score,
        numberOfReviews,
        breakdown
      } = this.props.summary;
    return (
      <div style={{display: 'flex'}}>
        <div style={{flex: '0 1 200px', textAlign: 'center'}}>
          <div style={{fontSize: '24px'}}>
            {score.toFixed(1)}
          </div>
          <RatingStars rating={score} />
          <div>
            <SocialPeople style={{
                width: 15,
                height: 15,
                position: 'relative',
                top: 2,
                marginTop: -10,
                paddingRight: 5
              }} />
            {numberOfReviews}&nbsp;Total
          </div>
        </div>
        <div style={{
              flex: '1 1 auto',
              minWidth: 200,
              maxWidth: 400
            }}>
          {range(5, 0, -1).map(idx =>
              <div key={`rating_${idx}`} style={{display: 'flex'}}>
                <div>
                  <RatingStars
                    size={12} rating={idx}/>
                </div>
                <div style={{flex: '1 1 auto', display: 'inline-block'}}>
                  <LinearProgress
                    mode="determinate"
                    style={{marginTop: 10, marginLeft: 5}}
                    value={breakdown[idx]}
                    max={numberOfReviews} />
                </div>
                <div style={{marginLeft: 15}}>{breakdown[idx]}</div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default ProductReviewSummary;
