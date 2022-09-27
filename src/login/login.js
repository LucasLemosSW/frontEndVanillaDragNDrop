import React,{useState,useEffect} from 'react';
import {NavLink,useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios';
import './login.css';
import getUrl from '../data/data.js'

// const url = "http://192.168.8.4"; // IPV4

function Login(props){

    const location = useLocation();
    const navigate = useNavigate();
    const [mensage, setMensage] = useState("");
    const [mensagedois, setMensagedois] = useState("");

    function escreveMsg(){
        if(location.state!=null){
            setMensagedois(location.state.mensagem);
        }
    }

    function verificaToken(){
        if(localStorage.getItem("tokenDragnDrop"))
            navigate("/menus/status"); 
    }

    useEffect(
        escreveMsg, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    )

    useEffect(
        verificaToken, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    )

    const logar= async (e)=>{

        e.preventDefault();

        if(e.target.elements.email.value==="" && e.target.elements.password.value===""){
            setMensage("Preencha e-mail e senha");
            return;

        }else if(e.target.elements.email.value===""){
            setMensage("Preencha o e-mail");
            return;
        }else if(e.target.elements.password.value===""){
            setMensage("Preencha a senha");
            return;
        }

        const data= {
            emailUsuario: e.target.elements.email.value,
            passwordUsuario: e.target.elements.password.value,
        }

        axios.post(`${getUrl()}/backend_drag_n_drop/api/AuthController/login/`, {
            email: data.emailUsuario,
            password: data.passwordUsuario
            })
            .then(function (response) {
            if(response.data.status==="sucess"){
                console.log(response.data);
                setMensage("");
                localStorage.setItem("tokenDragnDrop",response.data.data);
                navigate("/menus/status");
            }
            else {
                if(response.data.status==="error"){setMensage(response.data.data);}
                    console.log(response.data);
            }  
            }).catch(function (error) {
            console.log("AQUI");
            console.log(error);
            setMensage(error.message);
            // navigate("/");
            });
        }

        return(
            <div className="wrapper_login">
                <div className="cabecalho_login"></div>
                <div className="saudacao_login">
                    <img className="logo_login img_logo" onClick={()=>navigate("/")} src={require('../assets/dragndroplogo.png')} alt=""/>
                    <h1>Bem vindo!</h1>
                    <p>Faça login para continuar</p>
                    <p>{mensagedois}</p>
                    <p className="message">{mensage}</p>
                </div>
                <form className="formulario_login" onSubmit={logar}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email"/>

                        <label htmlFor="password">Senha:</label>
                        <input id="password" name="password" type="password"/>
                    </div>
                    <div>
                        <button className="logar_login" type="submit">Logar</button>
                        <p>Não tem uma conta? <NavLink to="/cadastro">Criar Conta</NavLink></p>
                    </div>
                </form>
            </div>
        )
}

export default Login;