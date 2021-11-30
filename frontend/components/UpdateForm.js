import React, { useState } from 'react'
import axios from 'axios'
import { inputStyle, buttonStyle, formsStyle } from '../styles'

const UpdateForm = () => {
  const [updateMode, setUpdateMode] = useState(false)
  const [instagram, setInstagram] = useState('')
  const [snapchat, setSnapchat] = useState('')

  const updateSocials = async username => {
    try {
      const { data } = await axios.post('http://localhost:3000/account/update', { username, snapchat, instagram })
      if (data !== 'Account Updated!') {
        alert('Request unable to be accepted')
      }
    } catch (err) {
      alert(`Error: ${err}`)
    }
    setUpdateMode(false)
  }

  return (
    <>
      {!updateMode && (
        <button style={buttonStyle} type="submit" onClick={() => setUpdateMode(true)}>Update Profile</button>
      )}

      {updateMode && (
        <div style={formsStyle}>
          <h3 style={{ marginBottom: '1px' }}>Snapchat</h3>
          <input style={inputStyle} onChange={e => setSnapchat(e.target.value)} />
          <h3 style={{ marginBottom: '1px' }}>Instagram</h3>
          <input style={inputStyle} onChange={e => setInstagram(e.target.value)} />
          <br />
          <button style={buttonStyle} type="submit" onClick={() => updateSocials(sessionStorage.getItem('username'))}>Submit</button>
          <button style={buttonStyle} type="submit" onClick={() => setUpdateMode(false)}>Cancel</button>
        </div>
      )}
    </>
  )
}

export default UpdateForm
