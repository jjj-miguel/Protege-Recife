import './App.css';
import {BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

//pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';

//hook
import useAuthentication from './hook/useAuthentication';

function App() {

  const { usuario } = useAuthentication();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={usuario ? <Home /> : <Navigate to='/login' />} />
          <Route path='/cadastro' element={!usuario ? <Cadastro /> : <Navigate to="/" /> }/>
          <Route path='/login' element={!usuario ?  <Login /> : <Navigate to="/" /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
