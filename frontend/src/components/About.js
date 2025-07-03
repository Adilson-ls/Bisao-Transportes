import React from 'react';

const About = () => {
  const features = [
    'Equipe profissional qualificada',
    'Frota moderna e segura',
    'Seguro completo incluído',
    'Orçamento gratuito'
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-amber-950">Sobre a Bisão Transportes</h2>
            <p className="text-lg text-gray-600 mb-6">
              Com anos de experiência no setor de transportes e mudanças, a Bisão Transportes 
              é sinônimo de confiança e qualidade em Portugal.
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e" 
              alt="Bisão Transportes" 
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Anos de experiência</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;