import React from "react";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { useUserData } from "../../contexts/providers/userDataProvider";
import { addToArchives, restoreFromArchives } from "../../services";
import { MdArchive, MdUnarchive } from "../../utils/icons";

function ArchiveButton({ type, brightness, note, addFunctions = undefined }) {
  const {
    authState: { token },
  } = useAuth();
  const { userDataDispatch } = useUserData();

  switch (type) {
    case "ARCHIVE":
      return (
        <button>
          <MdUnarchive
            onClick={() => {
              restoreFromArchives(note._id, token, userDataDispatch);
              addFunctions && addFunctions();
            }}
            className={`${
              brightness ? "text-black" : "text-white"
            } text-3xl md:text-4xl p-1 rounded-md hover:bg-slate-500 `}
          />
        </button>
      );
    case "HOME":
      return (
        <button>
          <MdArchive
            onClick={() => {
              addToArchives(note._id, { note: note }, token, userDataDispatch);
              addFunctions && addFunctions();
            }}
            className={`${
              brightness ? "text-black" : "text-white"
            } text-3xl md:text-4xl p-1 rounded-md hover:bg-slate-500 `}
          />
        </button>
      );
    case "TRASH":
      return "";
  }
}

export default ArchiveButton;
