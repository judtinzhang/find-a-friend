import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { historyStyle, scrollStyle } from '../styles'

const History = () => {
    const [history, setHistory] = useState([])
    const [instagram, setInstagram] = useState('')
    const [snapchat, setSnapchat] = useState('')
    const getHistory = async () => { 
        try {
            const { data } = await axios.get('http://localhost:3000/api/history')
            setHistory(data)
        } catch (err) {
            setHistory([])
        }
    }
    
    const getSocials = async (username) => {
        try {
            const { data } = await axios.post('http://localhost:3000/account/info', { username })
            setInstagram(data.instagram)
            setSnapchat(data.snapchat)
        } catch (err) {
            setInstagram('')
            setSnapchat('')
        }
    }

    useEffect(() => {
        getHistory()
        const interval = setInterval(() => {
            getHistory()
          }, 2000)
          return () => {
            clearInterval(interval)
          }
    }, [])

    return (

        <div style={historyStyle}>
            <h3>History</h3>    
            <div style={scrollStyle}>
            {history.map(entry => 
            (
                <div key={entry._id} style={{maxWidth: "300px"}}>
                    <div>
                        Requester: {entry.requester}
                        <br />
                        Acceptor: {entry.acceptor}
                        <br />
                        Comment: {entry.comment}
                        <br />
                        Time: {new Date(entry.time).toString()}
                        <br />
                        Location: {entry.location}
                        <br />
                        {entry.shareSocials && entry.requester !== window.sessionStorage.getItem('username') && getSocials(entry.requester) && (
                            <div>
                                <div>{entry.requester}'s Instagram: {instagram}</div>
                                <div>{entry.requester}'s Snapchat: {snapchat}</div>
                            </div>
                        )}    
                    </div>
                    <br />
                </div>
            ))
            }
            </div>
        </div>
    )
}

export default History