import React from 'react';
import styles from './Services.module.css';

function Services() {
  const servicesList = [
    "Nacional e internacional",
    "Mudanças residenciais",
    "Mudanças comerciais",
    "Recolhas em lojas",
    "Transportes de bens"
  ];

  return (
    <section id="services" className={styles.services}>
      <h2>Nossos Serviços</h2>
      <div className={styles.servicesGrid}>
        {servicesList.map((service, index) => (
          <div key={index} className={styles.serviceItem}>
            <p>{service}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
