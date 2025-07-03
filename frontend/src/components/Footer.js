import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Serviços',
      links: [
        'Mudanças Residenciais',
        'Mudanças Comerciais',
        'Frete Rápido',
        'Transporte Internacional'
      ]
    },
    {
      title: 'Informações',
      links: [
        'Sobre Nós',
        'Orçamento Gratuito',
        'Seguros',
        'Termos de Serviço'
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 footer-gradient">
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
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
          
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
  );
};

export default Footer;