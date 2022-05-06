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

    case "USER":
      return { ...state, user: action.payload.user };

    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, token: null, user: {}, isAuthenticated: false };
    default:
      return state;
  }
};

export { authReducer };
