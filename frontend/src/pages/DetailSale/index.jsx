import React, { useEffect, useState } from "react";
import './style.css';
import iconDetail from "../../assets/icon-detalhe.png"; 
import iconItem from "../../assets/icon-produto-rosa.png"; 
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"; 

const DetailSale = ()=>{
    const [detailSale, setDetailSale] = useState([]);
    const [priceSale, setPriceSale] = useState(0); 
    const {id} = useParams(); 
    const navegation = useNavigate(); 

    const loadSaleId = async()=>{
        const response = await axios.get(`https://localhost:7121/api/Sale/search/${id}`); 
        if(response.status === 200){
            setDetailSale(response.data.items); 
            console.log(response.data.items)
            setPriceSale(response.data.price); 
        }else{
            navegation("/")
        }
    }  

    useEffect(()=>{
        loadSaleId();
    }, [])

    return(
        <div className="container-detailsale">
            <header>
                <img src={iconDetail} alt="Icone produto" width={50}/>
                <p>DETALHES DA VENDA N° {id}</p>
                <button onClick={()=> navegation('/')}>Voltar</button>
            </header>
            <div className="box-list">
                <table>
                    <thead>
                        <tr>
                            <th>Código do Item</th>
                            <th>Nome do Item</th>
                            <th>Quantidade</th>
                            <th>Valor Unitário</th>
                        </tr>
                    </thead>
                    <tbody>
                    {detailSale.map(item => (
                        <tr key={item.codItem}>
                            <td>{item.item.codItem}</td>
                            <td>{item.item.nameItem}</td>
                            <td>{item.amount}</td>
                            <td>R$ {item.item.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="total-sale">
                <p>Total da venda: R$ {priceSale}</p>
            </div>
        </div>
    ); 
}

export default DetailSale; 