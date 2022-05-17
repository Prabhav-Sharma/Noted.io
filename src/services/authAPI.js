import axios from "axios";
import { USER_ACTION, LOGIN_ACTION, SIGN_UP_ACTION } from "../utils/constants";
import { toast } from "react-toastify";

const signup = async (requestBody, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/signup",
      data: requestBody,
    });
    localStorage.setItem("token", response.data.encodedToken);
    dispatcher({
      type: SIGN_UP_ACTION,
      payload: {
        user: response.data.createdUser,
        token: response.data.encodedToken,
      },
    });
    toast.success(`Welcome on board, ${response.data.createdUser.fullName}`);
    return "SUCCESS";
  } catch (e) {
    console.log(e);
    toast.error("Was that a thud in the server room!?");
    return "FAILED";
  }
};

//Login
const login = async (requestBody, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/login",
      data: requestBody,
    });
    localStorage.setItem("token", response.data.encodedToken);
    dispatcher({
      type: LOGIN_ACTION,
      payload: {
        user: response.data.foundUser,
        token: response.data.encodedToken,
      },
    });
    toast.success(`Welcome back ${response.data.foundUser.fullName}`);
    return "SUCCESS";
  } catch (e) {
    console.error(e);
    toast.error("Was that a thud in the server room!?");
    return "FAILED";
  }
};

const fetchUserDetails = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/auth/user",
      headers: { authorization: token },
    });
    dispatcher({ type: USER_ACTION, payload: { user: response.data.user } });
  } catch (e) {
    console.log(e);
  }
};

export { login, signup, fetchUserDetails };
