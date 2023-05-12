export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_FAILURE = 'REQUEST_API_FAILURE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const requestApiSuccess = (payload) => ({
  type: REQUEST_API_SUCCESS,
  payload,
});

export const requestApiFailure = (error) => ({
  type: REQUEST_API_FAILURE,
  error,
});

export const minhaAcaoAssincrona = () => async (dispatch) => {
  dispatch(requestApi());
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
