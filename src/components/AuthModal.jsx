import React from "react";
import ReactDOM from "react-dom";
import { GrClose, RiLoaderFill } from "../icons";
import { useAuthForm, useToggle } from "../Hooks";
import { login, signup } from "../services";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FormInput } from "./index";

function AuthModal({ show }) {
  const { authModalToggle, setAuthModalToggle } = show;
  const { authDispatch } = useAuth();
  const {
    authFormState: { fullName, email, password, confirmPassword, display },
    authFormDispatch,
  } = useAuthForm();

  const navigate = useNavigate();

  const { toggle: authButtonToggle, setToggle: setAuthButtonToggle } =
    useToggle(false);

  const { toggle: testCredentialsToggle, setToggle: setTestCredentialsToggle } =
    useToggle(false);

  if (!authModalToggle) {
    return null;
  }

  const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9]+$/;

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      alert("Invalid email address");
      return;
    }
    if (password.length === 0) {
      alert("Fields can't be empty");
      return;
    }

    setAuthButtonToggle(true);
    const status = await login({ email, password }, authDispatch);
    setAuthButtonToggle(false);
    status === "SUCCESS" && navigate("/home");
  };

  const loginWithTestCredentials = async (e) => {
    e.preventDefault();
    setTestCredentialsToggle(true);
    const status = await login(
      { email: "guest@gmail.com", password: "guest@123" },
      authDispatch
    );
    setTestCredentialsToggle(false);
    status === "SUCCESS" && navigate("/home");
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      alert("Invalid email address");
      return;
    }

    if (password.length === 0 || fullName === 0) {
      alert("Fields can't be empty");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    setAuthButtonToggle(true);
    const status = await signup({ fullName, email, password }, authDispatch);
    setAuthButtonToggle(false);
    status === "SUCCESS" && navigate("/home");
  };

  const actionButtons =
    display === "LOGIN" ? (
      <>
        <button
          className="w-11/12 flex self-center justify-center bg-cyan-500 p-1.5 py-2 mt-1 md:text-lg text-white hover:bg-cyan-600"
          onClick={loginHandler}
        >
          {authButtonToggle ? (
            <RiLoaderFill className="text-2xl animate-spin" />
          ) : (
            "Login"
          )}
        </button>
        <button
          className="w-11/12 flex self-center justify-center bg-white border border-solid mt-1 border-cyan-500 p-1.5  py-2  md:text-lg text-slate-800 hover:bg-slate-200"
          onClick={loginWithTestCredentials}
        >
          {testCredentialsToggle ? (
            <RiLoaderFill className="text-2xl animate-spin" />
          ) : (
            "Login with test credentials"
          )}
        </button>
      </>
    ) : (
      <button
        className="w-11/12 flex self-center justify-center bg-cyan-500 p-1.5  py-2 md:text-lg mt-1 text-white  hover:bg-cyan-600"
        onClick={signupHandler}
      >
        {authButtonToggle ? (
          <RiLoaderFill className="text-2xl animate-spin" />
        ) : (
          "Signup"
        )}
      </button>
    );

  return ReactDOM.createPortal(
    <div
      className="w-screen h-screen bg-modal absolute top-0 m-0 flex justify-center items-center z-20"
      onClick={() => setAuthModalToggle(false)}
    >
      <div
        className="flex flex-row bg-gray-500 p-1 lg:p-2 lg:w-9/12 lg:h-4/5 font-notoSans font-normal border-cyan-700 border-solid rounded-lg justify-around relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="hidden lg:w-2/4 lg:block"
          src="https://res.cloudinary.com/carsmart/image/upload/v1650285328/Notes/auth_j8dpoe.svg"
          alt="Auth Illustration"
        />
        <div className="bg-white self-center h-max w-72 sm:w-80 md:w-96 opacity-100 flex flex-col  border-2 rounded-lg p-2 gap-3 pb-3">
          <span className="flex border-b-2 border-slate-200 border-solid">
            <button
              className={`${
                display === "LOGIN" && "bg-rose-500 text-white hover:text-black"
              }  p-2 text-md w-full hover:bg-rose-200`}
              onClick={() =>
                authFormDispatch({
                  type: "DISPLAY",
                  payload: { display: "LOGIN" },
                })
              }
            >
              Login
            </button>
            <button
              className={`${
                display === "SIGNUP" &&
                "bg-rose-500 text-white hover:text-black"
              }  p-2 text-md w-full hover:bg-rose-200`}
              onClick={() =>
                authFormDispatch({
                  type: "DISPLAY",
                  payload: { display: "SIGNUP" },
                })
              }
            >
              Sign up
            </button>
          </span>
          <form className="flex flex-col gap-3 md:gap-4">
            {display === "SIGNUP" && (
              <FormInput
                legend="Full name:"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) =>
                  authFormDispatch({
                    type: "FULL_NAME",
                    payload: { fullName: e.target.value },
                  })
                }
              />
            )}
            <FormInput
              legend="Email"
              type="email"
              placeholder="John.doe@gmail.com"
              value={email}
              onChange={(e) =>
                authFormDispatch({
                  type: "EMAIL",
                  payload: { email: e.target.value },
                })
              }
            />
            <FormInput
              type="password"
              legend="Password"
              placeholder="*********"
              value={password}
              onChange={(e) =>
                authFormDispatch({
                  type: "PASSWORD",
                  payload: { password: e.target.value },
                })
              }
            />

            {display === "SIGNUP" && (
              <FormInput
                type="password"
                legend="Confirm Password"
                placeholder="*********"
                value={confirmPassword}
                onChange={(e) =>
                  authFormDispatch({
                    type: "CONFIRM_PASSWORD",
                    payload: { confirmPassword: e.target.value },
                  })
                }
              />
            )}
            {actionButtons}
          </form>
        </div>
        <GrClose
          onClick={() => setAuthModalToggle(false)}
          className="text-2xl bg-white rounded-3xl md:text-3xl -top-3 -right-3 p-1 text-cyan-400 absolute cursor-pointer"
        />
      </div>
    </div>,
    document.getElementById("home")
  );
}

export default AuthModal;
