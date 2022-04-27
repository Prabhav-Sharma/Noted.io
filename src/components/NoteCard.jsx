import React, { useEffect, useReducer, useMemo } from "react";
import {
  MdLabel,
  MdArchive,
  IoMdColorPalette,
  IoMdTrash,
  BsPinFill,
  FaSave,
} from "../icons";
import { addToArchives, deleteNote, updateNote } from "../services";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";
import { FormInput } from "../components";

const noteReducer = (state, action) => {
  let updatedLabels;
  switch (action.type) {
    case "ADD_LABEL":
      updatedLabels = [...state.note.labels, state.labelText];
      return {
        ...state,
        note: { ...state.note, labels: updatedLabels },
        labelText: "",
      };

    case "REMOVE_LABEL":
      updatedLabels = state.note.labels.filter(
        (labels) => labels !== action.payload.label
      );
      return { ...state, note: { ...state.note, labels: updatedLabels } };

    case "NOTE_COLOR":
      return {
        ...state,
        note: { ...state.note, noteColor: action.payload.noteColor },
      };
    case "LABEL_TEXT":
      return { ...state, labelText: action.payload.labelText };

    case "LABEL_TOGGLE":
      return { ...state, labelToggle: !state.labelToggle };

    case "SAVE_TOGGLE":
      return { ...state, saveToggle: action.payload.saveToggle };

    case "SAVE_LOADING":
      return { ...state, saveLoading: !state.saveLoading };

    case "PINNED":
      return { ...state, note: { ...state.note, pinned: !state.note.pinned } };
  }
};

function NoteCard({ note }) {
  const [state, dispatch] = useReducer(noteReducer, {
    note: note,
    labelText: "",
    labelToggle: false,
    saveToggle: false,
    saveLoading: false,
  });

  const {
    note: { noteColor = "#BDC4DB", title, text, labels, _id, pinned },
    labelText,
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
    if (state.note !== note)
      dispatch({ type: "SAVE_TOGGLE", payload: { saveToggle: true } });
  }, [state.note]);

  function isBright(hex) {
    const red = parseInt(hex[1] + hex[2], 16);
    const green = parseInt(hex[3] + hex[4], 16);
    const blue = parseInt(hex[5] + hex[6], 16);
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // taken and understood from stackoverflow
    return luminance > 50 ? true : false;
  }

  const deleteNoteHandler = () => {
    deleteNote(_id, token, userDataDispatch);
  };

  const addToArchivesHandler = () => {
    addToArchives(_id, { note: note }, token, userDataDispatch);
  };

  const updateNoteHandler = async () => {
    dispatch({ type: "SAVE_LOADING" });
    let status = await updateNote(
      _id,
      { note: state.note },
      token,
      userDataDispatch
    );
    dispatch({ type: "SAVE_LOADING" });
    labelToggle && dispatch({ type: "LABEL_TOGGLE" });
    status === "SUCCESS" &&
      dispatch({ type: "SAVE_TOGGLE", payload: { saveToggle: false } });
  };

  const addLabelHandler = () => {
    if (state.note.labels.includes(state.labelText)) {
      alert(`${state.labelText} is already a label`);
      dispatch({ type: "LABEL_TEXT", payload: { labelText: "" } });
      return;
    }

    if (state.note.labels.length >= 5) {
      alert("A note can only have 5 labels");
      return;
    }

    if (state.labelText.trim().length === 0) {
      alert("Label can't be blank");
      return;
    }

    dispatch({
      type: "ADD_LABEL",
    });
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
        <label className="flex gap-2">
          <input
            type="color"
            value={noteColor}
            onChange={(e) =>
              dispatch({
                type: "NOTE_COLOR",
                payload: { noteColor: e.target.value },
              })
            }
            className="bg-transparent invisible w-0"
          />
          <IoMdColorPalette
            className={`${
              brightness ? "text-black" : "text-white"
            } cursor-pointer text-3xl md:text-4xl p-1 mt-0.5 hover:bg-slate-500 
            } rounded-md`}
          />
        </label>
        <button>
          <IoMdTrash
            onClick={deleteNoteHandler}
            className={`${
              brightness ? "text-black" : "text-white"
            } text-3xl md:text-4xl p-1 rounded-md hover:bg-slate-500 `}
          />
        </button>
        <button className="relative">
          <MdLabel
            className={`${brightness ? "text-black" : "text-white"} ${
              labelToggle && "bg-slate-500"
            } text-3xl md:text-4xl p-1 rounded-md hover:bg-slate-500 `}
            onClick={() => dispatch({ type: "LABEL_TOGGLE" })}
          />
          <p className="absolute -top-1 -right-1 bg-slate-600 rounded-full p-1 px-1.5 text-white font-medium text-xs">
            {labels.length}
          </p>
          <div
            className={` ${
              labelToggle ? "block" : "hidden"
            } absolute z-30 bg-slate-100 border-solid border-2 rounded-md w-72 md:w-96 md:-left-72 top-7 -left-52 md:top-10 border-slate-600 p-2`}
          >
            <div className=" text-md flex gap-2 flex-col">
              <div className="text-xs grid-cols-3  md:text-base gap-1 grid md:grid-cols-3 md:gap-2">
                {labels.map((label) => (
                  <div
                    key={label}
                    style={{ backgroundColor: noteColor }}
                    className="p-1 px-2 flex justify-around items-center rounded-lg w-full "
                  >
                    {label}
                    <span
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_LABEL",
                          payload: { label: label },
                        })
                      }
                      className="text-lg ml-1 rounded-sm font-medium"
                    >
                      X
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-row h-max justify-center items-end">
                <FormInput
                  legend="Label name"
                  maxLength="8"
                  placeholder="Enter label (Max:8 Characters)"
                  value={labelText}
                  styles="text-sm sm:text-base"
                  onChange={(e) =>
                    dispatch({
                      type: "LABEL_TEXT",
                      payload: { labelText: e.target.value },
                    })
                  }
                />
                <span
                  onClick={addLabelHandler}
                  className=" bg-slate-400 hover:bg-slate-500 hover:text-white ease-linear duration-200 p-2 px-3 rounded-sm"
                >
                  Add
                </span>
              </div>
            </div>
          </div>
        </button>
        <button>
          <MdArchive
            onClick={addToArchivesHandler}
            className={`${
              brightness ? "text-black" : "text-white"
            } text-3xl md:text-4xl p-1 rounded-md hover:bg-slate-500 `}
          />
        </button>
      </div>
      <button>
        <BsPinFill
          onClick={() => dispatch({ type: "PINNED" })}
          className={`${brightness ? "text-black" : "text-white"}  ${
            pinned && "bg-slate-600"
          } text-2xl md:text-3xl absolute rounded-md top-2 right-2 p-1 hover:bg-slate-500 `}
        />
      </button>
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
