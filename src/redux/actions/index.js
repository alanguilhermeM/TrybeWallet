export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_API_EXPENSES = 'REQUEST_API_EXPENSES';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const requestApiExpenses = (payload) => ({
  type: REQUEST_API_EXPENSES,
  payload,
});

export const requestApiSuccess = (payload) => ({
  type: REQUEST_API_SUCCESS,
  payload,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export const minhaAcaoAssincrona = () => async (dispatch) => {
  try {
    const api = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(api);
    const data = await response.json();
    const filtrado = Object.keys(data).filter((coin) => coin !== 'USDT');
    dispatch(requestApiSuccess(filtrado));
  } catch (error) {
    dispatch(requestApiFailure(error));
  }
};

export const thunkExpenses = (state) => async (dispatch) => {
  const api = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(api);
  const data = await response.json();
  dispatch(requestApiExpenses({ ...state, exchangeRates: data }));
};
