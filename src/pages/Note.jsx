import React, { useEffect, useReducer } from "react";
import ReactQuill from "react-quill";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  DeleteButton,
  FormInput,
  SaveButton,
  ArchiveButton,
} from "../components";
import { notePageReducer, isBright } from "../components/helpers";
import { useAuth } from "../contexts/providers/AuthProvider";
import { fetchNote } from "../services/notesAPI";
import "../styles/quill.css";

function Note() {
  const [state, dispatch] = useReducer(notePageReducer, {
    note: { title: "", text: "", labels: [] },
    initialNote: {
      title: "",
      text: "",
      labels: [],
    },
    saveToggle: false,
    saveLoading: false,
  });
  const { noteId, type } = useParams();

  const { note, initialNote, saveLoading, saveToggle } = state;

  const navigate = useNavigate();

  const {
    authState: { token },
  } = useAuth();

  useEffect(() => {
    fetchNote(noteId, type, token, dispatch);
  }, [noteId, type]);

  useEffect(() => {
    dispatch({
      type: "SAVE_TOGGLE",
      payload: {
        saveToggle: JSON.stringify(note) !== JSON.stringify(initialNote),
      },
    });
  }, [note]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const deleteAddFunctions = (type) => {
    switch (type) {
      case "ARCHIVE":
      case "HOME":
        return () => navigate(`/note/TRASH/${noteId}`);
      case "TRASH":
        return [
          () => navigate(`/note/HOME/${noteId}`),
          () => navigate("/home"),
        ];
    }
  };

  const archiveAddFunctions = (type) =>
    type === "HOME"
      ? () => navigate(`/note/ARCHIVE/${noteId}`)
      : () => navigate(`/note/HOME/${noteId}`);

  return (
    <main className="flex flex-col gap-2 p-6 bg-white">
      <NavLink
        to="/home"
        className="pb-2 font-medium font-caveat text-xl md:text-2xl"
      >
        ❮ Go Back
      </NavLink>
      {type === "TRASH" && (
        <p className="text-cyan-700 self-center font-normal text-base md:text-lg -translate-y-5">
          Note: Trash notes are read-only!
        </p>
      )}
      <div className=" relative text-2xl grow flex flex-col gap-1  ">
        <ReactQuill
          theme="snow"
          modules={modules}
          value={note.text}
          onChange={(e) => dispatch({ type: "TEXT", payload: { text: e } })}
          readOnly={type === "TRASH"}
          preserveWhitespace={true}
          placeholder="Start writing..."
        />
        <FormInput
          value={note.title}
          onChange={(e) =>
            type !== "TRASH" &&
            dispatch({ type: "TITLE", payload: { title: e.target.value } })
          }
          styles={
            " bg-transparent absolute top-3 left-0 text-base rounded-none w-56 ml-4 font-merriWeather  text-black border-0 focus:border-0 focus:outline-none focus:border-b-2 border-b-2 border-slate-600 border-solid"
          }
          maxLength="25"
          placeholder="Title:"
        />
        <SaveButton
          type={type}
          saveLoading={saveLoading}
          dispatch={dispatch}
          note={note}
          saveToggle={saveToggle}
          styles="top-4 right-4"
        />
        <span className="absolute label left-2 flex flex-wrap gap-2">
          {note.labels.map((label) => (
            <span
              key={label.text}
              style={{ backgroundColor: label.color }}
              className={` ${
                isBright(label.color) ? "text-black" : "text-white"
              } px-2 p-1 text-base font-normal rounded-md`}
            >
              {label.text}
            </span>
          ))}
        </span>
        <span
          className={`absolute text-sm sm:text-base  ${
            type === "TRASH" ? "-top-4 flex gap-3" : "bottom-3 sm:bottom-2"
          } right-4`}
        >
          <DeleteButton
            brightness={type === "TRASH"}
            note={note}
            type={type}
            addFunctions={deleteAddFunctions(type)}
          />
          <ArchiveButton
            type={type}
            brightness={false}
            note={note}
            addFunctions={archiveAddFunctions(type)}
          />
        </span>
      </div>
    </main>
  );
}

export default Note;
