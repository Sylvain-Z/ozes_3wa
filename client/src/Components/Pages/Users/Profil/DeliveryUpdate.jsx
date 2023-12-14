import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import React from 'react';

import { FETCH_URL } from '../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";

function DeliveryUpdate() {
  const navigate = useNavigate();

  const [users, setUsers] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [pseudo, setPseudo] = useState(""); // le champ du formulaire n'est pas nécessaire, cependant la state pour le "body: JSON.stringify({ firstname, lastname, number, street, complement, postal_code, city, phone, pseudo })"" est obligatoire

  const [id, setId] = useState("");
  const [msg, setMsg] = useState(null);


  const myuserid = localStorage.getItem("myuserid");

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

          setFirstname(json[0].firstname);
          setLastname(json[0].lastname);
          setNumber(json[0].number);
          setStreet(json[0].street);
          setComplement(json[0].complement);
          setPostal_code(json[0].postal_code);
          setCity(json[0].city);
          setPhone(json[0].phone);
          setPseudo(json[0].pseudo);
          setId(json[0].id);

        }
      } catch (error) {
        throw Error(error);
      }
    }
    getData();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(FETCH_URL + `users/infos-livraison-update/${myuserid}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, number, street, complement, postal_code, city, phone, pseudo }),
    });
    const json = await res.json();
    setMsg(json.msg);
    if (res.status === 201) {
      navigate(`/utilisateurs/infos-livraison/${id}`);
    }
  }

  return (
    <>
      {!users ? (
        <Loading />
      ) : (users.map(user =>
        <React.Fragment key={user.id}>
          <p className="previous_page"><Link to={`/utilisateurs/infos-livraison/${user.id}`}>Retour</Link></p>

          <section className="form_section">

            <FontAwesomeIcon icon={faTruckFast} size="lg" className="fontawesomeYellow" />
            <h3 className="form_title update">Modification de vos informations de livraison</h3>

            {msg && <p className="msg_green">{msg}</p>}

            <form onSubmit={handleSubmit}>

              <label for="firstname">Prénom</label>
              <input
                placeholder="Votre prénom"
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label for="lastname">Nom</label>
              <input
                placeholder="Votre nom"
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />

              <p className="form_subtitle read">Votre Adresse</p>

              <label for="number">Numéro de la rue</label>
              <input
                placeholder="Numéro de la rue"
                type="text"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}
              />
              <label for="street">Nom de la rue</label>
              <input
                placeholder="Nom de la rue"
                type="text"
                name="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <label for="complement">Complément d'adresse</label>
              <input
                placeholder="Complément d'adresse"
                type="text"
                name="complement"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
              <label for="postal_code">Code postal</label>
              <input
                placeholder="Code postal"
                type="text"
                name="postal_code"
                value={postal_code}
                onChange={(e) => setPostal_code(e.target.value.replace(/[^0-9]/g, ''))}
              />
              <label for="city">Ville</label>
              <input
                placeholder="Ville"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label for="city">Numéro de téléphone sans espaces</label>
              <input
                placeholder="Votre numéro de téléphone (non obligatoire)"
                type="tel"
                name="phone"
                value={phone}
                pattern="\+\d{11}"
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
              />

              {msg && <p className="msg_green">{msg}</p>}

              {/* <label for="pseudo">Votre pseudo</label> */}
              <input
                placeholder="Votre pseudo"
                type="hidden"
                name="pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />

              <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
              <p className="button_retour_rouge"><Link to={`/utilisateurs/infos-livraison/${user.id}`} ><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></Link></p>

            </form>
          </section>
        </React.Fragment>
      ))}
    </>
  )
}

export default DeliveryUpdate;