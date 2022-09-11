// Node modules
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// React components
import NavBar from "./NavBar";
import Home from './Home';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import MyPokemon from './MyPokemon';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import LogOut from './LogOut';
import ProfileForm from './ProfileForm';
import NotFound from './NotFound';
// Methods
import { UserContext } from "./useUser";
import useLocalStorage from "./useLocalStorage";
import { VerifyUser, VerifyNoLogin } from "./VerifyUser";
import Trainer from "./Trainer";
import Pokemon from './Pokemon';
import { localStorageId } from './config';
// CSS
import './App.css';

function App() {
  const { getLocalStor } = useLocalStorage(localStorageId);
  const [user, setUser] = useState(getLocalStor() || {});

  if (user.token) Trainer.setHeaderAxios(user.token);

  useEffect(() => {

    Pokemon.getAll()
      .then(data => Pokemon.getSpecies(data))
      .then (data => {
        Pokemon.speciesList = data;
      });

  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/pokemon/list" element={<PokemonList />} />
          {/* <Route path="/pokemon/:id" element={<VerifyUser childRoute={<PokemonDetail />} />} /> */}
          <Route path="/trainer/pokemon" element={<VerifyUser childRoute={<MyPokemon />} />} />
          <Route path="/trainer/login" element={<VerifyNoLogin childRoute={< LoginForm />} />} />
          <Route path="/trainer/signup" element={<VerifyNoLogin childRoute={<SignUpForm />} />} />
          <Route path="/trainer/logout" element={<LogOut />} />
          <Route path="/trainer/profile" element={<VerifyUser childRoute={<ProfileForm />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
