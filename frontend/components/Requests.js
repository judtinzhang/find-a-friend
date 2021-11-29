import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { buttonStyle } from '../styles'

const Requests = () => {
    const [requests, setRequests] = useState([])

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

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <div style={{textAlign: "left"}}>
            <h3>Requests</h3>
            {requests.map(request => (
                <div key={request._id} style={{maxWidth: "300px"}}>
                    <p style={{margin: "1px"}}>
                        Location: {request.location}
                        <br />
                        Comment: {request.comment}
                        <br />
                        Time: {new Date(request.time).toString()}
                    </p>
                    <button style={buttonStyle} type="submit" onClick={() => acceptRequest(request._id)}>Accept</button> 
                    <p></p>
                </div>
            ))
            }
        </div>
    )
}

export default Requests