import { useState, useEffect } from 'react';
import style from './Cadastro.module.css';
import ErrorMEssage from '../../components/ErrorMEssage';
import Modal from '../../components/Modal';
import useAuthentication from '../../hook/useAuthentication';

import logo from '../../assets/logo.svg';

const Cadastro = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { handleCadastro, erro, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(password !== confirmPassword) {
            setError("As senhas precisam ser iguais!");
            return;
        }

        try {
            await handleCadastro(email, password)
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if(erro) {
            setError(erro.message);
        }
    }, [erro]);
    
  return (
    <div className={style.background}>
        <div className={style.card}>
            <img className={style.logo} src={logo} />
            <h2>Crie sua Conta</h2>
            <form  className={style.form} onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input 
                    type='text'
                    name='displayNome'
                    required
                    placeholder='    Insira seu nome'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>    
            <label>
                <span>Email</span>
                <input 
                    type='email'
                    name='email'
                    required
                    placeholder='   Insira seu email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>Senha</span>
                <input 
                    type='password'
                    name='password'
                    required
                    placeholder='   Insira sua senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>
                <span>Confirme sua Senha</span>
                <input 
                    type='password'
                    name='confrimPassword'
                    required
                    placeholder='   Insira sua senha'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            {!loading && <button className={style.btn}>Cadastrar</button>}
            {loading && <button className={style.btn} disabled>Aguarde...</button>}
            </form>
            {error && <Modal message={error} onClose={() => setError("")} />}
        </div>
    </div>
  )
}

export default Cadastro;