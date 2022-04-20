import axios from "axios";

const signup = async (requestBody, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/signup",
      data: requestBody,
    });

    dispatcher({
      type: "SIGNUP",
      payload: { user: response.data.user, token: response.data.token },
    });
    return "SUCCESS";
  } catch (e) {
    console.log(e);
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
    dispatcher({
      type: "LOGIN",
      payload: { user: response.data.user, token: response.data.token },
    });
    return "SUCCESS";
  } catch (e) {
    console.error(e);
    return "FAILED";
  }
};

export { login, signup };
