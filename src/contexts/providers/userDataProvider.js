import { useContext, createContext, useReducer } from "react";
import userDataReducer from "../reducers/userDataReducer";

const UserDataContext = createContext(null);

const UserDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userDataReducer, {
    notes: [],
    archives: [],
  });

  return (
    <UserDataContext.Provider
      value={{ userDataState: state, userDataDispatch: dispatch }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

const useUserData = () => useContext(UserDataContext);

export { useUserData, UserDataProvider };
