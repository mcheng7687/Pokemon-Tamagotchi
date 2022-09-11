import React, { useContext } from "react";

const UserContext = React.createContext();

const useUser = () => {
  return useContext(UserContext);
}

export { useUser, UserContext };