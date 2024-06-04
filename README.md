#  Login y registro con firebase y react
 

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

	- Project Overview -> proyect settings creamos la app, copiamos el código que nos proporciona  y lo pegamos en config.js

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
Creamos la carpeta context