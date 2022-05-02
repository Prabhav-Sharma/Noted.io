import React, { useEffect, useReducer, useMemo } from "react";
import { BsPinFill } from "../icons";
import {
  ColorButton,
  LabelButton,
  DeleteButton,
  ArchiveButton,
  SaveButton,
} from "../components";
import { noteReducer, isBright } from "./helpers";

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

  useEffect(() => {
    let noteChanged = JSON.stringify(state.note) !== JSON.stringify(note);
    dispatch({ type: "SAVE_TOGGLE", payload: { saveToggle: noteChanged } });
  }, [state.note]);

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
        {type !== "TRASH" && (
          <ColorButton
            noteColor={noteColor}
            brightness={brightness}
            dispatch={dispatch}
          />
        )}
        <DeleteButton type={type} note={note} brightness={brightness} />
        {type !== "TRASH" && (
          <LabelButton
            brightness={brightness}
            labels={labels}
            labelToggle={labelToggle}
            dispatch={dispatch}
          />
        )}
        <ArchiveButton type={type} brightness={brightness} note={note} />
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
      <SaveButton
        type={type}
        brightness={brightness}
        saveLoading={saveLoading}
        dispatch={dispatch}
        note={state.note}
        saveToggle={saveToggle}
        labelToggle={labelToggle}
      />
    </div>
  );
}

export default NoteCard;
