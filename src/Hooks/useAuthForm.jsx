import { useReducer } from "react";
import {
  FULL_NAME_ACTION,
  EMAIL_ACTION,
  PASSWORD_ACTION,
  CONFIRM_PASSWORD_ACTION,
  DISPLAY_ACTION,
} from "../utils/constants";
const authFormReducer = (state, action) => {
  switch (action.type) {
    case FULL_NAME_ACTION:
      return { ...state, fullName: action.payload.fullName };
    case EMAIL_ACTION:
      return { ...state, email: action.payload.email };
    case PASSWORD_ACTION:
      return { ...state, password: action.payload.password };
    case CONFIRM_PASSWORD_ACTION:
      return { ...state, confirmPassword: action.payload.confirmPassword };
    case DISPLAY_ACTION:
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
