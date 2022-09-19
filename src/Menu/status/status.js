import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './status.css';


function Status(){
    const navigate = useNavigate();
    const [name, setname] = useState([]);
    const [stars, setStar] = useState([]);
    const [life, setLife] = useState([]);
    const [money, setmoney] = useState([]);
    

    useEffect(
        atualizaStatus, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    )

    function atualizaStatus(){
        axios.get('http://192.168.8.4/backend_drag_n_drop/api/progress/getprogress/',
        {
            headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('tokenDragnDrop'),
            }
        })
        .then(function (response) {
            console.log(response.data.data.money);
            setname(response.data.data.nome);
            setStar(response.data.data.stars);
            setLife(response.data.data.life);
            setmoney(response.data.data.money);
        }).catch(function (error) {
        console.log(error);
        navigate("/");
        });
    }

    function sair(){
        localStorage.removeItem('tokenDragnDrop');
        navigate("/")
    }

    return(
        <div className="wrapper_menus">
            <div className="cabecalho"></div>
            <p className='boasVindas'>Bem vindo, {name}</p>
            <button className="botao_padrao sair" onClick={sair}>Sair</button>
            <div className="abas">
                <button className="aba_clicada aba" onClick={()=>navigate("/menus/status")}>Status</button>
                <button className="aba" onClick={()=>navigate("/menus/scores")}>Scores</button>
                <button className="aba" onClick={()=>navigate("/menus/ranking")}>Ranking</button>
            </div>
            <div className="corpo">
                <h1>Status</h1>
                <img className="heroi img_logo" src={require('../../assets/character.png')} alt=""/>
                <div className="dados">
                    <ul>
                        <li>
                            <div></div>
                            <div><h1>{stars}</h1></div>
                            <img className="logo img_logo" src={require('../../assets/estrela.png')} alt=""/>
                        </li>
                        <li>
                            <div></div>
                            <div><h1>{life}</h1></div>
                            <img className="logo img_logo" src={require('../../assets/coracao.png')} alt=""/>
                        </li><li>
                            <div></div>
                            <div><h1>{money}</h1></div>
                            <img className="logo img_logo" src={require('../../assets/money.png')} alt=""/>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Status;