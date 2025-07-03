import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Bisão Transportes. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;
