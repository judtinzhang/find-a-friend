import React, { useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Image from 'next/image'
import { buttonStyle, background, innerDivStyle } from '../styles'
import CreateRequest from '../components/CreateRequest'
import UpdateForm from '../components/UpdateForm'
import Requests from '../components/Requests'
import History from '../components/History'


const Home = () => {
    const logoutUser = async () => {
        try {
          const username = window.sessionStorage.getItem('username')
          await axios.post('http://localhost:3000/account/logout', { username })
          Router.push('/')
        } catch (err) {
          alert(`Error: ${err}`)
        }
    }

    const getLoginInfo = async () => {
        try {
          const { data } = await axios.post('http://localhost:3000/account/authenticated', { username: sessionStorage.getItem('username') })
          return data
        } catch (err) {
          alert(`Error: ${err}`)
        }
      }

    useEffect(async () => {
        getLoginInfo()
        const interval = setInterval(() => {
          getLoginInfo()
        }, 2000)
        return () => {
          clearInterval(interval)
        }
      }, [])

    return (
        <div style={background}>
            <div>
                <Image src="https://papers.co/wallpaper/papers.co-bb60-kakao-charactor-cute-brown-illustration-art-36-3840x2400-4k-wallpaper.jpg" alt="Friendship" layout="fill" />
            </div>
            <div style={innerDivStyle(10, 740)}>
                <h3 style={{ margin: "2px" }}>Hello {window.sessionStorage.getItem('username')}!</h3>
            </div>
            <div style={innerDivStyle(40, 720)}>
              <button style={buttonStyle} type="submit" onClick={logoutUser}>Logout</button>
              <br />
              <CreateRequest />
              <br />
              <UpdateForm />
            </div>
            <div style={innerDivStyle(10, 10)}>
              <Requests />
            </div>
            <div style={innerDivStyle(10, 1500)}>
              <History />
            </div>
        </div>
    )
}

export default Home