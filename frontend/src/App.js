import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    origin: '',
    destination: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          origin: '',
          destination: '',
          description: ''
        });
      } else {
        alert('Erro ao enviar solicitação. Tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao enviar solicitação. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <a href="#services" className="hover:text-amber-300 transition-colors">Serviços</a>
              <a href="#about" className="hover:text-amber-300 transition-colors">Sobre</a>
              <a href="#quote" className="hover:text-amber-300 transition-colors">Orçamento</a>
              <a href="#contact" className="hover:text-amber-300 transition-colors">Contato</a>
            </nav>
            <a href="tel:+351930460509" className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg font-semibold transition-colors">
              (+351) 930 460 509
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-950 to-amber-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1485575301924-6891ef935dcd')`
          }}
        ></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-amber-400">Mudança</span> ou <span className="text-amber-400">frete rápido?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Nacional e internacional. Mudanças residenciais, comerciais, recolhas em lojas, transportes de bens.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#quote" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Solicitar Orçamento Gratuito
            </a>
            <a href="tel:+351930460509" className="bg-transparent border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-amber-950 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Fale Conosco
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-amber-950">Nossos Serviços</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-950">Mudanças Residenciais</h3>
              <p className="text-gray-600">Mudanças completas para casas e apartamentos com toda segurança e cuidado.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white">🏢</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-950">Mudanças Comerciais</h3>
              <p className="text-gray-600">Relocação de escritórios e empresas com mínimo impacto nas suas atividades.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-950">Frete Rápido</h3>
              <p className="text-gray-600">Transporte rápido e seguro de mercadorias e bens diversos.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white">🌍</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-950">Transporte Internacional</h3>
              <p className="text-gray-600">Mudanças e transportes para toda a Europa com documentação completa.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white">🏪</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-950">Recolhas em Lojas</h3>
              <p className="text-gray-600">Coleta de compras em lojas e entrega direta no seu endereço.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white">📦</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-amber-950">Transporte de Bens</h3>
              <p className="text-gray-600">Transporte seguro de móveis, eletrodomésticos e objetos especiais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
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
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Equipe profissional qualificada</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Frota moderna e segura</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Seguro completo incluído</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Orçamento gratuito</span>
                </div>
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

      {/* Quote Section */}
      <section id="quote" className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6 text-amber-950">Solicite Seu Orçamento</h2>
            <p className="text-center text-gray-600 mb-12">
              Preencha o formulário abaixo e receba um orçamento personalizado e gratuito.
            </p>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Serviço</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="mudanca-residencial">Mudança Residencial</option>
                    <option value="mudanca-comercial">Mudança Comercial</option>
                    <option value="frete-rapido">Frete Rápido</option>
                    <option value="transporte-internacional">Transporte Internacional</option>
                    <option value="recolha-lojas">Recolha em Lojas</option>
                    <option value="transporte-bens">Transporte de Bens</option>
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Descreva os detalhes do que precisa transportar ou mudar..."
                ></textarea>
              </div>
              
              <div className="mt-8 text-center">
                <button 
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  Solicitar Orçamento Gratuito
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-amber-950 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Entre em Contato</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Telefone</h3>
              <p className="text-amber-200">Fale conosco, orçamento gratuito:</p>
              <a href="tel:+351930460509" className="text-amber-400 hover:text-amber-300 text-lg font-semibold">
                (+351) 930 460 509
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-amber-200">Envie-nos sua consulta:</p>
              <a href="mailto:info@bisaotransportes.pt" className="text-amber-400 hover:text-amber-300">
                info@bisaotransportes.pt
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🕒</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Horário</h3>
              <p className="text-amber-200">Segunda a Sexta: 8h às 18h</p>
              <p className="text-amber-200">Sábado: 8h às 14h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">🦬</span>
                </div>
                <h3 className="text-xl font-bold">Bisão Transportes</h3>
              </div>
              <p className="text-gray-400">
                Sua mudança e transporte com segurança e qualidade em todo Portugal.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Mudanças Residenciais</li>
                <li>Mudanças Comerciais</li>
                <li>Frete Rápido</li>
                <li>Transporte Internacional</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Informações</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nós</li>
                <li>Orçamento Gratuito</li>
                <li>Seguros</li>
                <li>Termos de Serviço</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 (+351) 930 460 509</p>
                <p>📧 info@bisaotransportes.pt</p>
                <p>🌐 Portugal</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Bisão Transportes. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;