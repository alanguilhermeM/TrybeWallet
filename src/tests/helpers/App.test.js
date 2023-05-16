import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';

const mockData = {
  USD: {
    code: 'USD',
    codein: 'BRL',
    name: 'Dólar Americano/Real Brasileiro',
    high: '4.7558',
    low: '4.6908',
    varBid: '0.0234',
    pctChange: '0.49',
    bid: '4.7526',
    ask: '4.7531',
    timestamp: '1653943661',
    create_date: '2022-05-30 17:47:41',
  },
  USDT: {
    code: 'USD',
    codein: 'BRLT',
    name: 'Dólar Americano/Real Brasileiro Turismo',
    high: '4.775',
    low: '4.705',
    varBid: '0.015',
    pctChange: '0.32',
    bid: '4.63',
    ask: '4.92',
    timestamp: '1653938040',
    create_date: '2022-05-30 16:14:00',
  },
  CAD: {
    code: 'CAD',
    codein: 'BRL',
    name: 'Dólar Canadense/Real Brasileiro',
    high: '3.7575',
    low: '3.699',
    varBid: '0.0394',
    pctChange: '1.06',
    bid: '3.7552',
    ask: '3.7559',
    timestamp: '1653943661',
    create_date: '2022-05-30 17:47:42',
  },
  EUR: {
    code: 'EUR',
    codein: 'BRL',
    name: 'Euro/Real Brasileiro',
    high: '5.1278',
    low: '5.0451',
    varBid: '0.0514',
    pctChange: '1.01',
    bid: '5.1225',
    ask: '5.1268',
    timestamp: '1653943663',
    create_date: '2022-05-30 17:47:43',
  },
  GBP: {
    code: 'GBP',
    codein: 'BRL',
    name: 'Libra Esterlina/Real Brasileiro',
    high: '6.0195',
    low: '5.9272',
    varBid: '0.0485',
    pctChange: '0.81',
    bid: '6.013',
    ask: '6.0174',
    timestamp: '1653943664',
    create_date: '2022-05-30 17:47:44',
  },
  ARS: {
    code: 'ARS',
    codein: 'BRL',
    name: 'Peso Argentino/Real Brasileiro',
    high: '0.0396',
    low: '0.0391',
    varBid: '0',
    pctChange: '0',
    bid: '0.0396',
    ask: '0.0396',
    timestamp: '1653943661',
    create_date: '2022-05-30 17:47:45',
  },
  BTC: {
    code: 'BTC',
    codein: 'BRL',
    name: 'Bitcoin/Real Brasileiro',
    high: '147.253',
    low: '137',
    varBid: '8523',
    pctChange: '6.14',
    bid: '146.994',
    ask: '147.235',
    timestamp: '1653942059',
    create_date: '2022-05-30 17:20:59',
  },
  LTC: {
    code: 'LTC',
    codein: 'BRL',
    name: 'Litecoin/Real Brasileiro',
    high: '321.9',
    low: '299.02',
    varBid: '21.5',
    pctChange: '7.2',
    bid: '320.89',
    ask: '323.04',
    timestamp: '1653942031',
    create_date: '2022-05-30 17:20:31',
  },
  JPY: {
    code: 'JPY',
    codein: 'BRL',
    name: 'Iene Japonês/Real Brasileiro',
    high: '0.03729',
    low: '0.03671',
    varBid: '0',
    pctChange: '0',
    bid: '0.03725',
    ask: '0.03727',
    timestamp: '1653943661',
    create_date: '2022-05-30 17:47:46',
  },
  CHF: {
    code: 'CHF',
    codein: 'BRL',
    name: 'Franco Suíço/Real Brasileiro',
    high: '4.9667',
    low: '4.8847',
    varBid: '0.0241',
    pctChange: '0.49',
    bid: '4.9641',
    ask: '4.9651',
    timestamp: '1653943661',
    create_date: '2022-05-30 17:47:47',
  },
  AUD: {
    code: 'AUD',
    codein: 'BRL',
    name: 'Dólar Australiano/Real Brasileiro',
    high: '3.4232',
    low: '3.3658',
    varBid: '0.0448',
    pctChange: '1.33',
    bid: '3.4195',
    ask: '3.4218',
    timestamp: '1653943664',
    create_date: '2022-05-30 17:47:44',
  },
  CNY: {
    code: 'CNY',
    codein: 'BRL',
    name: 'Yuan Chinês/Real Brasileiro',
    high: '0.714',
    low: '0.7037',
    varBid: '0.0072',
    pctChange: '1.01',
    bid: '0.7134',
    ask: '0.7137',
    timestamp: '1653943622',
    create_date: '2022-05-30 17:47:02',
  },
  ILS: {
    code: 'ILS',
    codein: 'BRL',
    name: 'Novo Shekel Israelense/Real Brasileiro',
    high: '1.4274',
    low: '1.4118',
    varBid: '0.0102',
    pctChange: '0.72',
    bid: '1.4235',
    ask: '1.4237',
    timestamp: '1653943563',
    create_date: '2022-05-30 17:46:03',
  },
  ETH: {
    code: 'ETH',
    codein: 'BRL',
    name: 'Ethereum/Real Brasileiro',
    high: '9.26732',
    low: '6',
    varBid: '697.24',
    pctChange: '8.14',
    bid: '9.22226',
    ask: '9.2621',
    timestamp: '1653942032',
    create_date: '2022-05-30 17:20:32',
  },
  XRP: {
    code: 'XRP',
    codein: 'BRL',
    name: 'XRP/Real Brasileiro',
    high: '1.93',
    low: '1.84',
    varBid: '0.09',
    pctChange: '4.73',
    bid: '1.92',
    ask: '1.93',
    timestamp: '1653942033',
    create_date: '2022-05-30 17:20:33',
  },
  DOGE: {
    code: 'DOGE',
    codein: 'BRL',
    name: 'Dogecoin/Real Brasileiro',
    high: '0.412416',
    low: '0.388597',
    varBid: '0.02336',
    pctChange: '6.01',
    bid: '0.412194',
    ask: '0.412194',
    timestamp: '1653943636',
    create_date: '2022-05-30 17:47:16',
  },
};

const email = 'email@email.com';

const initialState = {
  user: { email },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockReturnValue(mockData),
  });
});

afterEach(jest.restoreAllMocks);

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

  test('Verifica se existem 5 inputs para a criação da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByRole('textbox', { name: /valor da despesa:/i });
    const inputDescription = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const inputCurrency = screen.getByRole('combobox', { name: /selecione a moeda:/i });
    const inputMethod = screen.getByRole('combobox', { name: /metodo de pagamento:/i });
    const inputTag = screen.getByRole('combobox', { name: /categoria da despesa:/i });

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
  });

  test('Verifica o valor total das despesas é somado na tela', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState });
    screen.getByRole('heading', { name: /email@email\.com/i });
    screen.getByText(/0\.00/i);
    const inputValue = screen.getByRole('textbox', { name: /valor da despesa:/i });
    // const btn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    userEvent.type(inputValue, '10');
    expect(screen.getByLabelText(/valor/i).value).toBe('10');
    // userEvent.click(btn);
    // screen.getByText(/49\.36/i);
  });
});
