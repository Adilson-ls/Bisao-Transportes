import React from 'react';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Mudança ou frete rápido?</h1>
        <p>Serviços de transporte nacional e internacional com agilidade e segurança.</p>
        <button className={styles.primaryButton}>Solicite um Orçamento Gratuito</button>
      </div>
      <div className={styles.heroImages}>
        <img src="/van-hero.png" alt="Van de Transporte" className={styles.vanImage} />
        <img src="/delivery-man.png" alt="Entregador" className={styles.deliveryManImage} />
      </div>
    </section>
  );
}

export default Hero;
