import React from 'react';
import styles from './Contact.module.css';

function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <h2>Fale Conosco</h2>
      <p className={styles.subtitle}>Orçamento gratuito:</p>
      <div className={styles.contactInfo}>
        <a href="tel:+351930460509" className={styles.contactLink}>
          <img src="/phone.svg" alt="Telefone" className={styles.icon} />
          <span>(+351) 930 460 509</span>
        </a>
        <a href="https://wa.me/351930460509" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
          <img src="/whatsapp.svg" alt="WhatsApp" className={styles.icon} />
          <span>WhatsApp</span>
        </a>
      </div>
      <p className={styles.cta}>Estamos prontos para atender suas necessidades de transporte.</p>
    </section>
  );
}

export default Contact;
