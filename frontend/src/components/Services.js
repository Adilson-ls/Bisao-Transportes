import React from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const services = [
    {
      icon: '🏠',
      title: 'Mudanças Residenciais',
      description: 'Mudanças completas para casas e apartamentos com toda segurança e cuidado.'
    },
    {
      icon: '🏢',
      title: 'Mudanças Comerciais',
      description: 'Relocação de escritórios e empresas com mínimo impacto nas suas atividades.'
    },
    {
      icon: '🚚',
      title: 'Frete Rápido',
      description: 'Transporte rápido e seguro de mercadorias e bens diversos.'
    },
    {
      icon: '🌍',
      title: 'Transporte Internacional',
      description: 'Mudanças e transportes para toda a Europa com documentação completa.'
    },
    {
      icon: '🏪',
      title: 'Recolhas em Lojas',
      description: 'Coleta de compras em lojas e entrega direta no seu endereço.'
    },
    {
      icon: '📦',
      title: 'Transporte de Bens',
      description: 'Transporte seguro de móveis, eletrodomésticos e objetos especiais.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-amber-950">Nossos Serviços</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;