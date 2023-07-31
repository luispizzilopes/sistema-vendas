import React, { useEffect, useState } from "react";
import './style.css'
import axios from 'axios'
import iconRemove from '../../assets/icon-remove.png'; 
import {toast} from 'react-toastify'; 
import { useNavigate } from "react-router-dom";
import iconCart from "../../assets/icon-carrinho.png"; 

const NewSale = ()=>{
    const [numberSale, setNumberSale] = useState("")
    const [sale, setSale] = useState(null); 
    const [itemsSale, setItemsSale] = useState([]); 
    const [search, setSearch] = useState(""); 
    const [priceSale, setPriceSale] = useState(0); 
    const [itemsSearch, setItemsSearch] = useState([]); 
    const [itemsFilter, setItemsFilter] = useState([]); 
    const [suggestionsVisible, setSuggetionsVisible] = useState(false);

    const navegation = useNavigate(); 

    const loadSale = async()=>{
        const response = await axios.get("https://localhost:7121/api/Sale/lastsale"); 
        setSale(response.data);
        setItemsSale(response.data.items);  
        setNumberSale(response.data.id); 
        setPriceSale(response.data.price)
    }

    const loadItemSearch = async()=>{
        const response = await axios.get("https://localhost:7121/api/Item/list");
        setItemsSearch(response.data); 
        setItemsFilter(response.data); 
    }

    const addItem = async()=>{
        try{
            const response = await axios.get(`https://localhost:7121/api/Item/getbycode?codItem=${search}`);
            const item = response.data; 
            if(response.status === 200){
                const request = {
                    "codItem": item.codItem, 
                    "idSale": sale.id,
                    "amount": 1
                }

                await axios.post("https://localhost:7121/api/Sale/additem", request); 
                toast.success(`Item ${search} adicionado com sucesso!`); 
                loadSale();
                setSearch(""); 
            }
        }catch(error){
            toast.error("Não foi possível localizar um item com o código informado!")
        }
    }

    const removeItem = async (codItem) => {
        const request = {
            "codItem": codItem,
            "idSale": sale.id
        };

        try{
            await axios.delete('https://localhost:7121/api/Sale/removeitem', {
                data: request
            });
        
            toast.success(`Item ${search} removido com sucesso!`);
            loadSale();
        } catch (error) {
            toast.error('Erro ao remover item. Por favor, tente novamente.');
        }
    }

    const addOneUnit = async(codItem)=>{
        const request = {
            "saleId": sale.id,
            "codItem": codItem
        }

        try{
            await axios.post("https://localhost:7121/api/Sale/addunit", request);
            toast.success(`Adicionado uma unidade do item ${codItem}`); 
            loadSale();
        }catch(error){
            toast.error("Não foi possível adicionar uma unidade. Por favor, tente novamente."); 
        }
    }

    const removeOneUnit = async(codItem)=>{
        const request = {
            "saleId": sale.id,
            "codItem": codItem
        }

        try{
            await axios.post("https://localhost:7121/api/Sale/removeunit", request);
            toast.success(`Removido uma unidade do item ${codItem}`); 
            loadSale();
        }catch(error){
            toast.error("Não foi possível remover uma unidade. Por favor, tente novamente."); 
        }
    }

    const cancelSale = async()=>{
        try{
            await axios.delete(`https://localhost:7121/api/Sale/cancel?id=${numberSale}`);
            toast.success(`Venda cancelada com sucesso!`);
            navegation("/"); 
        }catch(error){
            toast.error("Erro ao cancelar a venda. Por favor, tente novamente.")
        }
    }

    const confirmSale = ()=>{
        if(itemsSale.length > 0){
            toast.success("Venda finalizada com sucesso!"); 
            navegation("/"); 
        }else{
            toast.warn("Você não adicionou nenhum item para finalizar a venda!"); 
        }
    }

    useEffect(()=>{
        loadSale(); 
        loadItemSearch(); 
    }, [])

    useEffect(()=>{
        if(search != ""){
            setItemsFilter(itemsSearch.filter(item => item.codItem.toLowerCase()
                .includes(search.toLowerCase()))); 
            setSuggetionsVisible(true); 
        }else{
            setItemsSearch(itemsSearch);
            setSuggetionsVisible(false);  
        }
    },[search])

    return(
        <div className="container-newsale">
            <header>
                <img src={iconCart} alt="Icone carrinho" width={50} height={50}/>
                <p>Gerar nova venda</p>
            </header>
            <div className="search-item">
                <input 
                    type="text" 
                    placeholder="Informe o código do produto para adicionar" 
                    value={search} 
                    onChange={e=>setSearch(e.target.value)}/>
                <button onClick={()=> addItem()}>Adicionar</button>
                {suggestionsVisible && 
                <div className="suggestions-input">
                    <ul>
                        {itemsFilter.map(item => (
                            <li key={item.codItem} onClick={() => setSearch(item.codItem)}>
                                {item.codItem} - {item.nameItem}
                            </li>
                        ))}
                    </ul>
                </div>}
            </div>
            <div className="box-sale">
            <table>
                <thead>
                    <tr>
                        <th>Código do Item</th>
                        <th>Nome do Item</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                  {itemsSale.map(itemAdd => (
                    <tr key={itemAdd.item.codItem}>
                        <td>{itemAdd.item.codItem}</td>
                        <td>{itemAdd.item.nameItem}</td>
                        <td className="amount">
                            <button className="item-amount" onClick={()=> removeOneUnit(itemAdd.item.codItem)}>-</button>
                            {itemAdd.amount}
                            <button className="item-amount" onClick={()=> addOneUnit(itemAdd.item.codItem)}>+</button>
                        </td>
                        <td>R$ {itemAdd.item.price}</td>
                        <td>
                            <img src={iconRemove} alt="Icone remover" 
                             onClick={()=> removeItem(itemAdd.item.codItem)} width={25} height={25}/>
                        </td>
                    </tr>
                  ))}  
                </tbody>
            </table>
            </div>
            <div className="total-sale">
                <p>Total da venda: R${priceSale}</p>
                <div>
                    <button onClick={()=> cancelSale()}>Cancelar</button>
                    <button onClick={()=> confirmSale()}>Finalizar</button>
                </div>
            </div>
        </div>
    );
}

export default NewSale; 