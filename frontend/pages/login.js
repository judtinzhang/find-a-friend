import React, { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

const color = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  backgroundColor: "#9DADFD",
}

const innerDivStyle = {
  position: "absolute",
  color: "white",
  fontSize: "20px",
  top: 150,
  left: 590,
  textAlign: "center"
}

const inputStyle = {
  marginTop: "2px",
  marginBottom: "3px"
}

const buttonStyle = {
  color: "#4B63D8",
  margin: "3px",
  fontSize: "16px"
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/account/login', { username, password })
      console.log('went here')
      if (data === `User ${username} has been logged in!`) {
        console.log('went here')
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
    <div style={color}>
      <div>
          <Image src="https://i.pinimg.com/originals/eb/20/5f/eb205f33a26437d9f8324249f9b1d318.jpg" alt="Friendship" layout="fill" />
      </div>
      <div style={innerDivStyle}>
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