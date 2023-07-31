import React, { useState } from "react";
import iconAdd from "../../assets/icon-add.png"; 
import './style.css'
import {useNavigate} from 'react-router-dom'; 
import axios from 'axios'; 
import {toast} from 'react-toastify'; 

const AddItem = ()=>{
    const navegation = useNavigate();
    const [codItem, setCodItem] = useState('');
    const [nameItem, setNameItem] = useState('');
    const [price, setPrice] = useState(0);

    const addNewItem = async () => {
        const request = {
            "codItem": codItem,
            "nameItem": nameItem,
            "price": price
        }
      
        if (codItem !== "" && nameItem !== "" && price > 0) {
          try {
            await axios.post("https://localhost:7121/api/Item/add", request); 
            toast.success(`Item ${nameItem} adicionado com sucesso!`);
            resetValues(); 
          } catch (error) {
            toast.error("Ocorreu um erro durante o cadastro, tente novamente!");
          }
        } else {
          toast.warn("Verifique todos os campos e tente novamente!"); 
        }
    }

    const resetValues = ()=>{
        setCodItem("");
        setNameItem("");
        setPrice(0); 
    }

    return(
        <div className="container-additem">
            <header>
                <img src={iconAdd} alt="Icone adicionar" width={50}/>
                <p>ADICIONAR NOVO ITEM</p>
            </header>
            <div className="info-item">
                <h2>Insira as seguintes informações para adicionar um novo item</h2>
                <p>Código do item:</p>
                <input type="text" value={codItem} onChange={e => setCodItem(e.target.value)}/>
                <p>Nome do item:</p>
                <input type="text" value={nameItem} onChange={e=> setNameItem(e.target.value)}/>
                <p>Preço do item:</p>
                <input type="number" value={price} onChange={e=> setPrice(e.target.value)}/>
                <button onClick={()=> addNewItem()}>Adicionar Item</button>
                <button onClick={()=> navegation('/list')}>Voltar</button>
            </div>
        </div>
    ); 
}

export default AddItem;