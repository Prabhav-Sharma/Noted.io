import {
  LOGOUT_ACTION,
  LOGIN_ACTION,
  USER_ACTION,
  SIGN_UP_ACTION,
} from "../../utils/constants";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
    case SIGN_UP_ACTION:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case USER_ACTION:
      return { ...state, user: action.payload.user };

    case LOGOUT_ACTION:
      localStorage.removeItem("token");
      return { ...state, token: null, user: {}, isAuthenticated: false };
    default:
      return state;
  }
};

export { authReducer };
