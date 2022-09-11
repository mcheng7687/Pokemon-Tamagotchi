import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './useUser';

// If not logged in, redirect to login page. Otherwise continue to render child
function VerifyUser({ childRoute }) {
  const { user } = useUser();

  return (
    <>
      {user.token
        ? <>{childRoute}</>
        : <Navigate to="/trainer/login" />
      }
    </>
  );
}

// If logged in, redirect to home page. Otherwise continue render to child
function VerifyNoLogin({ childRoute }) {
  const { user } = useUser();

  return (
    <>
      {!user.token
        ? <>{childRoute}</>
        : <Navigate to="/home" />
      }
    </>
  );
}

export { VerifyUser, VerifyNoLogin };