import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './scores.css';
import ListItem from './ListItem';
import Cabecalho from '../../Component/Cabecalho';

function Scores(){

    const navigate = useNavigate();
    const [scores, setScores] = useState([]);

    useEffect(
        atualiza, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    ) 

    function atualiza(){
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

    function sair(){
        localStorage.removeItem('tokenDragnDrop');
        navigate("/")
    }

    return(
        <div className="wrapper_menus">
            <Cabecalho name={"name"}>
            </Cabecalho>
            {/* <div className="cabecalho"></div>
            <button className="logar sair" onClick={sair}>Sair</button> */}
            <div className="abas">
                <button className="aba" onClick={()=>navigate("/menus/status")}>Status</button>
                <button className="aba_clicada aba" onClick={()=>navigate("/menus/scores")}>Scores</button>
                <button className="aba" onClick={()=>navigate("/menus/ranking")}>Ranking</button>
            </div>
            <div className="corpo_scores">
                <h1>Scores</h1>
                <button className="logar sair" onClick={atualiza}>Refresh</button>
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
        </div>
    )
}

export default Scores;