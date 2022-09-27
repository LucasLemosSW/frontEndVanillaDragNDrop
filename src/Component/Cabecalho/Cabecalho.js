import React from 'react';
import './Cabecalho.css';
import '../../Menu/status/status';
import {useNavigate} from 'react-router-dom'
import './Cabecalho.css'

const Cabecalho = ({ name }) => {
    const navigate = useNavigate();

    function sair(){
        localStorage.removeItem('tokenDragnDrop');
        navigate("/")
    }

    return(
        <div className="cabecalho">
            <p className='boasVindas'>Bem vindo, {name}</p>
            <button className="botao_padrao sair" onClick={sair}>Sair</button>
        </div>
    );
}

export default Cabecalho;