import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FETCH_URL } from '../../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../../Containers/Loading/Index";

function ProductUpdate({ products }) {

    const params = useParams();
    const navigate = useNavigate();

    const [id, setId] = useState(null);  // stockent les infos du produit pour injecter dans les inputs
    const [reference, setReference] = useState(null);
    const [title, setTitle] = useState(null);
    const [title_url, setTitle_url] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [color, setColor] = useState(null);
    const [shape, setShape] = useState(null);
    const [gender, setGender] = useState(null);
    const [model_info, setModel_info] = useState(null);
    const [material, setMaterial] = useState(null);
    const [infosup, setInfosup] = useState(null);
    const [infosupplus, setInfosupplus] = useState(null);
    const [madeplace, setMadeplace] = useState(null);

    const [msg, setMsg] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const products = await fetch(FETCH_URL + "products/one_full/" + params.id);
                if (products.status === 404) {
                    navigate("/employes/not-found");
                }
                if (products.status === 200) {
                    const json = await products.json();
                    setId(json[0].id);
                    setReference(json[0].reference);
                    setTitle(json[0].title);
                    setTitle_url(json[0].title_url);
                    setDescription(json[0].description);
                    setPrice(json[0].price);
                    setColor(json[0].color);
                    setShape(json[0].shape);
                    setGender(json[0].gender);
                    setModel_info(json[0].model_info);
                    setMaterial(json[0].material);
                    setInfosup(json[0].infosup);
                    setInfosupplus(json[0].infosupplus);
                    setMadeplace(json[0].madeplace);
                }

            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL +"products/update/" + params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, reference, title, title_url, description, price, color, shape, gender, model_info, material, infosup, infosupplus, madeplace }),
        });
        const json = await res.json();
        setMsg(json.msg);
    }

    return (
        <>
            {!products ? (
                <Loading />

            ) : (

                <>
                    <section className="form_section">


                        <p className="form_advise">
                            <em>Laisser vide les champs non pertinents</em></p>

                        <form onSubmit={handleSubmit}>

                            <label htmlFor="reference">Référence *</label>
                            <input
                                required
                                placeholder="Référence du produit"
                                type="text"
                                name="reference"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                            />
                            <label htmlFor="title">Nom du produit *</label>
                            <input
                                required
                                placeholder="Nom du produit"
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="title_url">Nom pour url *</label>
                            <input
                                required
                                placeholder="Nom pour url ( - ou _ acceptés )"
                                type="text"
                                name="title_url"
                                value={title_url}
                                onChange={(e) => setTitle_url(e.target.value.replace(/[^a-zA-Z_-]/g, ''))}
                                pattern="^\S*$"
                                title="L'espace n'est pas autorisé."
                            />
                            <label htmlFor="description">Description du produit *</label>
                            <textarea className="form_input textarea"
                                required
                                placeholder="Description du produit"
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="price">Prix *</label>
                            <input
                                required
                                placeholder="Prix"
                                type="text"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <label htmlFor="color">Couleur</label>
                            <input
                                placeholder="Couleur"
                                type="text"
                                name="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                            <label htmlFor="shape">Coupe du produit</label>
                            <input
                                placeholder="Coupe du produit"
                                type="text"
                                name="shape"
                                value={shape}
                                onChange={(e) => setShape(e.target.value)}
                            />
                            <label htmlFor="gender">Genre</label>
                            <input
                                placeholder="Genre"
                                type="text"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="model_info">Information sur le modèles</label>
                            <input
                                placeholder="Information sur le modèles"
                                type="text"
                                name="model_info"
                                value={model_info}
                                onChange={(e) => setModel_info(e.target.value)}
                            />
                            <label htmlFor="material">Matière *</label>
                            <input
                                required
                                placeholder="Matière"
                                type="text"
                                name="material"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value)}
                            />
                            <label htmlFor="infosup">Informations supplémentaire</label>
                            <textarea className="form_input textarea"
                                placeholder="Informations supplémentaire"
                                type="text"
                                name="infosup"
                                value={infosup}
                                onChange={(e) => setInfosup(e.target.value)}
                            />
                            <label htmlFor="infosupplus">Informations supplémentaire</label>
                            <textarea className="form_input textarea"
                                placeholder="Informations supplémentaire"
                                type="text"
                                name="infosupplus"
                                value={infosupplus}
                                onChange={(e) => setInfosupplus(e.target.value)}
                            />

                            <label htmlFor="madeplace">Lieu de fabrication</label>
                            <input
                                placeholder="Lieu de fabrication"
                                type="text"
                                name="madeplace"
                                value={madeplace}
                                onChange={(e) => setMadeplace(e.target.value)}
                            />

                            {msg && <p className="msg_green">{msg}</p>}

                            <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>


                        </form>

                    </section>
                </>

            )}


        </>
    )
};


export default ProductUpdate;