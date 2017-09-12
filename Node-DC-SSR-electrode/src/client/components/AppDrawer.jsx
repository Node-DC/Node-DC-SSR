import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {spacing, typography} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

const SelectableList = makeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8
  }
};

class AppDrawer extends React.Component {

  static propTypes = {
    categories: PropTypes.array.isRequired
  };

  render() {
    const {
        style,
        docked,
        onRequestChangeNavDrawer,
        open,
        categories,
        title
    } = this.props;

    return (

      <Drawer
        style={styles}
        docked={docked}
        onRequestChange={onRequestChangeNavDrawer}
        open={open}
      >

        <div style={styles.logo}>{title}</div>
        <List>
          <Subheader>Categories</Subheader>
          {categories.map((cat, val) =>
                <ListItem key={val} primaryText={cat} value={val} />
          )}
        </List>
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  const {categories} = state;
  return {
    categories: categories || []
  };
}


export default connect(mapStateToProps)(AppDrawer);
