import React, { useState, useEffect } from 'react'
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
    const [requests, setRequests] = useState([])
    const [history, setHistory] = useState([])
    const [instagram, setInstagram] = useState('')
    const [snapchat, setSnapchat] = useState('')
    const [updateMode, setUpdateMode] = useState(false)
    const [newInstagram, setNewInstagram] = useState('')
    const [newSnapchat, setNewSnapchat] = useState('')

    const logoutUser = async () => {
        try {
          const username = sessionStorage.getItem('username')
          await axios.post('http://localhost:3000/account/logout', { username })
          Router.push('/')
        } catch (err) {
          console.log('went here??')
          //alert(`Error: ${err}`)
        }
    }

    const createRequest = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/create', {location, comment, time, shareSocials})
            if (data !== 'Request created!') {
                alert('Request unable to be created')
            }
        } catch (err) {
            alert(`Error: ${err}`)
        }
        setCreateMode(false)
    }

    const getRequests = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/requests')
            setRequests(data)
        } catch (err) {
            setRequests([])
        }
    }

    const acceptRequest = async (_id) => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/accept', { _id })
            if (data !== 'Accepted!') {
                alert('Request unable to be accepted')
            }
        } catch (err) {
            alert(`Error: ${err}`)
        }
    }

    const getHistory = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/history')
            setHistory(data)
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

    const getSocials = async (username) => {
        try {
            const { data } = await axios.post('http://localhost:3000/account/info', { username })
            setInstagram(data.instagram)
            setSnapchat(data.snapchat)
        } catch (err) {
            alert(`Error: ${err}`)
        }
    }

    const setSocials = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/account/update', { username: sessionStorage.getItem('username'), snapchat: newSnapchat, instagram: newInstagram })
            if (data !== 'Account Updated!') {
                alert('Request unable to be accepted')
            }
          } catch (err) {
            alert(`Error: ${err}`)
          }
        setUpdateMode(false)
    }

    useEffect(async () => {
        //getLoginInfo()
        getRequests()
        getHistory()
    
    //     const interval = setInterval(() => {
    //       getLoginInfo()
    //       getRequests()
    //       getHistory()
    //     }, 2000)
    //     return () => {
    //       clearInterval(interval)
    //     }
      }, [])

    return (
        <>
            <div>
                <button style={buttonStyle} type="submit" onClick={logoutUser}>Logout</button>
                {!createMode && (
                    <button style={buttonStyle} type="submit" onClick={() => setCreateMode(true)}>Create Request</button>
                )}

                {!updateMode && (
                    <button style={buttonStyle} type="submit" onClick={() => setUpdateMode(true)}>Update Profile</button>
                )}

                {updateMode && (
                    <div>
                        <h3 style={{ marginBottom: "1px"}}>Snapchat</h3>
                        <input style={inputStyle} onChange={e => setNewSnapchat(e.target.value)} />
                        <h3 style={{ marginBottom: "1px"}}>Instagram</h3>
                        <input style={inputStyle} onChange={e => setNewInstagram(e.target.value)} />
                        <br />
                        <button style={buttonStyle} type="submit" onClick={() => setSocials()}>Submit</button>
                        <button style={buttonStyle} type="submit" onClick={() => setUpdateMode(false)}>Cancel</button>
                    </div>
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
            {requests.map(request => (
                <div key={request._id}>
                    <p>
                        {request.requester}
                    </p>
                    <p>
                        {request.time}
                    </p>
                    <button style={buttonStyle} type="submit" onClick={() => acceptRequest(request._id)}>Accept</button>
                    
                </div>
            ))
            } 

            <h3>history</h3>
            {history.map(entry => 
            (
                <div key={entry._id}>
                    <p>
                        {entry.requester}
                        <br />
                        {entry.acceptor}
                        <br />
                        {entry.comment}
                        <br />
                        {entry.time}
                        <br />
                        {entry.shareSocials && entry.requester !== sessionStorage.getItem('username') && getSocials(entry.requester) && (
                            <div>
                                
                                <div>{instagram}</div>
                                <div>{snapchat}</div>
                            </div>
                        )}    
                    </p>
                                    
                </div>
            ))
            } 

        </>
    )
}

export default Home