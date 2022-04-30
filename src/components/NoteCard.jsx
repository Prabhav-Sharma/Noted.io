import React, { useEffect, useReducer, useMemo } from "react";
import { MdArchive, IoMdTrash, BsPinFill, FaSave, MdUnarchive } from "../icons";
import {
  addToArchives,
  deleteNote,
  restoreFromArchives,
  updateArchiveNote,
  updateNote,
} from "../services";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";
import { ColorButton } from "../components";
import { noteReducer, isBright } from "./helpers";
import LabelButton from "./NoteActionButtons/LabelButton";

function NoteCard({ note, type = "HOME" }) {
  const [state, dispatch] = useReducer(noteReducer, {
    note: note,
    labelText: "",
    labelToggle: false,
    saveToggle: false,
    saveLoading: false,
  });

  const {
    note: { noteColor = "#BDC4DB", title, text, labels, _id, pinned },
    labelToggle,
    saveToggle,
    saveLoading,
  } = state;

  const brightness = useMemo(() => isBright(noteColor), [noteColor]);

  const {
    authState: { token },
  } = useAuth();
  const { userDataDispatch } = useUserData();

  useEffect(() => {
    let noteChanged = JSON.stringify(state.note) !== JSON.stringify(note);
    dispatch({ type: "SAVE_TOGGLE", payload: { saveToggle: noteChanged } });
  }, [state.note]);

  const deleteNoteHandler = () => {
    deleteNote(_id, token, userDataDispatch);
  };

  const addToArchivesHandler = () => {
    addToArchives(_id, { note: note }, token, userDataDispatch);
  };

  const ArchiveButton =
    type === "ARCHIVE" ? (
      <button>
        <MdUnarchive
          onClick={() => restoreFromArchives(_id, token, userDataDispatch)}
          className={`${
            brightness ? "text-black" : "text-white"
          } text-3xl md:text-4xl p-1 rounded-md hover:bg-slate-500 `}
        />
      </button>
    ) : (
      <button>
        <MdArchive
          onClick={() =>
            addToArchives(_id, { note: note }, token, userDataDispatch)
          }
          className={`${
            brightness ? "text-black" : "text-white"
          } text-3xl md:text-4xl p-1 rounded-md hover:bg-slate-500 `}
        />
      </button>
    );

  const updateNoteHandler = async () => {
    dispatch({ type: "SAVE_LOADING" });
    const requestArgs = [_id, { note: state.note }, token, userDataDispatch];

    let status =
      type === "ARCHIVE"
        ? await updateArchiveNote(...requestArgs)
        : await updateNote(...requestArgs);

    labelToggle && dispatch({ type: "LABEL_TOGGLE" });
    dispatch({ type: "SAVE_LOADING" });
    status === "SUCCESS" &&
      dispatch({ type: "SAVE_TOGGLE", payload: { saveToggle: false } });
  };
  return (
    <div
      className={`flex flex-col w-11/12 p-4 gap-2 relative md:w-4/5 ${
        brightness ? "text-black" : "text-white"
      }`}
      style={{ backgroundColor: noteColor }}
    >
      <h3 className="font-neuton text-base md:text-xl font-medium">{title}</h3>
      <p className="line-clamp-5 text-sm md:text-base font-merriWeather font-extralight">
        {text}
      </p>
      <div className="flex flex-row justify-end align-center gap-2 md:gap-3">
        <ColorButton
          noteColor={noteColor}
          brightness={brightness}
          dispatch={dispatch}
        />
        <button>
          <IoMdTrash
            onClick={deleteNoteHandler}
            className={`${
              brightness ? "text-black" : "text-white"
            } text-3xl md:text-4xl p-1 rounded-md hover:bg-slate-500 `}
          />
        </button>
        <LabelButton
          brightness={brightness}
          labels={labels}
          labelToggle={labelToggle}
          dispatch={dispatch}
        />
        {ArchiveButton}
      </div>
      {type === "HOME" && (
        <button>
          <BsPinFill
            onClick={() => dispatch({ type: "PINNED" })}
            className={`${brightness ? "text-black" : "text-white"}  ${
              pinned && "bg-slate-600"
            } text-2xl md:text-3xl absolute rounded-md top-2 right-2 p-1 hover:bg-slate-500 `}
          />
        </button>
      )}
      <button
        onClick={updateNoteHandler}
        className={` ${saveToggle ? "block" : "hidden"}  
      ${
        saveLoading && "animate-pulse-fast opacity-80"
      } absolute bottom-5 left-4 flex items-center gap-2 p-1.5 text-black md:text-lg hover:scale-110 hover:text-emerald-600 duration-200 shadow-sm shadow-white rounded-md bg-white`}
      >
        {saveLoading ? "Saving.." : "Save"}
        <FaSave className={`text-lg md:text-xl`} />
      </button>
    </div>
  );
}

export default NoteCard;
