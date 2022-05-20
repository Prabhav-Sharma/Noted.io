import { MdLogout } from "../utils/icons";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../contexts/providers/userDataProvider";
import { toast } from "react-toastify";

function LogoutButton({ styles = "" }) {
  const {
    authState: {
      isAuthenticated,
      user: { fullName },
    },
    authDispatch,
  } = useAuth();

  const { userDataDispatch } = useUserData();
  const navigate = useNavigate();

  const logout = () => {
    authDispatch({ type: "LOGOUT" });
    userDataDispatch({ type: "RESET" });
    toast.success("Come back soon!");
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={logout}
      className={`absolute flex gap-2 items-center text-white top-6 right-4 sm:text-xl ${styles}`}
    >
      {fullName} <MdLogout className="align-sub text-2xl" />
    </button>
  );
}

export default LogoutButton;
