import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>Bisão Transportes</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/cadastro-cliente">Cadastro Cliente</a></li>
          <li><a href="/cadastro-motorista">Cadastro Motorista</a></li>
          <li><a href="/frete">Simular Frete</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;