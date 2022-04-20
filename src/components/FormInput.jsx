import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToggle } from "../Hooks";

function FormInput({
  legend,
  placeholder,
  value,
  onChange,
  styles = "",
  type = "text",
}) {
  const { toggle: visible, setToggle: setVisible } = useToggle(false);

  const visibilityIcon = visible ? (
    <AiOutlineEye
      className="text-2xl absolute top-1.5 cursor-pointer right-1"
      onClick={() => setVisible(false)}
    />
  ) : (
    <AiOutlineEyeInvisible
      className="text-2xl absolute top-1.5 cursor-pointer right-1"
      onClick={() => setVisible(true)}
    />
  );

  const classNames = `rounded-md pl-2 p-1 border-slate-400 border-solid border-2 ${styles}`;
  const input =
    type === "password" ? (
      <span className="w-11/12 relative">
        <input
          className={`w-full ${classNames}`}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="on"
        />
        {visibilityIcon}
      </span>
    ) : (
      <input
        className={`w-11/12 ${classNames}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="on"
      />
    );

  return (
    <fieldset className="flex w-full flex-col items-center">
      <legend className="text-md pl-3 mb-1">{legend}</legend>
      {input}
    </fieldset>
  );
}

export default FormInput;
