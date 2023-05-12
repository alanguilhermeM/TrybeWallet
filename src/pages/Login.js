import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validation = () => {
    const { email, password } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valido = regex.test(email);
    const n = 5;
    return !(valido === true && password.length > n);
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        Login
        <label>
          Email:
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Password:
          <input
            value={ password }
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          onClick={ this.handleClick }
          disabled={ this.validation() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.email,
});

export default connect(mapStateToProps)(withRouter(Login));
