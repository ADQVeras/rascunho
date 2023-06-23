import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './components/routes'
import AuthProvider from './components/contexts'


export default function App(){
  return(
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp/>
      </AuthProvider>
    </BrowserRouter>
  )
}