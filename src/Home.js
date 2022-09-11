import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useUser } from './useUser';

function Home() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    user.token ? navigate('/trainer/pokemon') : navigate('/pokemon/list');

  });
}

export default Home;