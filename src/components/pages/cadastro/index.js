import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts';

const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext)

    async function handleSignUp(e){
        e.preventDefault();

        await signUp(email, senha, nome)
    }

    return (
        <div>
            <h1>TELA DE CADASTRO</h1>

            <br />

            <label>
                NOME
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
            </label>

            <br /><br />

            <label>
                E-MAIL
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <br /><br />

            <label>
                SENHA
                <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </label>

            <br /><br />

            <button onClick={handleSignUp}>
                {loadingAuth ? 'Carregando...' : 'Cadastrar'}
            </button>

            <br /><br />

            {email} <br />
            {senha}
        </div>
    )
}

export default Cadastro