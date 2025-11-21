import React, { useState } from 'react'
import './Login.css'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Placeholder: call onLogin prop if provided, otherwise simulate
    const perform = onLogin
      ? onLogin({ email, password })
      : new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email && password) resolve({ ok: true })
            else reject(new Error('Email and password required'))
          }, 500)
        })

    perform
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message || 'Login failed')
      })
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        {error && <div className="login-error">{error}</div>}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
