import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalValue = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const { currency } = curr;
      const taxCurrency = curr.exchangeRates[currency].ask;
      const price = (Number(curr.value) * Number(taxCurrency));
      return acc + price;
    }, 0);
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <span data-testid="total-field">{ this.totalValue() }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Header);
