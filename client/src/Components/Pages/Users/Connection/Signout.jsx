import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signout } from '../../../../store/slices/user'

function SignOut() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");

  dispatch(signout(pseudo))

  function navigateToStore() {
    localStorage.removeItem("auth");
    localStorage.removeItem("myuserid");
    setTimeout(()=>
    {navigate("/employes/connexion")}
    , 500); // sans le setTimout la redirection ne se fait pas
  };
  navigateToStore();

  return <h2>Vous êtes déconnecté, vous allez être rediriger à la boutique</h2>
};

export default SignOut;