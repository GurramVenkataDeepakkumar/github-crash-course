import React, { useState } from 'react'
import './Register.css'

export default function Register({ onRegister }) {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const perform = onRegister
      ? onRegister({ name, email, password })
      : new Promise((resolve, reject) => {
        setTimeout(() => {
          if (name && email && password) resolve({ ok: true })
          else reject(new Error('All fields are required'))
        }, 500)
      })

    perform
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false)
        setError(err.message || 'Registration failed')
      })
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        {error && <div className="register-error">{error}</div>}
        <label>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </div>
  )
}
