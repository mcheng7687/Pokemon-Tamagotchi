// Custom hook to set, get, and delete local storage
function useLocalStorage(key) {
  const setLocalStor = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const getLocalStor = () => {
    return JSON.parse(localStorage.getItem(key));
  }

  const removeLocalStor = () => {
    localStorage.removeItem(key);
  }

  return { setLocalStor, getLocalStor, removeLocalStor };
}

export default useLocalStorage;