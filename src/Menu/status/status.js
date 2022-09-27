import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './status.css';
import Cabecalho from '../../Component/Cabecalho/Cabecalho';
import DadosStatus from '../../Component/dadosStatus/DadosStatus';
import DadosScores from '../../Component/dadosScores/DadosScores';
import getUrl from '../../data/data';
import DadosRanking from '../../Component/dadosRanking/DadosRanking';

function Status(){
    const navigate = useNavigate();
    const [name, setname] = useState([]);
    const [stars, setStar] = useState([]);
    const [life, setLife] = useState([]);
    const [money, setmoney] = useState([]);

    useEffect(
        atualizaStatus, // <- function that will run on every dependency update
        []
    )

    function atualizaStatus(){
        console.log("ATT STATUS");
        axios.get(`${getUrl()}/backend_drag_n_drop/api/progress/getprogress/`,
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

    function showStatus(){     
        document.getElementById("status").classList.add("corpo_status");   
        document.getElementById("status").classList.remove("esconde"); 

        document.getElementById("scores").classList.remove("corpo_scores");
        document.getElementById("scores").classList.add("esconde");
        document.getElementById("ranking").classList.remove("corpo_ranking");
        document.getElementById("ranking").classList.add("esconde");
        showHideAba("aba_status","aba_scores","aba_ranking");
    }

    function showScores(){    
        document.getElementById("scores").classList.add("corpo_scores");
        document.getElementById("scores").classList.remove("esconde");

        document.getElementById("status").classList.remove("corpo_status");
        document.getElementById("status").classList.add("esconde");
        document.getElementById("ranking").classList.remove("corpo_ranking");
        document.getElementById("ranking").classList.add("esconde");
        showHideAba("aba_scores","aba_status","aba_ranking");
    }

    function showRanking(){
        document.getElementById("ranking").classList.add("corpo_ranking");
        document.getElementById("ranking").classList.remove("esconde");

        document.getElementById("scores").classList.remove("corpo_scores");
        document.getElementById("scores").classList.add("esconde");
        document.getElementById("status").classList.remove("corpo_status");
        document.getElementById("status").classList.add("esconde");
        showHideAba("aba_ranking","aba_status","aba_scores");
    }

    function showHideAba(showAba,hideAba_1,hideAba_2){
        document.getElementById(showAba).classList.add("aba_clicada");   
        document.getElementById(hideAba_1).classList.remove("aba_clicada");
        document.getElementById(hideAba_2).classList.remove("aba_clicada");
    }

    return(
        <div className="wrapper_menus">
            <Cabecalho 
                name={name}
            />
            <div className="abas">
                <button id="aba_status" className="aba_clicada aba" onClick={showStatus}>Status</button>
                <button id="aba_scores" className="aba" onClick={showScores}>Scores</button>
                <button id="aba_ranking" className="aba" onClick={showRanking}>Ranking</button>
            </div>
            <DadosStatus
                stars={stars}
                life={life}
                money={money}
            />
            <DadosScores
                // id={scores.id}
                // score={scores.score}
            />
            <DadosRanking
                // id={ranking.id}
                // position={ranking.position}
                // name={ranking.name}
                // stars={ranking.stars}
            />
        </div>
    )
}

export default Status;