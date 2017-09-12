
import React from 'react';
import range from 'lodash/range';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import ToggleStarHalf from 'material-ui/svg-icons/toggle/star-half';
import {amberA700} from 'material-ui/styles/colors';


class RatingStars extends React.Component {

  static defaultProps = {
    rating: 0,
    maxStars: 5,
    size: 24,
    color: amberA700,
    style: {}
  };

  render() {
    const {rating, maxStars, size, color, style} = this.props;
    const rounded = Math.round(rating * 2) / 2.;
    const filled = Math.floor(rounded);
    const half = rounded - filled > 0;
    const remaining = maxStars - Math.ceil(rounded);
    const svgStyle = {width: size, heigth: size, padding: 0};
    return (
      <div style={Object.assign({display: 'inline-block'}, style)}>
        {range(filled).map((ii) =>
          <ToggleStar
            key={`f${ii}`}
            color={color} style={svgStyle}/>)}
        {half ? <ToggleStarHalf color={color} style={svgStyle} /> : ''}
        {range(Math.max(0, remaining)).map((ii) =>
          <ToggleStarBorder key={`b${ii}`} color={color} style={svgStyle} />
        )}
      </div>
    );
  }
}

export default RatingStars;
