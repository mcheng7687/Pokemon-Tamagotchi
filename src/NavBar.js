import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "./useUser";
import PokemonLogo from "./Pokemon_logo.png";

function NavBar() {
  const { user } = useUser();
  const location = useLocation();

  function isCurr(link) {
    return location.pathname.includes(link) ? "curr-location" : "";
  }

  return (
    <nav>
      <Link className={`Nav-App ${isCurr("/")}`} to="/">
        <img src={PokemonLogo} alt="Pokemon-logo" className="logo" />
      </Link>
      <div className="side-to-side">
        <Link className={`Nav-Right ${isCurr("/pokemon/list")}`} to="/pokemon/list">Pokemon List</Link>
      </div>
      <div className="side-to-side right">
        {user.email ? (
          <>
            <Link className={`Nav-Right ${isCurr("/trainer/pokemon")}`} to="/trainer/pokemon">My Pokemon</Link>
            <Link className={`Nav-Right ${isCurr("/trainer/profile")}`} to="/trainer/profile">Profile</Link>
            <span>Hi, {user.firstName}!</span>
            <Link className={`Nav-Right small-text`} to="/trainer/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link className={`Nav-Right ${isCurr("/trainer/login")}`} to="/trainer/login">Login</Link>
            <Link className={`Nav-Right ${isCurr("/trainer/signup")}`} to="/trainer/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
