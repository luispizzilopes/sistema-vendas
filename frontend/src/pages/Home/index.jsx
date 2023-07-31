import React, { useEffect, useState } from "react";
import './style.css'; 
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from 'axios'; 
import iconVendas from '../../assets/icon-vendas.png';
import iconMoedas from '../../assets/icon-moedas.png'; 


const Home = ()=>{
    const [sales, setSales] = useState([]); 
    const navegation = useNavigate(); 

    const newSale = async()=>{
        const request = {
            "price": 0
        }

        await axios.post("https://localhost:7121/api/Sale/create", request); 
        navegation('/newsale'); 
    }

    const cancelSale = async(codSale)=>{
        axios.delete(`https://localhost:7121/api/Sale/cancel?id=${codSale}`)
            .then(response => {
                toast.success(`Venda N° ${codSale} cancelada com sucesso!`); 
                loadSales(); 
            })
            .catch(error => toast.error("Não foi possível cancelar a venda. Por favor, tente novamente!")); 
    }

    const cancelSalesEmpity = async()=>{
        axios.delete("https://localhost:7121/api/Sale/cancelSalesEmpity")
            .then(response => console.log('Vendas vazias canceladas com sucesso.'))
            .catch(error => console.error('Ocorreu um erro ao cancelar a venda:'))
    }

    const loadSales = async()=> {
        try {
            const response = await axios.get("https://localhost:7121/api/Sale/list");
            setSales(response.data); 
        } catch (error) {
            console.error("Erro ao carregar as vendas");
        }
    };

    useEffect(()=>{
        loadSales(); 
        cancelSalesEmpity(); 
    }, [])

    return(
        <div className="container-home">
            <header>
                <div>
                    <img src={iconVendas} alt="Icone de vendas" width={60}/>
                    <p>SISTEMA DE VENDAS</p>
                </div>
                <nav>
                    <button onClick={()=> navegation('/list')}>Produtos cadastrados</button>
                    <button onClick={()=> newSale()}>Nova venda</button>
                </nav>
            </header>
            <div className="sales">
                <div className="box-icon">
                    <img src={iconMoedas} alt="Icone de moedas" width={70}/>
                    <p>Listagem de vendas realizadas</p>
                </div>
                <div className="box-sales">
                    <table>
                        <thead>
                            <tr>
                                <th>Cód. da venda</th>
                                <th>Valor total</th>
                                <th>Detalhar venda</th>
                                <th>Cancelar venda</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sales.map(sale => (
                                <tr key={sale.id}>
                                    <th>{sale.id}</th>
                                    <th>R$ {sale.price}</th>
                                    <th>
                                        <button className="button-detalhes" onClick={()=> navegation(`/detailsale/${sale.id}`)}>
                                            Detalhes
                                        </button>
                                    </th>
                                    <th>
                                        <button className="button-cancelar" onClick={()=> cancelSale(sale.id)}>
                                            Cancelar
                                        </button>
                                    </th>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home; 