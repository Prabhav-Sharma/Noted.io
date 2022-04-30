import React from "react";
import { IoMdColorPalette } from "../../icons";

function ColorButton({ noteColor, brightness, dispatch }) {
  return (
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
             rounded-md`}
      />
    </label>
  );
}

export default ColorButton;
