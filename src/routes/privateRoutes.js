import React from 'react';
import {Navigate} from 'react-router-dom'



export function PrivateRoute({children}){
    
    // const api = axios.create({
    //     baseURL:`http://192.168.8.4/backend_drag_n_drop/api/AuthController/login/`
    // })
    
    function autenticacao(){
        if(localStorage.getItem("tokenDragnDrop"))
            return true;
        else    
            return false;        
    }

    return autenticacao() ? children : <Navigate to="/"/>;
}