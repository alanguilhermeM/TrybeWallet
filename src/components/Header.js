import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.user.email,
  };
}

export default connect(mapStateToProps)(Header);
