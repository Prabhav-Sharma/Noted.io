const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "SIGN UP":
      console.log("remove from auth reducer");
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
