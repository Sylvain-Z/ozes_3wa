import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FETCH_URL } from '../../../../assets/const';

import { signin } from "../../../../store/slices/employees";

function Takein() { // Takein = Signin, nom modifié pour éviter l'amalgame avec l'App.jsx

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);


    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "employees/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);

        if (res.status === 200) {
            localStorage.setItem("authe", json.TOKEN);
            localStorage.setItem("myemployeeid", email);
            dispatch(signin({ email }));
            navigate("/employes");
        }
    }

    return (
        <>
            <section className="form_section">

                <h2 className="form_title">Connectez vous à votre compte</h2>


                {msg && <p className="msg_green">{msg}</p>}
                {msg2 && <p className="msg_red">{msg2}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Mot de passe"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Se connecter</button>
                </form>
            </section>
        </>
    );
}

export default Takein;
