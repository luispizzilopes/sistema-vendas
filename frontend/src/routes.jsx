import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ListItem from "./pages/ListItem/index.jsx";
import Home from "./pages/Home/index.jsx"; 
import NewSale from "./pages/NewSale/index.jsx";
import AddItem from "./pages/AddItem/index.jsx";
import DetailSale from "./pages/DetailSale/index.jsx";

const routes = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={Home}/>
                <Route path="/list" Component={ListItem}/>
                <Route path="/newsale" Component={NewSale}/>
                <Route path="/additem" Component={AddItem}/>
                <Route path="/detailsale/:id" Component={DetailSale}/>
            </Routes>
        </BrowserRouter>
    );
}

export default routes; 