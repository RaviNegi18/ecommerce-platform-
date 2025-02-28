import React, { useState, useEffect } from "react";
import MyContext from "./myContext";

function MyState(props) {
  const storedMode = localStorage.getItem("theme") || "light";
  const [mode, setMode] = useState(storedMode);

  useEffect(() => {
    document.body.style.backgroundColor =
      mode === "dark" ? "rgb(17, 24, 39)" : "white";
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    document.body.style.backgroundColor =
      newMode === "dark" ? "rgb(17, 24, 39)" : "white";
  };

  return (
    <MyContext.Provider value={{ mode, toggleMode }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
