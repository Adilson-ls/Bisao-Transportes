import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/bisao-logo.png" alt="Logotipo Bisão Transportes" />
      </div>
      <ul className={styles.navLinks}>
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Serviços</a></li>
        <li><a href="#about">Sobre Nós</a></li>
        <li><a href="#contact">Contato</a></li>
      </ul>
      <div className={styles.contactInfo}>
        <span>(+351) 930 460 509</span>
      </div>
    </nav>
  );
}

export default Navbar;
