import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { minhaAcaoAssincrona, requestApiExpenses, thunkExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenses: [],
    value: 0,
    description: '',
    currency: '',
    method: '',
    tag: '',
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

  handleClick = () => {
    const {
      expenses,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    this.setState((previusState) => ({
      expenses: [...previusState, value, description, currency, method, tag],
    }));
    const { dispatch } = this.props;
    dispatch(requestApiExpenses(expenses));
    dispatch(thunkExpenses());
  };

  render() {
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <form>
          <label>
            Valor da Despesa:
            <input
              name="value"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Descrição da Despesa:
            <input
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Selecione a Moeda:
            <select
              name="currency"
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
            <select name="tag" data-testid="tag-input" onChange={ this.handleChange }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
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
