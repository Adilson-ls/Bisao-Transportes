import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    origin: '',
    destination: ''
  });
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    origin: '',
    destination: '',
    date: '',
    details: ''
  });
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    fetchServices();
    fetchTestimonials();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/services`);
      const data = await response.json();
      setServices(data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/testimonials`);
      const data = await response.json();
      setTestimonials(data.testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        setContactForm({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          origin: '',
          destination: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
      setSubmitStatus('error');
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteForm),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        setShowQuoteModal(false);
        setQuoteForm({
          name: '',
          email: '',
          phone: '',
          service: '',
          origin: '',
          destination: '',
          date: '',
          details: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">🦬</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bisão Transportes</h1>
                <p className="text-sm text-gray-600">Mudanças e Transportes</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-gray-700 hover:text-amber-600 transition-colors">Serviços</a>
              <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors">Sobre</a>
              <a href="#testimonials" className="text-gray-700 hover:text-amber-600 transition-colors">Depoimentos</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contato</a>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Orçamento Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1616432043562-3671ea2e5242?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-amber-800/90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Mudança ou Frete Rápido?
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Nacional e internacional. Mudanças residenciais, comerciais, recolhas em lojas e transportes de bens.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Orçamento Gratuito
                </button>
                <a
                  href="tel:+351930460509"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-amber-600 transition-colors"
                >
                  📞 (+351) 930 460 509
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas em transportes e mudanças para atender todas as suas necessidades.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre a Bisão Transportes</h2>
              <p className="text-lg text-gray-600 mb-6">
                Com anos de experiência no mercado, a Bisão Transportes é sinônimo de confiança e qualidade 
                no setor de mudanças e transportes. Nossa equipe especializada garante que seus bens sejam 
                tratados com o máximo cuidado e profissionalismo.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">10+</div>
                  <div className="text-gray-600">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
                  <div className="text-gray-600">Clientes Satisfeitos</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/7464684/pexels-photo-7464684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Serviço de mudanças" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="Transporte de mercadorias" 
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
            <p className="text-xl text-gray-600">Confiança construída através de serviços de qualidade</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.message}"</p>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.service}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
            <p className="text-xl text-gray-600">Fale connosco e obtenha seu orçamento gratuito</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <p className="text-gray-600">(+351) 930 460 509</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📧</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@bisaotransportes.pt</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🕐</span>
                  <div>
                    <p className="font-semibold">Horário</p>
                    <p className="text-gray-600">Segunda a Sexta: 8h - 18h</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
                  <select
                    value={contactForm.service}
                    onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="mudancas-residenciais">Mudanças Residenciais</option>
                    <option value="mudancas-comerciais">Mudanças Comerciais</option>
                    <option value="transporte-mercadorias">Transporte de Mercadorias</option>
                    <option value="recolhas-lojas">Recolhas em Lojas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold">🦬</span>
              </div>
              <span className="text-xl font-bold">Bisão Transportes</span>
            </div>
            <p className="text-gray-400 mb-4">
              Mudanças e transportes com qualidade e confiança
            </p>
            <p className="text-gray-400 text-sm">
              © 2024 Bisão Transportes. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-90vh overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Pedido de Orçamento</h3>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={quoteForm.name}
                  onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={quoteForm.email}
                  onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={quoteForm.phone}
                  onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
                <select
                  value={quoteForm.service}
                  onChange={(e) => setQuoteForm({...quoteForm, service: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                >
                  <option value="">Selecione um serviço</option>
                  <option value="mudancas-residenciais">Mudanças Residenciais</option>
                  <option value="mudancas-comerciais">Mudanças Comerciais</option>
                  <option value="transporte-mercadorias">Transporte de Mercadorias</option>
                  <option value="recolhas-lojas">Recolhas em Lojas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Origem</label>
                <input
                  type="text"
                  value={quoteForm.origin}
                  onChange={(e) => setQuoteForm({...quoteForm, origin: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
                <input
                  type="text"
                  value={quoteForm.destination}
                  onChange={(e) => setQuoteForm({...quoteForm, destination: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Preferida</label>
                <input
                  type="date"
                  value={quoteForm.date}
                  onChange={(e) => setQuoteForm({...quoteForm, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detalhes</label>
                <textarea
                  value={quoteForm.details}
                  onChange={(e) => setQuoteForm({...quoteForm, details: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Descreva os detalhes do seu pedido..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
              >
                Solicitar Orçamento
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success/Error Messages */}
      {submitStatus && (
        <div className={`fixed top-4 right-4 p-4 rounded-md z-50 ${
          submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {submitStatus === 'success' ? 
            'Mensagem enviada com sucesso!' : 
            'Erro ao enviar. Tente novamente.'
          }
          <button
            onClick={() => setSubmitStatus('')}
            className="ml-4 text-lg font-bold"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default App;