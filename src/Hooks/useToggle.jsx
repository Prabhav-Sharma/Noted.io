import { useState } from "react";

const useToggle = (initialValue = false) => {
  const [toggle, setToggle] = useState(initialValue);

  return { toggle, setToggle };
};

export default useToggle;
