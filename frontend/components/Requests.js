import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { buttonStyle, requestStyle, scrollStyle } from '../styles'

const Requests = () => {
  const [requests, setRequests] = useState([])

  const handleRemove = _id => {
    const newRequests = requests.filter(item => item._id !== _id)
    setRequests(newRequests)
  }
  const getRequests = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/requests')
      setRequests(data)
    } catch (err) {
      setRequests([])
    }
  }

  const acceptRequest = async _id => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/accept', { _id })
      if (data !== 'Accepted!') {
        alert('Request unable to be accepted')
      }
      handleRemove(_id)
    } catch (err) {
      alert(`Error: ${err}`)
    }
  }

  useEffect(() => {
    getRequests()
    const interval = setInterval(() => {
      getRequests()
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div style={requestStyle}>
      <h3 style={{ fontWeight: 'bold' }}>Requests</h3>
      <div style={scrollStyle}>
        {Boolean(requests) && requests.map(request => (
          <div key={request._id} style={{ maxWidth: '300px' }}>
            <div style={{ margin: '1px' }}>
              <b style={{ color: '#1e140a' }}>Location:</b>
              {' '}
              {request.location}
              <br />
              <b style={{ color: '#1e140a' }}>Time:</b>
              {' '}
              {new Date(request.time).toString()}
              <br />
              <b style={{ color: '#1e140a' }}>Comment:</b>
              {' '}
              {request.comment}
            </div>
            <button style={buttonStyle} type="submit" onClick={() => acceptRequest(request._id)}>Accept</button>
            {' '}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Requests
