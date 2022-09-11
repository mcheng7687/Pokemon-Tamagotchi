import { useState } from "react";
// import useLocalStorage from "./useLocalStorage";
import { searchTimer } from "./config";

function useHelpers() {
  // const { setLocalStor } = useLocalStorage(localStorageId);

  const [timer, setTimer] = useState();
  const debounce = (func) => {
    clearTimeout(timer);
    setTimer(setTimeout(func, searchTimer));
  }

  return { debounce };
}

export default useHelpers;