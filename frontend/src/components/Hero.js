import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-amber-950 to-amber-900 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1485575301924-6891ef935dcd')`
        }}
      ></div>
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="hero-title text-5xl md:text-6xl font-bold mb-6 text-shadow">
          <span className="text-amber-400">Mudança</span> ou <span className="text-amber-400">frete rápido?</span>
        </h2>
        <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
          Nacional e internacional. Mudanças residenciais, comerciais, recolhas em lojas, transportes de bens.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a 
            href="#quote" 
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors btn-primary"
          >
            Solicitar Orçamento Gratuito
          </a>
          <a 
            href="tel:+351930460509" 
            className="bg-transparent border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-amber-950 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;