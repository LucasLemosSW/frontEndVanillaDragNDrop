import React from 'react';
// import ListItem from '../scores/ListItem';
// import ListRankItem from '../ranking/ListRankItem';

function DadosStatus({ stars,life,money }){
    return(
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
    );
}

export default DadosStatus;