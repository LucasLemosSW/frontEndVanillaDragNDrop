import {useNavigate} from 'react-router-dom'

export function Sair(){
    const navigate = useNavigate();
    localStorage.removeItem('tokenDragnDrop');
    navigate("/")
}