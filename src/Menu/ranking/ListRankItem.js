import React from 'react';

const ListRankItem = ({ position,name,stars }) => {
  return (
    <li>
        <div><h1>{position}°</h1></div>
        <div><h1>{name}</h1></div>
        <div>
            <h1>{stars}</h1>
            <img className="logo img_logo" src={require('../../assets/estrela.png')} alt=""/>
        </div>
    </li> 
    // <li className="Item-container">
    //   <div><h1>{estrelas}</h1></div>
    //     <img className="logo img_logo" src={require('../../assets/money.png')} alt=""/>
    // </li>
  );
};

export default ListRankItem;
