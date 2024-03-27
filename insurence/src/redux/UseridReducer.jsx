// Action Types
const SET_USERID = 'SET_USERID';

// Initial state
const initialState = {
  isLogin: false,
  userId: '',
};

// Reducer
export const userid = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
export const setUserid = (id) => ({
  type: SET_USERID,
  payload: id,
});
