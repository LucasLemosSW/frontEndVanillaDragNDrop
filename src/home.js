import React  from 'react';
import {useNavigate} from 'react-router-dom'
import './home.css';

function Home(){

    const navigate = useNavigate();
        return(
            <div className="wrapper_home">
                <div className="cabecalho_home"></div>
                {/* <h1>Bem vindo</h1> */}
                {/* <p className='boasVindas'>Bem vindo</p> */}
                <div className='corpo_home'>
                    <div className='corpo_home_esquerda'>
                        <div>
                            <h1>Bem vindo!</h1>
                            <h2>Drag n' Drop</h2>
                        </div>
                        <img src={require('./assets/character.png')} alt=""/>
                    </div>
                    <div className='corpo_home_direita'>
                        <img src={require('./assets/smartphone_game.png')} alt=""/>
                        <div>
                            <h1>Baixe o App!</h1>
                            <h2>Disponivel para android e IOS</h2>
                        </div>
                        <div className='botoes_loja'>
                            <img src={require('./assets/Botão_googleplay.png')} alt=""/>
                            <img src={require('./assets/Botão_AppStore.png')} alt=""/>
                        </div>
                    </div>
                </div>
                
                <img className="logo_home img_logo_home" src={require('./assets/dragndroplogo.png')} alt=""/>
                <button className="logar_home" onClick={()=>navigate("/login")}>logar</button>
                <button className="cadastrar_home" onClick={()=>navigate("/cadastro")}>Cadastrar</button>
            </div>
        );
    // }
}

export default Home;