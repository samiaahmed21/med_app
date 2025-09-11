import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sign_Up.css';
import { API_URL } from '../../config/config';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    console.log("API_URL:", API_URL);

    const register = async (e) => {
        e.preventDefault();
        console.log("Register button clicked");

        setNameError('');
        setEmailError('');
        setPhoneError('');
        setPasswordError('');
        setServerError('');

        let hasError = false;
        if (!name) {
            setNameError('Name is required');
            hasError = true;
        }
        if (!email) {
            setEmailError('Email is required');
            hasError = true;
        }
        if (!phone) {
            setPhoneError('Phone number is required');
            hasError = true;
        } else if (!/^\d{10}$/.test(phone)) {
            setPhoneError('Phone number must be 10 digits');
            hasError = true;
        }
        if (!password) {
            setPasswordError('Password is required');
            hasError = true;
        }

        if (hasError) return;

        const payload = { name, email, phone, password };
        console.log("Sending registration request with:", payload);

        try {
            const response = await fetch(`${API_URL.replace(/\/$/, '')}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const text = await response.text();
            console.log("Raw response text:", text);

            let json;
            try {
                json = JSON.parse(text);
            } catch {
                throw new Error('Invalid response from server');
            }

            console.log("Parsed JSON response:", json);

            if (response.ok && json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('phone', phone);

                navigate('/');
                window.location.reload();
            } else {
                // Show all server errors
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
                console.log("Registration failed, server response:", json);
                setServerError(errorMessage);
            }
        } catch (err) {
            console.error(err);
            setServerError(err.message || 'Something went wrong');
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1">
                    Already a member? <Link to="/login" style={{ color: '#2190FF' }}>Login</Link>
                </div>

                <div className="signup-form">
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                            />
                            {nameError && <div className="error-text">{nameError}</div>}
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                type="tel"
                                className="form-control"
                                placeholder="Enter your phone number"
                            />
                            {phoneError && <div className="error-text">{phoneError}</div>}
                        </div>

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
                            <button type="submit" className="btn btn-primary mb-2 mr-1">Submit</button>
                            <button type="reset" className="btn btn-danger mb-2" onClick={() => {
                                setName(''); setEmail(''); setPhone(''); setPassword('');
                                setNameError(''); setEmailError(''); setPhoneError(''); setPasswordError(''); setServerError('');
                            }}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;
