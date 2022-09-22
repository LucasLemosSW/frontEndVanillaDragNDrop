import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './status.css';
import Cabecalho from '../../Component/Cabecalho';
import ListItem from '../scores/ListItem';
import ListRankItem from '../ranking/ListRankItem';

function Status(){
    const navigate = useNavigate();
    const [name, setname] = useState([]);
    const [stars, setStar] = useState([]);
    const [life, setLife] = useState([]);
    const [money, setmoney] = useState([]);
    const [scores, setScores] = useState([]);
    const [ranking, setRanking] = useState([]);

    useEffect(
        atualizaStatus, // <- function that will run on every dependency update
        []
    )

    useEffect(
        atualizaScores, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    ) 

    useEffect(
        atualizaRanking, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    ) 

    function atualizaRanking(){
        console.log("ATT RANK");
        axios.get('http://192.168.8.4/backend_drag_n_drop/api/progress/getranking/',
        {
            headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('tokenDragnDrop'),
            }
        })
            .then(function (response) {
                console.log(response.data.data);
                let vetorRanking= [];
                response.data.data.forEach((value,index) => {
                    vetorRanking.push({id: index, position:value.id, name:value.name, stars:value.stars})
                });
                console.log(vetorRanking);
                setRanking(vetorRanking);
            }).catch(function (error) {
            console.log(error);
            navigate("/");
            });
        }

    function atualizaScores(){
        console.log("ATT SCORES");
        console.log("ATT RANK");
        axios.get('http://192.168.8.4/backend_drag_n_drop/api/scores/getscores/',
        {
            headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('tokenDragnDrop'),
            }
        })
            .then(function (response) {
                // console.log(response.data.data);
                let vetorEstrelas= [];
                response.data.data.forEach((value,index) => {
                    vetorEstrelas.push({id: index, score:value.score})
                });
                console.log(vetorEstrelas);
                setScores(vetorEstrelas);
            }).catch(function (error) {
                console.log(error);
                sair();
            });
        }

    function atualizaStatus(){
        console.log("ATT STATUS");
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

    function showHide(){
        
        document.getElementById("status").classList.add("corpo_status");   
        document.getElementById("status").classList.remove("esconde"); 

        document.getElementById("scores").classList.remove("corpo_scores");
        document.getElementById("scores").classList.add("esconde");
        document.getElementById("ranking").classList.remove("corpo_ranking");
        document.getElementById("ranking").classList.add("esconde");

        document.getElementById("aba_status").classList.add("aba_clicada");   
        document.getElementById("aba_scores").classList.remove("aba_clicada");
        document.getElementById("aba_ranking").classList.remove("aba_clicada");
    }

    function showStatus(){
        
        document.getElementById("status").classList.add("corpo_status");   
        document.getElementById("status").classList.remove("esconde"); 

        document.getElementById("scores").classList.remove("corpo_scores");
        document.getElementById("scores").classList.add("esconde");
        document.getElementById("ranking").classList.remove("corpo_ranking");
        document.getElementById("ranking").classList.add("esconde");

        document.getElementById("aba_status").classList.add("aba_clicada");   
        document.getElementById("aba_scores").classList.remove("aba_clicada");
        document.getElementById("aba_ranking").classList.remove("aba_clicada");
    }

    function showScores(){
        
        document.getElementById("scores").classList.add("corpo_scores");
        document.getElementById("scores").classList.remove("esconde");

        document.getElementById("status").classList.remove("corpo_status");
        document.getElementById("status").classList.add("esconde");
        document.getElementById("ranking").classList.remove("corpo_ranking");
        document.getElementById("ranking").classList.add("esconde");

        document.getElementById("aba_scores").classList.add("aba_clicada");   
        document.getElementById("aba_status").classList.remove("aba_clicada");
        document.getElementById("aba_ranking").classList.remove("aba_clicada");
    }

    function showRanking(){
        
        document.getElementById("ranking").classList.add("corpo_ranking");
        document.getElementById("ranking").classList.remove("esconde");

        document.getElementById("scores").classList.remove("corpo_scores");
        document.getElementById("scores").classList.add("esconde");
        document.getElementById("status").classList.remove("corpo_status");
        document.getElementById("status").classList.add("esconde");

        document.getElementById("aba_ranking").classList.add("aba_clicada");   
        document.getElementById("aba_status").classList.remove("aba_clicada");
        document.getElementById("aba_scores").classList.remove("aba_clicada");
    }

    return(
        <div className="wrapper_menus">
            <Cabecalho name={name}>
            </Cabecalho>
            {/* <div className="cabecalho"></div>
            <p className='boasVindas'>Bem vindo, {name}</p>
            <button className="botao_padrao sair" onClick={sair}>Sair</button> */}
            <div className="abas">
                {/* <button className="aba_clicada aba" onClick={()=>navigate("/menus/status")}>Status</button>
                <button className="aba" onClick={()=>navigate("/menus/scores")}>Scores</button> */}
                <button id="aba_status" className="aba_clicada aba" onClick={showStatus}>Status</button>
                <button id="aba_scores" className="aba" onClick={showScores}>Scores</button>
                <button id="aba_ranking" className="aba" onClick={showRanking}>Ranking</button>
            </div>
            <div id="status" className="corpo_status">
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
            <div id="scores" className=" esconde">
                <h1>Scores</h1>
                <button className="logar sair" onClick={atualizaScores}>Refresh</button>
                <div className="dados_scores">
                    {scores.length ?
                    <ul>
                    {
                    scores.map(({id,score}) => (
                        <ListItem 
                        key={id}
                        estrelas={score}
                        />
                        ))
                    }                        
                    </ul> : <h1>Você ainda não possui nenhum score </h1>
                    }
                </div>
            </div>
            <div id="ranking" className="esconde">
                <h1>Ranking</h1>
                <button className="logar sair" onClick={atualizaRanking}>Refresh</button>
                <div className="dados_Ranking">
                    <ul>
                        {
                        ranking.map(({id,position,name,stars}) => (
                            <ListRankItem 
                            key={id}
                            position={id+1}
                            name={name}
                            stars={stars}
                            />
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Status;