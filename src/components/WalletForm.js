import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { minhaAcaoAssincrona, thunkExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(minhaAcaoAssincrona());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    this.setState((previusState) => ({
      ...previusState,
      id: previusState.id + 1,
    }));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    return dispatch(thunkExpenses(this.state));
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        WalletForm
        <form>
          <label>
            Valor da Despesa:
            <input
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Descrição da Despesa:
            <input
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Selecione a Moeda:
            <select
              name="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((currencie) => (
                <option key={ Math.random() }>{currencie}</option>
              ))}
            </select>
          </label>
          <label>
            Metodo de Pagamento:
            <select
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label>
            Categoria da despesa:
            <select
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ (event) => this.handleClick(event) }
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
  };
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
