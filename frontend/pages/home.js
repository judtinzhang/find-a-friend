import React, { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

const inputStyle = {
    marginTop: "2px",
    marginBottom: "3px"
  }

const buttonStyle = {
    color: "#4B63D8",
    margin: "3px",
    fontSize: "16px"
  }

const Home = () => {

    const [createMode, setCreateMode] = useState(false)

    const [location, setLocation] = useState('')
    const [comment, setComment] = useState('')
    const [time, setTime] = useState(Date.now())
    const [shareSocials, setShareSocials] = useState(false)

    const logoutUser = async () => {
        try {
          const username = sessionStorage.getItem('username')
          await axios.post('http://localhost:3000/account/logout', { username })
          Router.push('/')
        } catch (err) {
          alert(`Error: ${err}`)
        }
    }

    const createRequest = async () => {
        try {
            await axios.post('http://localhost:3000/api/create', {location, comment, time, shareSocials})
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div>
                <button style={buttonStyle} type="submit" onClick={logoutUser}>Logout</button>
                {!createMode && (
                    <button style={buttonStyle} type="submit" onClick={() => setCreateMode(true)}>Create Request</button>
                )}

                {createMode && (
                    <div>
                        <h3 style={{ marginBottom: "1px"}}>Location</h3>
                        <input style={inputStyle} placeholder="Van Pelt 1st Floor" onChange={e => setLocation(e.target.value)} />
                        <h3 style={{ marginBottom: "1px"}}>Comment</h3>
                        <input style={inputStyle} placeholder="Wearing a red hoodie!" onChange={e => setComment(e.target.value)} />
                        <h3 style={{ marginBottom: "1px"}}>Date</h3>
                        <input style={inputStyle} placeholder="May 28 2021 12:30" onChange={e => setTime(new Date(e.target.value))} />
                        <h3 style={{ marginBottom: "1px"}}>Share Socials?</h3>
                        <input type="checkbox" onChange={e => setShareSocials(e.target.checked)}/>
                        <br />
                        <button style={buttonStyle} type="submit" onClick={() => createRequest()}>Submit</button>
                        <button style={buttonStyle} type="submit" onClick={() => setCreateMode(false)}>Cancel</button>
                    </div>
                    
                )}
            </div> 
        </>
    )
}

export default Home