import React, { useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { buttonStyle } from '../styles'
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
        <>
            <div>
                <h3>Hello {window.sessionStorage.getItem('username')}</h3>
                <button style={buttonStyle} type="submit" onClick={logoutUser}>Logout</button>
                <CreateRequest />
                <UpdateForm />
            </div> 
            <Requests />
            <History />
        </>
    )
}

export default Home