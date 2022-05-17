import React, { useEffect, useReducer, useMemo, useRef } from "react";
import { BsPinFill } from "../utils/icons";
import {
  ColorButton,
  LabelButton,
  DeleteButton,
  ArchiveButton,
  SaveButton,
} from "../components";
import { noteReducer, isBright } from "./helpers";
import { useNavigate } from "react-router-dom";
import { SAVE_TOGGLE_ACTION, PINNED_ACTION } from "../utils/constants";
import DOMPurify from "dompurify";

function NoteCard({ note, type = "HOME" }) {
  const [state, dispatch] = useReducer(noteReducer, {
    note: note,
    labelText: "",
    labelToggle: false,
    saveToggle: false,
    saveLoading: false,
  });

  const {
    note: { color = "#BDC4DB", title, text, labels, _id, pinned },
    labelToggle,
    saveToggle,
    saveLoading,
  } = state;

  const navigate = useNavigate();
  const noteElementRef = useRef();
  const brightness = useMemo(() => isBright(color), [color]);

  useEffect(() => {
    let noteChanged = JSON.stringify(state.note) !== JSON.stringify(note);
    dispatch({
      type: SAVE_TOGGLE_ACTION,
      payload: { saveToggle: noteChanged },
    });
  }, [state.note]);

  return (
    <div
      ref={noteElementRef}
      className={`flex flex-col w-11/12 p-4 gap-2 relative md:w-4/5 rounded-lg cursor-pointer ${
        brightness ? "text-black" : "text-white"
      }`}
      style={{ backgroundColor: color }}
      onClick={(e) => {
        e.target === noteElementRef.current && navigate(`/note/${type}/${_id}`);
      }}
    >
      <h3
        className="md:text-xl font-normal"
        onClick={() => navigate(`/note/${type}/${_id}`)}
      >
        {title || "New Note"}
      </h3>
      <p
        className="line-clamp-5 text-sm md:text-base font-normal"
        onClick={() => navigate(`/note/${type}/${_id}`)}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            text === "<p><br></p>" ? "<p>Start Writing...</p>" : text
          ),
        }}
      ></p>
      <div className="flex flex-row justify-end self-end align-center w-max gap-2 md:gap-3">
        {type !== "TRASH" && (
          <ColorButton
            noteColor={color}
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
            onClick={() => dispatch({ type: PINNED_ACTION })}
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
        styles="bottom-5 left-4"
      />
    </div>
  );
}

export default NoteCard;
