import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

const email = 'email@email.com';

describe('Testes da pagina de Login', () => {
  test('Existem dois inputs na pagina', () => {
    renderWithRouterAndRedux(<App />);
    const loginText = screen.getByText(/login/i);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const loginInput = screen.getByLabelText(/password:/i);

    expect(loginText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(loginInput).toBeInTheDocument();
  });

  test('Botão "Entrar" está desabilitado ao iniciar a pag', () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toBeDisabled();
  });

  test('Botão entrar é habilitado ao insererir os dados de email e senhas corretos', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const loginInput = screen.getByLabelText(/password:/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, email);
    userEvent.type(loginInput, '123456');

    expect(btn).toBeEnabled();
  });

  test('Ao clicar no botão Entrar, renderiza a pagina Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const loginInput = screen.getByLabelText(/password:/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, email);
    userEvent.type(loginInput, '123456');
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
