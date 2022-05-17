import React from "react";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { useUserData } from "../../contexts/providers/userDataProvider";
import { FaSave } from "../../utils/icons";
import { updateArchiveNote, updateNote } from "../../services";
import {
  SAVE_LOADING_ACTION,
  LABEL_TOGGLE_ACTION,
  SAVE_TOGGLE_ACTION,
} from "../../utils/constants";

function SaveButton({
  type,
  dispatch,
  brightness = true,
  note,
  labelToggle = false,
  saveToggle,
  saveLoading,
  styles = "",
}) {
  const {
    authState: { token },
  } = useAuth();
  const { userDataDispatch } = useUserData();

  const updateNoteHandler = async () => {
    dispatch({ type: "SAVE_LOADING" });
    note.updatedAt = new Date();
    const requestArgs = [note._id, { note: note }, token, userDataDispatch];
    let status =
      type === "ARCHIVE"
        ? await updateArchiveNote(...requestArgs)
        : await updateNote(...requestArgs);

    labelToggle && dispatch({ type: LABEL_TOGGLE_ACTION });
    dispatch({ type: SAVE_LOADING_ACTION });
    status === "SUCCESS" &&
      dispatch({ type: SAVE_TOGGLE_ACTION, payload: { saveToggle: false } });
  };

  return (
    <button
      onClick={updateNoteHandler}
      className={` ${saveToggle ? "block" : "hidden"}  
  ${saveLoading && "animate-pulse-fast opacity-80 hover:cursor-progress"} ${
        brightness ? "bg-slate-700" : "bg-slate-100"
      } ${styles} absolute text-base flex items-center gap-2 p-1.5 md:text-lg hover:scale-110 duration-200 shadow-sm shadow-white rounded-md text-emerald-500`}
    >
      {saveLoading ? "Saving.." : "Save"}
      <FaSave className={`text-lg md:text-xl`} />
    </button>
  );
}

export default SaveButton;
