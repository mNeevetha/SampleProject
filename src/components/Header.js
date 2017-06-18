import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Drawer from 'react-md/lib/Drawers';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';
import Toolbar from 'react-md/lib/Toolbars';
import { withRouter } from 'react-router';

import clinCentricTitle from '../assets/images/ClinCentric_title.svg';
import logo from '../assets/images/ClinCentric_Cross.svg';

import '../assets/stylesheets/Header.scss';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      position: 'left',
    };
  }

  handleLogout() {
    const { history, logout } = this.props;

    logout();
    history.push('/login');
  }

  handleRouteToHome() {
    const { history } = this.props;

    this.handleCloseDrawer();
    history.push('/');
  }

  handleRouteToHistory() {
    const { history, currentUser } = this.props;

    this.handleCloseDrawer();
    history.push(`users/${currentUser.id}/history`);
  }

  handleToggle(visible) {
    this.setState({ visible });
  }

  handleCloseDrawer() {
    this.setState({ visible: false });
  }

  handleToggleLeft() {
    this.setState({ visible: !this.state.visible, position: 'left' });
  }

  render() {
    const { currentUser } = this.props;
    const left = this.state.position === 'left';
    const menuIcon = (
      <Button
        className="btn-color btn-align"
        icon
        key="nav"
        onClick={() => this.handleToggleLeft()}
      >
        menu
      </Button>
    );
    const close = (
      <Button
        className="close-arrow"
        icon
        onClick={() => this.handleCloseDrawer()}
      >
        {left ? 'arrow_back' : ''}
      </Button>
    );
    const header = (
      <Toolbar
        actions={left ? close : null}
        className="md-divider-border md-divider-border--bottom"
        nav={left ? null : close}
      />
    );
    const toolbarListItems = [
      <ListItem
        key="home"
        leftIcon={<FontIcon className="drawer__icon">home</FontIcon>}
        onClick={() => this.handleRouteToHome()}
        primaryText="Home"
      />,
      <ListItem
        key="history"
        leftIcon={<FontIcon className="drawer__icon">history</FontIcon>}
        onClick={() => this.handleRouteToHistory()}
        primaryText="Search History"
      />,
      <ListItem
        key="signout"
        leftIcon={<FontIcon className="drawer__icon">settings</FontIcon>}
        onClick={() => this.handleLogout()}
        primaryText="Sign Out"
      />,
    ];

    return (
      <div className="toolbar-group">
        <Toolbar nav={isEmpty(currentUser) ? null : menuIcon} themed>
          <img className="logo-align" role="presentation" src={logo} />
          <img
            className="title-align"
            role="presentation"
            src={clinCentricTitle}
          />
        </Toolbar>

        <div className="md-grid">
          <Drawer
            {...this.state}
            header={header}
            navItems={toolbarListItems}
            onVisibilityToggle={() => this.handleToggle()}
            style={{ zIndex: 16 }}
            type={Drawer.DrawerTypes.TEMPORARY}
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object,
  logout: PropTypes.func,
};

export default withRouter(Header);
