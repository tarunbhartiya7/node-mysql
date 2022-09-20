// import ReactDOM from 'react-dom'
// import React from 'react'
// import App from './App.js'
// import './index.css'

// ReactDOM.render(<App />, document.getElementById('root'))

import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Products from './components/Products'
import productsService from './services/products'

const App = () => {
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await fetch('http://localhost:3000/api/users/')
  //     const final = await result.json()
  //     console.log(final)
  //   }
  //   fetchData()
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      productsService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      productsService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
    } catch (exception) {
      alert('Wrong Credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div className="container">
      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
          <Products />
        </>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
