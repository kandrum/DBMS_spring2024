// Action Types
const SET_LOGIN = 'SET_LOGIN';

// Initial state
const initialState = {
  isLogin: false,
};

// Reducer
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
export const setLogin = (value) => ({
  type: SET_LOGIN,
  payload: value,
});
