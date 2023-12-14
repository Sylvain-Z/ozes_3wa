import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL, IMG_URL } from '../../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function ProductDelete() {

    const navigate = useNavigate();
    const params = useParams();

    const [id, setId] = useState("");
    const [products, setProducts] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const products = await fetch(FETCH_URL + "products/glimpse/" + params.id); // récupère quelques informations du produits en fonction de son id pour afficher à l'utilisateur la confirmation de suppression concernant ce qu'il souhaite supprimer
                if (products.status === 404) {
                    navigate("/employes/not-found");
                }
                if (products.status === 200) {
                    const json = await products.json();
                    setProducts(json);
                    setId(json[0].id)
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    const [msg, setMsg] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "products/delete/" + params.id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
            navigate("/employes/stock");
        }
    }

    return (
        <>
            <Link to="/employes/stock"><p className="previous_page">Retour à la liste des produits</p></Link>

            <section className="form_section">

                <h3 className="form_title update">Suppression d'un produit</h3>

                <p className="msg_red">Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible</p>

                <form onSubmit={handleSubmit}>

                    {!products ? (
                        <p>Produit non trouvé</p>
                    ) : (
                        <>
                            <figure className="delete_fig">
                                <img src={IMG_URL+`${products[0].file_name}`} alt={products[0].caption} />
                                <figcaption>
                                    <p>{products[0].title}</p>
                                    <p>Quantité en stock : {products[0].stock_quantity}</p>
                                </figcaption>
                            </figure>

                        </>
                    )}



                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                    <Link to={`/employes/stock`} className="button_retour_rouge"><p><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></p></Link>

                </form>



            </section>


        </>
    )
};


export default ProductDelete;