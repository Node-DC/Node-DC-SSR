
import React from 'react';
import {CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';

import RatingStars from './RatingStars';

import base from '../styles/base.css';

class ProductReview extends React.Component {

  render() {
    const {review, title, score, user, date, usefulness} = this.props.review;
    const svgStyle = {
      width: 12, heigth: 12, position: 'relative', top: 7
    };
    return (
      <div>
        <CardHeader title={
          <div>
            {title}
            <RatingStars
                rating={score}
                size={15}
                style={{
                  margin: 0,
                  padding: 0,
                  display: 'block'
                }} />
          </div>
          }
          subtitle={`By ${user} (${date})`}
          style={{padding: 0}}/>
        <div style={{paddingBottom: 5}}>
          <div
dangerouslySetInnerHTML={{'__html': review.replace('\n', '<br />')}} />
          <div>
            Helpful?&nbsp;&nbsp;
              <ActionThumbUp style={svgStyle} />{usefulness.positive}
              &nbsp;
              <ActionThumbDown style={svgStyle} />{usefulness.negative}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductReview;
