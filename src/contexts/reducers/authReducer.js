const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "SIGNUP":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, token: null, user: {}, isAuthenticated: false };
    default:
      return state;
  }
};

export { authReducer };
