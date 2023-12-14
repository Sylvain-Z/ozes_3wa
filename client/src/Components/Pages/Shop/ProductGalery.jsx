import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { FETCH_URL, IMG_URL } from '../../../assets/const';

import Loading from "../Containers/Loading/Index";

function ProductGalery(){
    
    const [ products, setProducts ] = useState(null);
    
    useEffect(() => {
            async function getData() {
                try {
                    const products = await (
                        await fetch(FETCH_URL + "products/galery") // récupère tous les produits présents en base de donnée
                    ).json();
                    setProducts(products.datas);
                            
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    return (
        <>
            <div className="shop">
                {!products ? (
                    <Loading/>
                ) : ( products.map( product =>

                        <div className='product_grid' key={product.id}>
                            <figure><Link to={`/le_store/${product.title_url}/${product.id}`}>
                                <img src={IMG_URL+`${product.file_name}`} alt={product.caption}/>
                                <figcaption>
                                    <p>{product.title}</p>
                                    <p>{product.price}€</p>
                                </figcaption></Link>
                            </figure>
                        </div>
                    ))}
            </div>
        </>
    )
}



export default ProductGalery;