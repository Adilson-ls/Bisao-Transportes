import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// Importe outras páginas conforme necessário

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Adicione outras rotas aqui */}
      </Routes>
    </Router>
  );
};

export default App;
