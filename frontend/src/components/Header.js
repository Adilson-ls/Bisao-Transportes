import React from 'react';

const Header = () => {
  return (
    <header className="bg-amber-950 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">🦬</span>
            </div>
            <h1 className="text-2xl font-bold">Bisão Transportes</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="nav-link hover:text-amber-300 transition-colors">
              Serviços
            </a>
            <a href="#about" className="nav-link hover:text-amber-300 transition-colors">
              Sobre
            </a>
            <a href="#quote" className="nav-link hover:text-amber-300 transition-colors">
              Orçamento
            </a>
            <a href="#contact" className="nav-link hover:text-amber-300 transition-colors">
              Contato
            </a>
          </nav>
          <a 
            href="tel:+351930460509" 
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg font-semibold transition-colors btn-primary"
          >
            (+351) 930 460 509
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;