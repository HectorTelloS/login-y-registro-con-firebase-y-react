import { Routes, Route } from 'react-router-dom'
import { Home, Login, ProtectedRouter, Register } from './pages'
import { AuthProvider } from './context/AuthProvider'


function App() {


  return (
    <section className='h-screen text-white bg-slate-800 py-10'>
      <h1 className="text-5xl font-bold  text-center" > Login y registro con Firebase y React</h1>

      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </AuthProvider>
    </section>
  )
}

export default App
