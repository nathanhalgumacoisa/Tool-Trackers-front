'use client'
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./cadastro.module.css";
import Header from "../components/header/Header";
import axios from 'axios';




function Register() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");
    const [tipo_usuario, setTipoUsuario] = useState("");
    const router = useRouter();


    
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const response = await axios.post('http://localhost:3003/usuarios', {
  //             nome,
  //             email,
  //         });
  //         setMessage(response.data.message);
  //         setEmail('');
  //         setNome('');
  //     } catch (error) {
  //         console.error(error);
  //         setMessage('Erro ao criar usuário.');
  //     }
  // };












    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const response = await axios.post('http://localhost:3003/usuarios', {
          nome,
          email,
      });
        alert("Registrado com sucesso!");
        router.push("/Login");

        setEmail('');
         setNome('');
        // router.push("/Login");
      } catch (error) {
        alert("Erro ao registrar: " + error.message);
        console.log("Erro ao registrar: " + error.message);
      }
    };
  
    return (
      <div className={styles.tudinho}>
      <div>
        <Header />
        <div>
          <img src="./fundo-login.png" alt="" className={styles.img_login} />
        </div>
        <div className={styles.container}>
          <h1 className={styles.text1}>Cadastro</h1>
          <div className={styles.conainer_input}>

          {/* <form onSubmit={handleSubmit}> */}

          <div className={styles.input_container}>
            <div className={styles.input_container}>
              <label className={styles.label}>
                <h2 className={styles.title}>Nome:</h2>
                <input
                  type="text"
                  className={styles.input}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </label>
              </div>
            </div> 
            <div className={styles.input_container}>
              <label className={styles.label}>
                <h2 className={styles.title}>E-mail:</h2>
                <input
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.input_container}>
              <label className={styles.label}>
                <h2 className={styles.title}>Senha:</h2>
                <input
                  type="password"
                  className={styles.input}
                  value={senha}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>


          {/* </form> */}


          </div>
          <button className={styles.btn_cadastro} onClick={register}>
            <h1 className={styles.title1}>Registrar</h1>
          </button>
          <p className={styles.login}>
            Já tem uma conta?{" "}
            <Link href="/Login">
              <span className={styles.link}>Entre aqui</span>
            </Link>
          </p>
        </div>
      </div>
      </div>
    );
  }




  export default Register;










