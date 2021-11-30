import React, { useState } from 'react'
import axios from 'axios'
import { inputStyle, buttonStyle, formsStyle } from '../styles'

const CreateRequest = () => {
  const [createMode, setCreateMode] = useState(false)
  const [location, setLocation] = useState('')
  const [comment, setComment] = useState('')
  const [time, setTime] = useState(Date.now())
  const [shareSocials, setShareSocials] = useState(false)
  // NOTE: test date is May 28 2021 12:30
  const createRequest = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/create', {
        location,
        comment,
        time,
        shareSocials,
      })
      if (data !== 'Request created!') {
        alert('Request unable to be created')
      }
    } catch (err) {
      alert(`Error: ${err}`)
    }
    setCreateMode(false)
  }

  return (
    <>
      {!createMode && (
        <button style={buttonStyle} type="submit" onClick={() => setCreateMode(true)}>Create Request</button>
      )}

      {createMode && (
        <div style={formsStyle}>
          <h3 style={{ marginBottom: '1px' }}>Location</h3>
          <input style={inputStyle} placeholder="Van Pelt 1st Floor" onChange={e => setLocation(e.target.value)} />
          <h3 style={{ marginBottom: '1px' }}>Comment</h3>
          <input style={inputStyle} placeholder="Wearing a red hoodie!" onChange={e => setComment(e.target.value)} />
          <h3 style={{ marginBottom: '1px' }}>Date</h3>
          <input style={inputStyle} placeholder="May 28 2021 12:30" onChange={e => setTime(new Date(e.target.value))} />
          <h3 style={{ marginBottom: '1px' }}>Share Socials?</h3>
          <input type="checkbox" onChange={e => setShareSocials(e.target.checked)} />
          <br />
          <button style={buttonStyle} type="submit" onClick={() => createRequest()}>Submit</button>
          <button style={buttonStyle} type="submit" onClick={() => setCreateMode(false)}>Cancel</button>
        </div>
      )}
    </>
  )
}

export default CreateRequest
