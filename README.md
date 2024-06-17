# Login y registro con firebase y react

1. Instalamos tailwindcss

   [yarn add tailwindcss](https://classic.yarnpkg.com/en/package/tailwindcss)

   [instalar con vite](https://tailwindcss.com/docs/guides/vite)

   a. nstalamos Tailwind CSS como dependencia de desarrollo:

   ```
       yarn add -D tailwindcss postcss autoprefixer
   ```

   b. Creamos el archivo de configuración

   ```
    npx tailwindcss init -p
   ```

   c. En el archivo tailwind.config.js copiamos

   ```
       module.exports = {
           content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
           theme: {
               extend: {},
           },
           plugins: [],
       };
   ```

   d. En index.css de nuestro proyecto

   ```
       /* src/index.css */
       @tailwind base;
       @tailwind components;
       @tailwind utilities;
   ```

## Conectamos a Firebase

2. instalamos firebase

   ```
   yarn add firebase
   ```

3. Conectamos con firebase

   [Documentación firebase](https://firebase.google.com/docs/web/setup?hl=es-419)

   a. Entramos a [https://firebase.google.com/](https://firebase.google.com/)
   b. go to console
   c. Creamos un nuevo proyecto

4. configuramos firebase

   - Creamos un archivo firebase -> config.js

   - Project Overview -> proyect settings creamos la app, copiamos el código que nos proporciona y lo pegamos en config.js

5. importamos getAuth de firebase/auth

   ```
   import { getAuth } from 'firebase/auth'

   ```

   utilizamos la función y le pasamos app

   ```
   export const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app)
   ```

## Creamos la aplicación

**1. Instalamos react-router.dom**
[https://yarnpkg.com/package?name=react-router-dom](https://yarnpkg.com/package?name=react-router-dom)

    a. en index.jsx
        ```js
            import React from 'react'
            import ReactDOM from 'react-dom/client'
            import { BrowserRouter } from 'react-router-dom'

            import App from './App.jsx'
            import './index.css'

            ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <BrowserRouter>
                <App />
                </BrowserRouter>
            </React.StrictMode>,
            )
        ```
    b.Creamos los componentes Home, Login y Register
    c. En App.jsx

        ```js
        import { useState } from 'react'
        import { Routes, Route } from 'react-router-dom'
        import { Home, Login, Register } from './pages'


        function App() {


        return (
            <section secttio className='h-screen text-white bg-slate-800 py-10'>
            <h1 h1 className="text-5xl font-bold  text-center" > Login y registro con Firebase y React</h1>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>

            </section>
        )
        }

        export default App
        ```

**2. Context**

1. Creamos la carpeta context
2. Creamos AuthContext.jsx
   ```js
   import { createContext } from "react";
   export const AuthContext = createContext();
   ```
3. creamos AuthProvider.jsx

   ```js
   import React from "react";
   import { AuthContext } from "./AuthContext";

   export const AuthProvider = ({ children }) => {
     const user = {
       login: true,
     };

     return (
       <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
     );
   };
   ```

4. Envolver las rutas en el Provider (en este caso en app.jsx)

   ```js
   import { Routes, Route } from "react-router-dom";
   import { Home, Login, Register } from "./pages";
   import { AuthProvider } from "./context/AuthProvider";

   function App() {
     return (
       <section className="h-screen text-white bg-slate-800 py-10">
         <h1 className="text-5xl font-bold  text-center">
           {" "}
           Login y registro con Firebase y React
         </h1>

         <AuthProvider>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
           </Routes>
         </AuthProvider>
       </section>
     );
   }

   export default App;
   ```

   5. LLamar al contexto en aquellos lugares donde se quera usar (en este caso en Homs.jsx)

   ```js
   import React, { useContext } from "react";
   import { AuthContext } from "../context/AuthContext";

   export const Home = () => {
     const authContext = useContext(AuthContext);
     console.log(authContext);
     return <div>Home</div>;
   };
   ```

   ## Authenticar Usuario y almacenarlo en el context

   ### REGISTRO DE USUARIOS

   1. Creamos el formulario de registro en Register.jsx

   ```js
   import React, { useState } from "react";

   export const Register = () => {
     const [user, setUser] = useState({
       email: "",
       password: "",
     });

     const handleChange = ({ target: { name, value } }) => {
       setUser({
         ...user,
         [name]: value,
       });
     };

     const handleSubmit = (ev) => {
       ev.preventDefault();
       console.log(user);
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           type="email"
           name="email"
           id="email"
           placeholder="your-email@email.es"
           onChange={handleChange}
         />
         <input
           type="password"
           name="password"
           id="password"
           placeholder="your-password"
           onChange={handleChange}
         />
         <button>Registrate</button>
       </form>
     );
   };
   ```

   2. Vamos a firebase -> compilación -> authentication -> comenzar activamos uso correoElectronico/contraseña
   3. Mandar el usuario a firebase
      [Autentica con Firebase mediante cuentas basadas en contraseñas con JavaScript ](https://firebase.google.com/docs/auth/web/password-auth?hl=es-419)

   En el provider, creamos una función signup que reciba el email y el password y ese será el value del provider

   ```js
   import React from "react";
   import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
   import { AuthContext } from "./AuthContext";

   export const AuthProvider = ({ children }) => {
     const singup = (email, password) => {
       console.log(email, password);
       return createUserWithEmailAndPassword(auth, email, password);
     };

     return (
       <AuthContext.Provider value={{ singup }}>
         {children}
       </AuthContext.Provider>
     );
   };
   ```

   4. Usamos el contexto en Register.jsx y creammos un estado para manejar los  errores que vienen de firebase

   ```js
   import React, { useContext, useState } from "react";
   import { AuthContext } from "../context/AuthContext";
   import { useNavigate } from "react-router-dom";
  

    export const Register = () => {
      const [user, setUser] = useState({
      email: "",
      password: "",
      });

    const { singup } = useContext(AuthContext)
      const navigate = useNavigate()

      const handleChange = ({ target: { name, value } }) => {
          setUser({
              ...user,
              [name]: value
          })

          // console.log({ singup })
      };

      const handleSubmit = async (ev) => {
          ev.preventDefault()
          // console.log(user)
          try {
              await singup(user.email, user.password)
              navigate('/')
          } catch (error) {
              console.log(error.message)
          }

      }

      return (
          <form onSubmit={handleSubmit} className="text-black" noValidate>
              <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your-email@email.es"
                  onChange={handleChange}
              />
              <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="your-password"
                  onChange={handleChange}
              />
              <button>Registrate</button>
          </form>
      );

    };

   ```


 ### LOGIN DE USUARIOS

 1. Copiamos todo lo de Register.jsx en Login.jsx
 2. En AuthContext creamos una función login que recibe el email y el password y retornará la función signInWithEmailAndPassword de firebase
 [https://firebase.google.com/docs/auth/web/password-auth?hl=es-419](https://firebase.google.com/docs/auth/web/password-auth?hl=es-419)
 3. utilizamos el metodo login del provider en Login.jsx

 ```js

 ......

 export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null)

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value
        })

        // console.log({ singup })
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setError(null)
        // console.log(user)
        try {
            await login(user.email, user.password)
            navigate('/')
        } catch (error) {
            console.log(error.message)
            setError(error.code)
        }

    }

    .....
 ```

  4. devolver un nuevo susario si este cambia
  añadimos al context un useEffect en el que utilizamos  onAuthStateChanged()

  ```js
    export const AuthProvider = ({ children }) => {

        const [user, setUser] = useState(null)

        const singup = (email, password) => {
            console.log('singup', { email, password })
            return createUserWithEmailAndPassword(auth, email, password)
        }

        const login = (email, password) => {
            return signInWithEmailAndPassword(auth, email, password)

        }

        useEffect(() => {

            onAuthStateChanged(auth, (currentUser) => {
                // console.log(currentUser)
                setUser(currentUser)
            })

        }, [])


        return (
            <AuthContext.Provider value={{ singup, login, user }}>
                {children}
            </AuthContext.Provider>
        )
    }
    ```

     ### LOGOUT DE USUARIOS

     en el provider

     ```js
         const logout = () => {
        return signOut(auth)
    }
    ```

    ## LOGIN CON GMAIL
    [google-signin](https://firebase.google.com/docs/auth/web/google-signin?hl=es-419)

  en firebase tenemos que agregar un proveedor en este caso google (Authentication -> metodo de acceso)

    1. En login creamos un boton debajo del formulario
      ```js
      <button onClick={handleGoogleSignin}>Login width google</button>
      ```

    2. en authContext creamos una función loginWithGoogle()
    [irebase.auth.GoogleAuthProvider](https://firebase.google.com/docs/reference/node/firebase.auth.GoogleAuthProvider)

    ```js
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    ```

    3. en login
    ```js
     const handleGoogleSignin = async () => {
        await loginWithGoogle()
        navigate('/')
    }
    ```