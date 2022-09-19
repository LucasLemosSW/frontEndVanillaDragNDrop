import React,{useState} from 'react';
import './cadastro.css';
import {NavLink,useNavigate} from 'react-router-dom'
import axios from 'axios';

function Cadastro(){

    const navigate = useNavigate();
    const [mensage, setMensage] = useState("");

    const Criar= async (e)=>{

        e.preventDefault();

        if(e.target.elements.nome.value==="" && e.target.elements.email.value==="" && e.target.elements.password.value===""){
            setMensage("Preencha todos os dados para realizar o cadastro");
            return;

        }else if(e.target.elements.nome.value===""){
            setMensage("Preencha o seu nome");
            return;
        }else if(e.target.elements.email.value===""){
            setMensage("Preencha a seu email");
            return;
        }else if(e.target.elements.password.value===""){
            setMensage("Preencha a sua senha");
            return;
        }

        const cadastroHorario = new Date();

        const data= {
            usuarioNome: e.target.elements.nome.value,
            emailUsuario: e.target.elements.email.value,
            passwordUsuario: e.target.elements.password.value,
            dataCadastro:`${cadastroHorario.getFullYear()}-${cadastroHorario.getMonth()}-${cadastroHorario.getDate()} ${cadastroHorario.getHours()}:${cadastroHorario.getMinutes()}:${cadastroHorario.getSeconds()}`,
        }

        // console.log(data);

        axios.post('http://192.168.8.4/backend_drag_n_drop/api/users/addUser', {
            username: data.usuarioNome,
            name: data.usuarioNome,
            email: data.emailUsuario,
            password: data.passwordUsuario,
            timestamp: data.dataCadastro
            })
            .then(function (response) {
                console.log(response.data);
                navigate('/login',{state:{mensagem:'Cadastro quase pronto! \n Click no link enviado para seu email para confirma-lo'}}); 
            }).catch(function (error) {
                console.log(error);
            });
        }

    return(
        <div className="wrapper_cadastro">
            <div className="saudacao_cadastro">
                <h1>Criar Conta</h1>
                <p>Cria uma nova conta</p>
                <p className="message">{mensage}</p>
            </div>
                <form className="formulario_cadastro" onSubmit={Criar}>
                    <div>
                        <label htmlFor="Nome">Nome:</label>
                        <input id="nome" name="nome" type="text"/>
        
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email"/>
        
                        <label htmlFor="password">Senha:</label>
                        <input id="password" name="password" type="password"/>
                    </div>
                    <div>
                        <button className="logar_cadastro" type="submit" >Criar</button>
                        <p>já tem uma conta? <NavLink to="/login">Logar</NavLink></p>
                    </div>
                </form>
        </div>
    )
}

export default Cadastro;