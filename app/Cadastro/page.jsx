'use client'
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./cadastro.module.css";
import Header from "../components/header/Header";

export default function Register() {
  const [email_login, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email_login, senha);
      alert("Registrado com sucesso!");
      router.push("/Login");
    } catch (error) {
      alert("Erro ao registrar: " + error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1>Cadastro</h1>
        <div className={styles.input_container}>
          <label className={styles.label}>
            <h2 className={styles.title}>Email</h2>
        
            <input
            type="email"
            className={styles.input}
            value={email_login}
            onChange={(e) => setEmail(e.target.value)}
          />
          </label>
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>
            <h2 className={styles.title}>Senha</h2>
        
            <input
            type="password"
            className={styles.input}
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button className={styles.btn_cadastro} onClick={register}>
          Registrar
        </button>

        <p>
          Já tem uma conta?{" "}
          <Link href="/Login">
            <span className={styles.link}>Entre aqui</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

















// 'use client'
// import React from 'react'
// import Header from '../components/header/Header'
// import styles from './cadastro.module.css'
// import Input from 'antd/es/input/Input'
// import BtnScanner from '../components/btnScanner/BtnScanner'
// import { useState, useEffect } from 'react'
// import axios from 'axios'

// export default function Cadastro() {
//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [numero_nif, setNumero_nif] = useState('');
//   const [numero_qrcode, setNumero_qrCode] = useState('');
//   const [tipo_usuario, setTipo_usuario] = useState('');
//   const [usuarios, setUsuarios] = useState([]);
//   const [successMensage, setSuccessMensage] = useState('');
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     fetchCadastrar();
//   },[]);

//   const fetchCadastrar = async () => {
//     try{
//       const response = await axios.get('http://localhost:3003/usuarios');
//       setUsuarios(response.data);
//     }catch(error){
//       console.error(error);
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       nome,
//       email,
//       numero_nif,
//       numero_qrcode,
//       tipo_usuario
//     };
//     console.log(data);

//     try{
//       await axios.post('http://localhost:3003/usuarios', {
//         nome,
//         email,
//         numero_nif,
//         numero_qrcode,
//         tipo_usuario
//       });
//       setSuccessMensage('Cadastro realizado com sucesso!');
//       clearInputs()
//     }catch(error){
//       console.error(error);
//     }
//   };

//   const getInputFieldClass = (field) => {
//     if (field === 'nif' && numero_nif) {
//       return styles.required;
//     } else if (field === 'qrcode' && numero_qrcode) {
//       return styles.required;
//     }
//     return '';
//   };

//   const clearInputs = () => {
//     setNome('');
//     setEmail('');
//     setNumero_nif('');
//     setNumero_qrCode('');
//   }

//   return (
//     <div>
//         <Header />
//         <form onSubmit={handleSubmit}>
//           <div className={styles.container}>
//             <div className={styles.input_container}>
//               <label>
//                 <h2 className={styles.title}>Digite seu nome</h2>
//                 <Input
//                   className={styles.input}
//                   value={nome}
//                   onChange={(e) => setNome(e.target.value)}
//                   placeholder="Digite aqui..."
//                   required
//                 />
//               </label>
//             </div>

//             <div className={styles.input_container}>
//               <label>
//                 <h2 className={styles.title}>Digite seu email</h2>
//                 <Input
//                   className={styles.input}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Digite aqui..."
//                   required
//                 />
//               </label>
//             </div>

//             <BtnScanner />

//             <div className={styles.input_container}>
//               <label>
//                 <h2 className={styles.title}>Cadastrar numero do NIF</h2>
//                 <Input
//                   className={`${styles.input} ${getInputFieldClass('nif')}`}
//                   value={numero_nif}
//                   onChange={(e) => setNumero_nif(e.target.value)}
//                   placeholder="Digite aqui..."
//                 />
//               </label>
//             </div>

//             <div className={styles.input_container}>
//               <label>
//                 <h2 className={styles.title}>Cadastrar pelo numero do QR Code</h2>
//                 <Input
//                   className={`${styles.input} ${getInputFieldClass('qrcode')}`}
//                   value={numero_qrcode}
//                   onChange={(e) => setNumero_qrCode(e.target.value)}
//                   placeholder="Digite aqui..."
//                 />
//               </label>
//             </div>

//             <div className={styles.input_container}>
//               <label>
//                 <h2 className={styles.title}>Selecione o tipo de usuário</h2>
//                 <select
//                   className={styles.select}
//                   value={tipo_usuario}
//                   onChange={(e) => setTipo_usuario(e.target.value)}
//                   required
//                 >
//                     <option value="" disabled>Selecione um tipo</option>
//                     <option value="aluno">Aluno</option>
//                     <option value="instrutor">Instrutor</option>
//                     <option value="administracao">Administração</option>
//                     <option value="manutencao">Manutenção</option>
//                 </select>
//               </label>
//             </div>

//             <button type='submit' className={styles.btn_cadastro}>Cadastrar</button>
//           </div>
//         </form>
//         {successMensage && <p className={styles.success}>{successMensage}</p>}
//     </div>
//   )
// }