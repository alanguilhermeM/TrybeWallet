// Esse reducer será responsável por tratar as informações da pessoa usuária
import { REQUEST_API_SUCCESS, REQUEST_API_EXPENSES, DELETE_EXPENSES,
  EDIT_EXPENSES, SAVE_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case REQUEST_API_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EDIT:
    return {
      ...state,
      editor: false,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
