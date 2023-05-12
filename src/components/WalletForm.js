import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { minhaAcaoAssincrona } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(minhaAcaoAssincrona());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <form>
          <label>
            Valor da Despesa:
            <input data-testid="value-input" />
          </label>
          <label>
            Descrição da Despesa:
            <input data-testid="description-input" />
          </label>
          <label>
            Selecione a Moeda:
            <select data-testid="currency-input">
              {currencies.map((currencie) => (
                <option key={ Math.random() }>{currencie}</option>
              ))}
            </select>
          </label>
          <label>
            Metodo de Pagamento:
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label>
            Categoria da despesa:
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
  };
}

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
