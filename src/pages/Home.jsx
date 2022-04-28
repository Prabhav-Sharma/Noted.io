import React, { useState } from "react";
import { FaHome, FaTrash, CgProfile, MdLabel, MdArchive } from "../icons";
import { LogoutBtn, Notes } from "../components";
import { addToNotes } from "../services";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";

function Home() {
  const {
    authState: { token },
  } = useAuth();
  const { userDataDispatch } = useUserData();

  const [{ display, content }, setContent] = useState({
    display: "HOME",
    content: <Notes />,
  });

  const addNewNoteHandler = () => {
    addToNotes(
      {
        note: {
          title: "New note",
          text: "Start writing...",
          color: "#BDC4DB",
          pinned: false,
          labels: [],
        },
      },
      token,
      userDataDispatch
    );
  };

  const tabButtonStyles =
    "flex flex-row gap-2 text-lg sm:text-xl items-center text-black hover:text-cyan-700";
  return (
    <>
      <main className="flex flex-col gap-4 bg-indigo-50 sm:flex-row sm:p-1 max-w-full md:pt-6 sm:gap-6 md:gap-8 h-full">
        <aside className="flex static bg-transparent sm:relative sm:rounded-xl left-1 sm:ml-8 sm:w-56 md:w-72 lg:w-80 sm:items-start sm:h-auto sm:gap-6 p-3 top-0 flex-col gap-2">
          <button
            className={`${tabButtonStyles} ${
              display === "HOME" && "text-cyan-700"
            }`}
          >
            <FaHome className="align-sub text-xl" /> Home
          </button>
          <button className="flex flex-row gap-2 text-lg sm:text-xl items-center text-black hover:text-cyan-700">
            <MdLabel className="align-sub text-xl" /> Labels
          </button>
          <button className="flex flex-row gap-2 text-lg sm:text-xl items-center text-black hover:text-cyan-700">
            <MdArchive className="align-sub text-xl" /> Archives
          </button>
          <button className="flex flex-row gap-2 text-lg sm:text-xl items-center text-black hover:text-cyan-700">
            <FaTrash className="align-sub text-lg" /> Trash
          </button>
          <button className="flex flex-row gap-2 text-lg sm:text-xl items-center text-black hover:text-cyan-700">
            <CgProfile className="align-sub text-xl" /> Profile
          </button>
          <button
            onClick={addNewNoteHandler}
            className="p-3 w-48 text-sm sm:w-44 lg:text-xl lg:w-48 sm:text-lg ease-in-out font-notoSans font-light hover:bg-cyan-600 bg-cyan-500 rounded-lg text-white"
          >
            Create new note
          </button>
        </aside>
        {content}
      </main>
      <LogoutBtn />
    </>
  );
}

export default Home;
