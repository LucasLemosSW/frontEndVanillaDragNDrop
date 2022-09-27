import React,{useState,useEffect} from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import getUrl from '../../data/data'
import './scores.css'
import {Sair} from '../functions/functions'

function DadosScores(){

    const [scores, setScores] = useState([]);

    useEffect(
        atualizaScores, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    ) 

    function atualizaScores(){
        console.log("ATT SCORES");
        console.log("ATT RANK");
        axios.get(`${getUrl()}/backend_drag_n_drop/api/scores/getscores/`,
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
                Sair();
            });
        }

    return(
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
        
    );
}

export default DadosScores;