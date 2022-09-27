import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import ListRankItem from './ListRankItem';
import getUrl from '../../data/data'
import './ranking.css'

function DadosRanking(){

    const navigate = useNavigate();
    const [ranking, setRanking] = useState([]);

    useEffect(
        atualizaRanking, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    ) 

    function atualizaRanking(){
        console.log("ATT RANK");
        axios.get(`${getUrl()}/backend_drag_n_drop/api/progress/getranking/`,
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
    
    return(
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
    );
}

export default DadosRanking;