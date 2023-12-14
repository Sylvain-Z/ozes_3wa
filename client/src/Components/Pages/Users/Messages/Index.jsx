import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from 'react';

import { FETCH_URL } from '../../../../assets/const';

import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import BackToStore from '../../Containers/BackToStore/Index';
import PreviousPage from '../Components/PreviousPage';
import UserMsgRead from './UserMsgRead';

function SendMessages() {

      const myuserid = localStorage.getItem("myuserid");
      const params = useParams();

      const [users, setUsers] = useState(null);

      const [user_pseudo, setUser_pseudo] = useState(""); // les state pour remplir le formulaire
      const [user_email, setUser_email] = useState("");
      const [subject, setSubject] = useState("");
      const [content, setContent] = useState("");
      const [user_id, setUser_id] = useState("");
      const [msg, setMsg] = useState(null);

      const [messages, setMessages] = useState(""); // stocke des messages de l'usager

      useEffect(() => {
            async function getData() {
                  try {
                        let id = "";
                        if (!myuserid) {
                              return
                        } else {
                              id = myuserid;
                        }
                        const users = await fetch(FETCH_URL + "users/" + id);

                        if (users.status === 200) {
                              const json = await users.json();
                              setUsers(json);
                              setUser_pseudo(json[0].pseudo);
                              setUser_email(json[0].email);
                              setUser_id(json[0].id);

                              const messages = await fetch(FETCH_URL + "messages/user-read/" + params.id);  // c'est l'id qui récupère les messages car si un nouvel utilisateur se crée un compte avec me même pseudo, il aura accès aux messages du compte qui a été préalablement supprimé

                              if (messages.status === 200) {
                                    const json = await messages.json();
                                    setMessages(json);
                              }

                        }
                  } catch (error) {
                        throw Error(error);
                  }
            }
            getData();
      }, [myuserid, user_pseudo, user_email, user_id, messages]);


      const [id, setId] = useState(uuidv4().slice(0, 20)); // à chaque chargement du composant une chaine de caractère aléatoire sera stocké pour l'id du message

      async function handleSubmit(e) {
            e.preventDefault();
            const res = await fetch(FETCH_URL + "messages/write", {
                  method: "post",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id, user_pseudo, user_email, subject, content, user_id }),
            });
            const json = await res.json();
            setMsg(json.msg);
      }


      return (
            <>
                  {!users ? (
                        <Loading />
                  ) : (users.map(user =>


                        <React.Fragment key={user.id}>

                              <PreviousPage user={user}/>

                              <section className="form_section">

                                    <FontAwesomeIcon icon={faMessage} className="fontawesome fontawesomeYellow" />

                                    <h3 className="form_title read">Écrivez-nous</h3>

                                    <form onSubmit={handleSubmit}>

                                          {msg && <p className="msg_green">{msg}</p>}

                                          <input
                                                placeholder="ID du message"
                                                type="hidden"
                                                name="id"
                                                value={id}
                                                onChange={(e) => setId(e.target.value.replace)}
                                          />
                                          <input
                                                required
                                                disabled
                                                placeholder="Pseudo"
                                                type="hidden"
                                                name="user_pseudo"
                                                value={user_pseudo}
                                                onChange={(e) => setUser_pseudo(e.target.value)}
                                          />
                                          <input
                                                required
                                                disabled
                                                placeholder="Votre email"
                                                type="hidden"
                                                name="email"
                                                value={user_email}
                                                onChange={(e) => setUser_email(e.target.value)}
                                          />
                                          <label for="subject">Sujet</label>
                                          <input
                                                required
                                                placeholder="Sujet"
                                                type="text"
                                                name="subject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                          />
                                          <label for="content">Message</label>
                                          <textarea className="form_input textarea"
                                                required
                                                placeholder="Votre message"
                                                type="text"
                                                name="content"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                          />
                                          <input
                                                required
                                                placeholder="votre identifiant"
                                                type="hidden"
                                                name="user_id"
                                                value={user_id}
                                                onChange={(e) => setUser_id(e.target.value)}
                                          />

                                          <button type="submit">Envoyer</button>

                                    </form>
                              </section>

                              <UserMsgRead messages={messages} />

                              <BackToStore />
                        </React.Fragment>
                  ))}

            </>
      )
}

export default SendMessages;