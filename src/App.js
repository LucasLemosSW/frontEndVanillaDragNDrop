import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from './home';
import Login from './login/login';
import Cadastro from './cadastro/cadastro';
import Status from './Menu/status/status';
import {PrivateRoute} from './routes/privateRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/menus/status" element={<PrivateRoute><Status/></PrivateRoute>}/>
        {/* <Route path="/menus/scores" element={<PrivateRoute><Scores/></PrivateRoute>}/>
        <Route path="/menus/ranking" element={<PrivateRoute><Ranking/></PrivateRoute>}/> */}
        <Route path="*" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
