import React, { useEffect, useState } from "react";
import './style.css'
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import iconRemove from '../../assets/icon-remove.png';
import iconProduct from "../../assets/icon-produto.png"; 
import {toast} from 'react-toastify'; 

const ListItem = ()=>{
    const [items, setItems] = useState([]); 
    const [itemsSearch, setItemsSearch] = useState([]); 
    const [search, setSearch] = useState(""); 
    const navegation = useNavigate(); 

    const loadItems = async()=>{
        const response = await axios.get("https://localhost:7121/api/Item/list");
        setItems(response.data);
        setItemsSearch(response.data); 
    }

    const deleteItem = async(codItem)=>{
        await axios.delete(`https://localhost:7121/api/Item/delete?codItem=${codItem}`) 
            .then(response => {
                toast.success(`Item com o código ${codItem} deletado com sucesso!`); 
                loadItems();
            })
            .catch(error => {
                toast.error('Ocorreu um erro ao deletar o item. Por favor, tente novamente.');
            }); 
    }

    useEffect(()=>{
         loadItems(); 
    }, [])

    useEffect(()=>{
        if(search != ""){
            setItemsSearch(items.filter(item => item.nameItem.toLowerCase()
                .includes(search.toLowerCase()))); 
        }else{
            setItemsSearch(items); 
        }
    }, [search])

    return(
        <div className="container-list">
            <header>
                <img src={iconProduct} alt="Icone produto" width={50}/>
                <p>LISTAGEM DE PRODUTOS CADASTRADOS</p>
                <button onClick={()=> navegation('/')}>Voltar</button>
            </header>
            <div className="search-item">
                <input type="text" placeholder="Pesquise o item pelo nome" value={search} 
                    onChange={e=>setSearch(e.target.value)}/>
            </div>
            <div className="box-list">
                <table>
                    <thead>
                        <tr>
                            <th>Código do Item</th>
                            <th>Nome do Item</th>
                            <th>Valor</th>
                            <th>Apagar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {itemsSearch.map(item => (
                        <tr key={item.codItem}>
                            <td>{item.codItem}</td>
                            <td>{item.nameItem}</td>
                            <td>R$ {item.price}</td>
                            <td>
                                <img src={iconRemove} alt="Icone remover" 
                                    onClick={()=> deleteItem(item.codItem)} width={25} height={25}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="add-item">
                <button onClick={()=> navegation('/additem')}>
                    <p className="txt-item">Adicionar Item</p>
                </button>
            </div>
        </div>
    ); 
}

export default ListItem; 