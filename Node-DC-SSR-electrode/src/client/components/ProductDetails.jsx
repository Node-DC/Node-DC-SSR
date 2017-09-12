
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import {lightGreen500, fullWhite} from 'material-ui/styles/colors';
import SocialPeople from 'material-ui/svg-icons/social/people';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';

import RatingStars from './RatingStars';
import Price from './Price';
import PictureCarousel from './PictureCarousel';

import base from '../styles/base.css';

class ProductDetails extends React.Component {

  state = {
    open: false
  };

  handleTouchTap = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const props = this.props;

    return (
        <Card style={{minWidth: 400}}>
          <CardTitle
            style={{paddingBottom: 0}}
            title={<strong>{props.name}</strong>}
            subtitle={
              <div>
                By {props.manufacturer}<br />
                <RatingStars rating={props.rating.score}/>
                <div style={{display: 'inline-block'}}>
                  <div style={{display: 'inline-block', position: 'relative', top: -5, marginLeft: 10}}>
                    {props.rating.numberOfReviews.toLocaleString('en-US')}&nbsp;
                  </div>
                </div>
                <SocialPeople />
              </div>
            }
          />
          {props.tags && props.tags.length > 0 ?
            <CardText style={{display: 'flex', flexWrap: 'wrap', paddingTop: 0}}>
            {props.tags.map((tt, idx) =>
              <Chip key={tt + idx} style={{margin: 4}}>{tt}</Chip>
            )}
            </CardText>
          : ''}
          <Divider />
          <CardText className={base.clearfix}>
            <div style={{float: 'right', padding: 15, height: '100%'}}>
              <Price value={props.price} /><br />
              <RaisedButton
                secondary={true}
                labelColor={fullWhite}
                labelStyle={{fontWeight: 'bold', textTransform: 'none'}}
                onTouchTap={this.handleTouchTap}
                label="Add to cart"
              />
              <Snackbar
                open={this.state.open}
                message="Item added to cart"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
            </div>
            <PictureCarousel pictures={props.pictures} />
          </CardText>
          <Divider />
          <CardText>
            <div
dangerouslySetInnerHTML={{'__html': props.description.replace('\n', '<br /><br />')}} />
            {props.highlights && props.highlights.length > 0 ?
              <div>
                <strong>Highlights:</strong>
                <ul style={{margin: 0}}>
                  {props.highlights.map(hh =>
                    <li key={hh}>
                      {hh}
                    </li>
                  )}
                </ul>
              </div>
            : ''}
          </CardText>
        </Card>
    );
  }
}

export default ProductDetails;
