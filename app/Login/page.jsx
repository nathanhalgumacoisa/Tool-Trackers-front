"use client";

import {  useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import styles from "./login.module.css";
import { useRouter }from "next/navigation";

export default function Login() {
  const [email_login, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const router = useRouter();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email_login, senha);
      alert("Login realizado com sucesso!");
      router.push("/Perfil");
    } catch (error) {
      alert("Erro ao logar: " + error.message);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.formDiv01}>
        <label className={styles.textlabel}>Email</label>
        <input
          type="email"
          className={styles.input}
          value={email_login}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.formDiv02}>
        <label className={styles.textlabel}>Senha</label>
        <input
          type="password"
          className={styles.input}
          value={senha}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={logIn}>
        Login
      </button>

      <p>
        Não tem uma conta?{" "}
        <Link href="/CadastroFerr">
          <span className={styles.link}>Registre-se aqui</span>
        </Link>
      </p>
    </div>
  );
}












// "use client"

// import React, { useEffect, useState } from 'react';
// import Header from '../components/header/Header.jsx';
// import App from '../components/inputs/inputs.jsx';
// import styles from './login.module.css';
// import axios from "axios";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/router";



// export default function login() {
//   const [items, setItems] = useState([]);
//   const router = useRouter();
//   const [userEmail, setUserEmail] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         router.push("/register");
//       } else {
//         setUserEmail(user.email);
          
//         axios
//           .get("http://localhost:3003/login")
//           .then((response) => {
//             setItems(response.data);
//           })
//           .catch((error) => {
//             console.error("Erro ao fazer login:", error);
//           });
//       }
//     });
//     return () => unsubscribe();
//   }, [router]);

//   return (
//     <div>
//       <h1 className={styles.containerF}>Lista de Ferramentas</h1>
//       <ul className={styles.list}>
//         {items.map((ferramenta, index) => (
//           <li key={index}>
//             {ferramenta.nome} 
//             {userEmail === "teste@gmail.com" && ` - ${ferramenta.modelo}`}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// const Login = () => {
//   const [name, setName] = useState('');
//   const [nif, setNif] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log('Name:', name);
//     console.log('NIF:', nif);
//   };


//   return (
//     <div className={styles.logincontainer}>
//       <Header></Header>

//       <h2 className={styles.logintitle}>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.inputgroup}>
//         <App title="E-mail:"></App>
//         </div>
//         <div className={styles.inputgroup}>
//         <App title="Senha:"></App>
//         </div>
//         <div className={styles.button}>
//         <button type="submit" className={styles.submitbutton}>Enviar</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;