import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Cadastro from '../pages/cadastro'
import Perfil from '../pages/perfil'


const RoutesApp = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
    </Routes>
  )
}

export default RoutesApp