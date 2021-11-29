import React, { useState } from 'react'
import axios from 'axios'

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

    getHistory()

    return (
        <>
            <h3>history</h3>
            {history.map(entry => 
            (
                <div key={entry._id}>
                    <div>
                        {entry.requester}
                        <br />
                        {entry.acceptor}
                        <br />
                        {entry.comment}
                        <br />
                        {entry.time}
                        <br />
                        {entry.location}
                        <br />
                        {/* {entry.shareSocials && entry.requester !== window.sessionStorage.getItem('username') && getSocials(entry.requester) && (
                            <div>
                                <div>{instagram}</div>
                                <div>{snapchat}</div>
                            </div>
                        )}     */}
                    </div>
                    <br />
                </div>
            ))
            }
        </>
    )
}

export default History