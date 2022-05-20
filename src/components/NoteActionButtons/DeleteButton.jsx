import React from "react";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { useUserData } from "../../contexts/providers/userDataProvider";
import { FaSave, IoMdTrash } from "../../utils/icons";
import { restoreFromTrash, addToTrash, removeFromTrash } from "../../services";

function DeleteButton({ type, note, brightness, addFunctions = undefined }) {
  const {
    authState: { token },
  } = useAuth();
  const { userDataDispatch } = useUserData();

  switch (type) {
    case "TRASH":
      return (
        <>
          <button
            onClick={() => {
              restoreFromTrash(
                note._id,
                { note: note },
                token,
                userDataDispatch
              );
              addFunctions && addFunctions[0]();
            }}
            className={`flex items-center gap-1.5 p-1.5 text-emerald-500 md:text-lg hover:scale-95 shadow-sm shadow-white rounded-md ${
              brightness ? "bg-slate-700" : "bg-slate-100"
            }`}
          >
            Recover <FaSave />
          </button>
          <button
            onClick={() => {
              removeFromTrash(note._id, token, userDataDispatch);
              addFunctions && addFunctions[1]();
            }}
            className={`flex items-center gap-1.5 p-1.5 text-red-500 md:text-lg hover:scale-95 shadow-sm shadow-white rounded-md ${
              brightness ? "bg-slate-700" : "bg-slate-100"
            }`}
          >
            Delete <IoMdTrash className="text-xl" />
          </button>
        </>
      );

    default:
      return (
        <button>
          <IoMdTrash
            onClick={() => {
              addToTrash(note._id, { note: note }, token, userDataDispatch);
              addFunctions && addFunctions();
            }}
            className={`${
              brightness ? "text-black" : "text-white"
            } text-3xl md:text-4xl p-1 rounded-md hover:bg-slate-500 `}
          />
        </button>
      );
  }
}

export default DeleteButton;
