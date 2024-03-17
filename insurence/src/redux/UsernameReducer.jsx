// Action Types
const SET_USERNAME = 'SET_USERNAME';

// Initial state
const initialState = {
  isLogin: false,
  userName: '',
};

// Reducer
export const username = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
export const setUsername = (name) => ({
  type: SET_USERNAME,
  payload: name,
});
