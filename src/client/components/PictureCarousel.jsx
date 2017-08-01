

import React from 'react';
import {cyan500} from 'material-ui/styles/colors';
import {GridList, GridTile} from 'material-ui/GridList';

class PictureCarousel extends React.Component {

  state = {
    index: 0
  }

  static defaultProps = {
    pictures: []
  };

  handleImageChange(idx) {
    this.setState({
      index: idx
    });
  }

  render() {
    const {pictures} = this.props;
    const {index} = this.state;
    if (!pictures || pictures.length < 1) {
      return <div>No pictures available</div>;
    }
    return (
      <GridList cols={1} rows={2} cellHeight="auto">
        <GridTile style={{}}>
          <div style={{height: 150, textAlign: 'center'}}>
            <img src={pictures[index]} />
          </div>
        </GridTile>
        <GridTile>
          <GridList cols={pictures.length} rows={1} cellHeight={102}
                style={{overflowX: 'auto', margin: 1}}>
            {
              pictures.map((pp, idx) => (
                <GridTile
                    key={pp + idx}
                    style={{
                      width: 100,
                      cursor: 'pointer',
                      border: '1px solid gray'}}>
                  <img src={pp} onTouchTap={() => this.handleImageChange(idx)} />
                </GridTile>
              ))
            }

          </GridList>
        </GridTile>
      </GridList>
    );
  }
}

export default PictureCarousel;

