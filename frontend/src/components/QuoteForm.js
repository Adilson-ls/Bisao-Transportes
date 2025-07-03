import React, { useState } from 'react';
import { useQuote } from '../hooks/useQuote';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    origin: '',
    destination: '',
    description: ''
  });

  const { submitQuote, isLoading, error } = useQuote();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitQuote(formData);
    if (success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        origin: '',
        destination: '',
        description: ''
      });
    }
  };

  const serviceOptions = [
    { value: 'mudanca-residencial', label: 'Mudança Residencial' },
    { value: 'mudanca-comercial', label: 'Mudança Comercial' },
    { value: 'frete-rapido', label: 'Frete Rápido' },
    { value: 'transporte-internacional', label: 'Transporte Internacional' },
    { value: 'recolha-lojas', label: 'Recolha em Lojas' },
    { value: 'transporte-bens', label: 'Transporte de Bens' }
  ];

  return (
    <section id="quote" className="py-20 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-amber-950">Solicite Seu Orçamento</h2>
          <p className="text-center text-gray-600 mb-12">
            Preencha o formulário abaixo e receba um orçamento personalizado e gratuito.
          </p>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 quote-form">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Serviço</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Selecione um serviço</option>
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Origem</label>
                <input 
                  type="text" 
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Cidade ou endereço de origem"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
                <input 
                  type="text" 
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Cidade ou endereço de destino"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Serviço</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                disabled={isLoading}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
                placeholder="Descreva os detalhes do que precisa transportar ou mudar..."
              ></textarea>
            </div>
            
            <div className="mt-8 text-center">
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
              >
                {isLoading ? (
                  <>
                    <div className="spinner mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  'Solicitar Orçamento Gratuito'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;