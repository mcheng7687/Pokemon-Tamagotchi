import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import useLocalStorage from './useLocalStorage';
import { localStorageId } from './config';

function LogOut() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { removeLocalStor } = useLocalStorage(localStorageId);

  useEffect(() => {
    setUser({});
    removeLocalStor();
    navigate("/trainer/login");
  })
}

export default LogOut;