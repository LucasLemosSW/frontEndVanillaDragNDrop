import React from 'react';
import './Cabecalho.css';


const Cabecalho = ({ name }) => {

    return(
        <div className="cabecalho">
            <p className='boasVindas'>Bem vindo, {name}</p>
            <button className="botao_padrao sair" onClick={sair}>Sair</button>
        </div>
    );
}

export default Cabecalho;