"use client"
import Card from '../components/ferramentas-cards/ferramenta.jsx'
import styles from './ferreletro.module.css';
import React from 'react';
import Header from '../components/header/header.jsx';



const Ferramentas= () => {
    return (
      <div className={styles.container}>
       <Header></Header>
       
        <div className={styles.content}>
          <h1 className={styles.h1}>Ferramentas Eletro</h1>
          <p className={styles.p1}>Armário 01</p>
          <div className={styles.card}>
          <Card></Card>
          <Card></Card>
          </div>


          <div className={styles.cards}>
          <Card></Card>
          <Card></Card>
          </div>


          <div className={styles.cards}>
          <Card></Card>
          <Card></Card>
          </div>


          <div className={styles.cards}>
          <Card></Card>
          <Card></Card>
          </div>
          
          <div className={styles.buttonContainer}>
           
          </div>
        </div>
    
      </div>
    );
  };




  export default Ferramentas;
