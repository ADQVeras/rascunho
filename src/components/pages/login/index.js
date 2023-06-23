import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts';

const Login = () => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleSignIn(e) {
    e.preventDefault()

    await signIn(email, senha)
  }


  return (
    <div>
      <h1>TELA DE LOGIN</h1>

      <br />

      <form onSubmit={handleSignIn}>
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

        <Link to='/cadastro'>Se Cadastrar?</Link>

        <br /><br />

        <button type='submit'>
          {loadingAuth ? 'Carregando...' : 'Acessar'}
        </button>
        </form>
      
    </div>
  )
}
export default Login