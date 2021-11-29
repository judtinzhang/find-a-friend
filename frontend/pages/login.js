import React, { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { inputStyle, buttonStyle, background, innerDivStyle } from '../styles'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/account/login', { username, password })
      if (data === `User ${username} has been logged in!`) {
        sessionStorage.setItem('username', username)
        Router.push('home')
      } else {
        alert(`Unable to Login: ${data}`)
      }
    } catch (err) {
      alert(`Unable to Login: ${err}`)
    }
  }

  return (
    <div style={background}>
      <div>
          <Image src="https://i.pinimg.com/originals/eb/20/5f/eb205f33a26437d9f8324249f9b1d318.jpg" alt="Friendship" layout="fill" />
      </div>
      <div style={innerDivStyle(150, 590)}>
        <h1>Log In to Find A Friend!</h1>
        <h3>Username:</h3>
        <input style={inputStyle} onChange={e => setUsername(e.target.value)} />
        <br />
        <h3>Password:</h3>
        <input style={inputStyle} onChange={e => setPassword(e.target.value)} />
        <br />
        <button style={buttonStyle} type="submit" onClick={loginUser}>Submit</button>
        <br />
        <br />
        {'Don\'t have an account? '}
        <Link href="/signup">
            <a>Sign Up!</a>
        </Link>        
      </div>
    </div>
  )
}

export default Login