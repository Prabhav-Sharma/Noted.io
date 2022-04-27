import axios from "axios";

const signup = async (requestBody, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/signup",
      data: requestBody,
    });
    localStorage.setItem("token", response.data.encodedToken);
    console.log(response);
    dispatcher({
      type: "SIGNUP",
      payload: {
        user: response.data.createdUser,
        token: response.data.encodedToken,
      },
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
    localStorage.setItem("token", response.data.encodedToken);
    dispatcher({
      type: "LOGIN",
      payload: {
        user: response.data.foundUser,
        token: response.data.encodedToken,
      },
    });
    return "SUCCESS";
  } catch (e) {
    console.error(e);
    return "FAILED";
  }
};

export { login, signup };
