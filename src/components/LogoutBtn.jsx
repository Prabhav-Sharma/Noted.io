import React from "react";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ styles = "" }) {
  const {
    authState: {
      isAuthenticated,
      user: { fullName },
    },
    authDispatch,
  } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    authDispatch({ type: "LOGOUT" });
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={logout}
      className={`absolute flex gap-2 items-center text-white top-7 right-4 sm:text-xl ${styles}`}
    >
      {fullName} <MdLogout className="align-sub text-2xl" />
    </button>
  );
}

export default LogoutBtn;
