import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ListRankItem from './ListRankItem'
import axios from 'axios';
import './ranking.css';
import Cabecalho from '../../Component/Cabecalho/Cabecalho';

function Ranking(){
    const navigate = useNavigate();
    const [ranking, setRanking] = useState([]);

    useEffect(
        atualizaRanking, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    ) 

    function atualizaRanking(){
        axios.get('http://172.17.5.221/backend_drag_n_drop/api/progress/getranking/',
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
                <button className="aba" onClick={()=>navigate("/menus/scores")}>Scores</button>
                <button className="aba_clicada aba" onClick={()=>navigate("/menus/ranking")}>Ranking</button>
            </div>
            <div className="corpo_ranking">
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

export default Ranking;