import React, { useState } from 'react'
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

    getRequests()

    return (
        <>
            {requests.map(request => (
                <div key={request._id}>
                    <p>
                        {request.requester}
                        <br />
                        {request.comment}
                        <br />
                        {request.time}
                    </p>
                    <button style={buttonStyle} type="submit" onClick={() => acceptRequest(request._id)}>Accept</button> 
                </div>
            ))
            } 
        </>
    )
}

export default Requests