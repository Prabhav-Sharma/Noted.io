import { useReducer } from "react";

const authFormReducer = (state, action) => {
  switch (action.type) {
    case "FULL_NAME":
      return { ...state, fullName: action.payload.fullName };
    case "EMAIL":
      return { ...state, email: action.payload.email };
    case "PASSWORD":
      return { ...state, password: action.payload.password };
    case "CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload.confirmPassword };
    case "DISPLAY":
      if (state.display === action.payload.display) return state;
      return {
        ...state,
        display: action.payload.display,
        fullName: "",
        password: "",
        confirmPassword: "",
        email: "",
      };
    default:
      return state;
  }
};

const useAuthForm = () => {
  const [authFormState, authFormDispatch] = useReducer(authFormReducer, {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    display: "LOGIN",
  });

  return { authFormState, authFormDispatch };
};

export default useAuthForm;
