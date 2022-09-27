import React from 'react';

const ListItem = ({ estrelas }) => {
  return (
    <li className="Item-container">
      <div><h1>{estrelas}</h1></div>
        <img className="logo img_logo" src={require('../../assets/money.png')} alt=""/>
    </li>
  );
};

export default ListItem;
