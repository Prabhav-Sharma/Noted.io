import {
  FaHome,
  FaTrash,
  GiPlagueDoctorProfile,
  MdArchive,
  ImSearch,
} from "../utils/icons";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";
import { addToNotes } from "../services";
import { NavLink, useNavigate } from "react-router-dom";
import { getRandomColor } from "../utils/helpers";

function SideNav() {
  const {
    authState: { token },
  } = useAuth();
  const { userDataDispatch } = useUserData();
  const navigate = useNavigate();

  const addNewNoteHandler = async () => {
    await addToNotes(
      {
        note: {
          title: "",
          text: "<p><br></p>",
          color: getRandomColor(),
          pinned: false,
          labels: [],
          updatedAt: new Date(),
        },
      },
      token,
      userDataDispatch
    );
    navigate("/home");
  };

  const tabButtonStyles =
    "flex flex-row gap-2 text-lg sm:text-xl items-center text-black hover:text-cyan-700";
  const activeStyles = "text-cyan-700";
  return (
    <aside className="flex static bg-transparent sm:relative sm:rounded-xl left-1 sm:ml-8 sm:w-56 md:w-72 lg:w-80 sm:items-start sm:h-auto sm:gap-6 p-3 top-0 flex-col gap-2">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `  ${isActive && activeStyles} ${tabButtonStyles}`
        }
      >
        <FaHome className="align-sub text-xl" /> Home
      </NavLink>

      <NavLink
        to="/archives"
        className={({ isActive }) =>
          `  ${isActive && activeStyles} ${tabButtonStyles}`
        }
      >
        <MdArchive className="align-sub text-xl" /> Archives
      </NavLink>
      <NavLink
        to="/trash"
        className={({ isActive }) =>
          `  ${isActive && activeStyles} ${tabButtonStyles}`
        }
      >
        <FaTrash className="align-sub text-lg" /> Trash
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          `  ${isActive && activeStyles} ${tabButtonStyles}`
        }
      >
        <ImSearch className="align-sub text-xl" /> Search
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `  ${isActive && activeStyles} ${tabButtonStyles}`
        }
      >
        <GiPlagueDoctorProfile className="align-sub text-xl" /> Profile
      </NavLink>
      <button
        onClick={addNewNoteHandler}
        className="p-3 w-48 text-sm sm:w-44 lg:text-xl lg:w-48 sm:text-lg ease-in-out font-normal hover:bg-cyan-600 bg-cyan-500 rounded-lg text-white"
      >
        Create new note
      </button>
    </aside>
  );
}

export default SideNav;
