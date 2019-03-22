import { userConstants } from "../_constants";

const initialState = {
  loading: false,
  errors: {},
  user: {},
  isAuthenticated: false
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.ERORRS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case userConstants.SET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        errors: {},
        user: action.payload,
        isAuthenticated: true
      };
    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {}
      };
    default:
      return state;
  }
}
