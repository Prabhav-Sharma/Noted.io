import React, { useState } from "react";
import { MdLabel } from "../../icons";
import { FormInput } from "../index";
import { getRandomColor } from "../helpers";

function LabelButton({ brightness, labels, labelToggle, dispatch }) {
  const [labelText, setLabelText] = useState("");

  const addLabelHandler = () => {
    if (labels.some((label) => label.text === labelText)) {
      alert(`${labelText} is already a label`);
      setLabelText("");
      return;
    }

    if (labels.length >= 5) {
      alert("A note can only have 5 labels");
      return;
    }

    if (labelText.trim().length === 0) {
      alert("Label can't be blank");
      return;
    }

    dispatch({
      type: "ADD_LABEL",
      payload: { label: { text: labelText, color: getRandomColor() } },
    });

    setLabelText("");
  };

  return (
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
                key={label.text}
                style={{ backgroundColor: label.color, color: "black" }}
                className="p-1 px-2 flex justify-around items-center rounded-lg w-full "
              >
                {label.text}
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
              onChange={(e) => setLabelText(e.target.value)}
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
  );
}

export default LabelButton;
