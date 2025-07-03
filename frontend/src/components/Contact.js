import React from 'react';

const Contact = () => {
  const contactInfo = [
    {
      icon: '📞',
      title: 'Telefone',
      description: 'Fale conosco, orçamento gratuito:',
      content: '(+351) 930 460 509',
      link: 'tel:+351930460509'
    },
    {
      icon: '📧',
      title: 'Email',
      description: 'Envie-nos sua consulta:',
      content: 'info@bisaotransportes.pt',
      link: 'mailto:info@bisaotransportes.pt'
    },
    {
      icon: '🕒',
      title: 'Horário',
      description: 'Segunda a Sexta: 8h às 18h',
      content: 'Sábado: 8h às 14h',
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-amber-950 text-white contact-gradient">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Entre em Contato</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{info.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{info.title}</h3>
              <p className="text-amber-200">{info.description}</p>
              {info.link ? (
                <a href={info.link} className="text-amber-400 hover:text-amber-300 text-lg font-semibold">
                  {info.content}
                </a>
              ) : (
                <p className="text-amber-200">{info.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;