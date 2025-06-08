import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DashboardAdm from './pages/DashboardAdm';
import PainelMotorista from './pages/PainelMotorista';
import PainelCliente from './pages/PainelCliente';
import FreteDetalhes from './pages/FreteDetalhes';
import LoginForm from './components/LoginForm';
import CadastroCliente from './components/CadastroCliente';
import CadastroMotorista from './components/CadastroMotorista';
import FreteForm from './components/FreteForm';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={DashboardAdm} />
        <Route path="/painel-motorista" component={PainelMotorista} />
        <Route path="/painel-cliente" component={PainelCliente} />
        <Route path="/frete-detalhes" component={FreteDetalhes} />
        <Route path="/login" component={LoginForm} />
        <Route path="/cadastro-cliente" component={CadastroCliente} />
        <Route path="/cadastro-motorista" component={CadastroMotorista} />
        <Route path="/simular-frete" component={FreteForm} />
      </Switch>
    </Router>
  );
}

export default App;