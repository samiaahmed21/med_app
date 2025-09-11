import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { API_URL } from '../../config/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  console.log("API_URL:", API_URL);

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) navigate("/");
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setServerError('');

    let hasError = false;
    if (!email) { setEmailError('Email is required'); hasError = true; }
    if (!password) { setPasswordError('Password is required'); hasError = true; }
    if (hasError) return;

    const payload = { email, password };
    console.log("Sending login request with:", payload);

    try {
      const response = await fetch(`${API_URL.replace(/\/$/, '')}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      console.log("Raw response text:", text);

      let json;
      try { json = JSON.parse(text); } catch { throw new Error('Invalid server response'); }

      console.log("Parsed JSON response:", json);

      if (response.ok && json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);

        navigate('/');
        window.location.reload();
      } else {
        // Display any type of server error
        let errorMessage = '';
        if (Array.isArray(json.errors)) {
          errorMessage = json.errors.map(err => `${err.param || ''}: ${err.msg}`).join(', ');
        } else if (Array.isArray(json.error)) {
          errorMessage = json.error.map(err => `${err.param || ''}: ${err.msg || err.value || err}`).join(', ');
        } else if (typeof json.error === 'string') {
          errorMessage = json.error;
        } else {
          errorMessage = JSON.stringify(json);
        }

        console.log("Login failed, server response:", json);
        setServerError(errorMessage);
      }
    } catch (err) {
      console.error(err);
      setServerError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text"><h2>Login</h2></div>
        <div className="login-text">
          Are you a new member? <Link to="/signup" style={{ color: '#2190FF' }}>Sign Up Here</Link>
        </div>

        <div className="login-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
              {emailError && <div className="error-text">{emailError}</div>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Enter your password"
              />
              {passwordError && <div className="error-text">{passwordError}</div>}
            </div>

            {serverError && <div className="error-text server-error">{serverError}</div>}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
