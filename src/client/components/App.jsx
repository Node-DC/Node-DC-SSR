
import '../styles/base.css';

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {spacing} from 'material-ui/styles';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import AppDrawer from './AppDrawer';

class App extends React.Component {

  state = {
    width: LARGE,
    navDrawerOpen: false
  };

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  };

  handleChangeRequestNavDrawer = open => {
    this.setState({
      navDrawerOpen: open
    });
  };

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme()
    });
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400
      },
      content: {
        margin: spacing.desktopGutter
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`
      }
    };
    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }
    return styles;
  }

  render() {
    const styles = this.getStyles();

    let {
      navDrawerOpen
    } = this.state;

    const theme = getMuiTheme();
    const {prepareStyles} = theme;

    let docked = false;
    let showMenuIconButton = true;

    if (this.props.width === LARGE) {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1
      };
      styles.root.paddingLeft = 256;
    }
    const title = 'Node-EIS-SSR';
    return (
        <div className="content">
          <AppBar
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            title={title}
            zDepth={0}
            style={styles.appBar}
            showMenuIconButton={showMenuIconButton}
          />
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.content)}>
              {this.props.children}
            </div>
          </div>
          <AppDrawer
            title={title}
            style={styles.navDrawer}
            docked={docked}
            onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
            open={navDrawerOpen}
          />

        </div>
      );
  }
}

App.childContextTypes = {
    muiTheme: PropTypes.object
};


class ExportApp extends withWidth()(App) {
  constructor(props) {
    super(props);
    // By default, withWidth disables SSR
    // Since we care about SSR, we just pretend we are in a "LARGE" state
    this.state.width = LARGE;
  }
}
export default ExportApp;
