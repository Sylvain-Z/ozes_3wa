import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function DeleteSubCategories() {

    const navigate = useNavigate();
    const params = useParams();

    const [id, setId] = useState("");
    const [subcategories, setSubcategories] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const subcategories = await fetch(FETCH_URL + "categories/subcategories/" + params.id); // récupère les information de la catégorie en fonction de son id pour afficher à l'utilisateur la confirmation de suppression concernant ce qu'il souhaite supprimer
                if (subcategories.status === 404) {
                    navigate("/employes/not-found");
                }
                if (subcategories.status === 200) {
                    const json = await subcategories.json();
                    setSubcategories(json);
                    setId(json[0].id)
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);


    const [msg, setMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL +"categories/subcategories/delete/" + params.id, { // supprime la sous catégorie en fonction de son id
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
            navigate("/employes/stock/categories");
        }
    }

    return (
        <>

            <Link to="/employes/stock/categories"><p className="previous_page">Retour à la liste des produits</p></Link>

            <section className="form_section categories">

                <h3 className="form_title update">Suppression d'une sous-catégorie</h3>

                <p className="msg_red">Êtes-vous sûr ? Cette action est irréversible</p>

                <form onSubmit={handleSubmit}>

                    {!subcategories ? (
                        <p>Catégorie non trouvé</p>
                    ) : (
                        <>
                            <div className="delete_fig">
                                <p className='cate_title'>{subcategories[0].subcate_title}</p>
                            </div>

                        </>
                    )}

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                    <Link to={`/employes/stock/categories`} className="button_retour_rouge"><p><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></p></Link>

                </form>



            </section>

        </>
    )


}

export default DeleteSubCategories;