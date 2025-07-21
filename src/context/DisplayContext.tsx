import { createContext, useState } from "react";

const DisplayContext = createContext();

const DisplayProvider = ({ children }) => {
  const [isDisplay, setIsDisplay] = useState("123");

  const handleIsDisplay = (props) => {
    setIsDisplay(props);
  };

  return (
    <DisplayContext.Provider value={{ isDisplay, handleIsDisplay }}>
      {children}
    </DisplayContext.Provider>
  );
};

export { DisplayProvider, DisplayContext };
