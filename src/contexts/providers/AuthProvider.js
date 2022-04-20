import { useContext, createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token") || null;
  const [state, dispatch] = useReducer(authReducer, {
    user: {},
    token: token,
    isAuthenticated: token ? true : false,
  });

  return (
    <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
