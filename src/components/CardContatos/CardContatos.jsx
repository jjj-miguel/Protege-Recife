import React from 'react';
import styles from './../CardContatos/CardContatos.module.css';

const CardContatos = ({ nomeOrgao, numeroContato }) => {
  return (
    <div className={styles.CardContatos}>
        <h3>{nomeOrgao}</h3>
        <p>{numeroContato}</p>
    </div>
  )
}

export default CardContatos