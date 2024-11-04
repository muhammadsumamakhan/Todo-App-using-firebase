import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/firebase/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                console.log('User logged in successfully:', userCredential.user);
                setSuccess('Logged in successfully!');
                navigate('/todo');
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error('Error logging in user:', errorMessage);
                setError(errorMessage);
            });
    };

    return (
        <div
            className="container d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: '100vh', backgroundColor: 'rgba(143, 225, 215, 0)' }}
        >
            <div
                className="card p-4"
                style={{
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0)'
                }}
            >
                <h1>Welcome Back!</h1>
                <p>Let’s help you to meet your tasks</p>
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={loginUser}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            ref={email}
                            style={{ borderRadius: '8px' }}
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            placeholder="Enter your password"
                            ref={password}
                            style={{ borderRadius: '8px' }}
                        />
                        <button
                            type="button"
                            className="btn position-absolute"
                            style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            backgroundColor: '#0866ff',
                            color: '#ffffff',
                            fontSize: '1.1rem',
                            borderRadius: '8px',
                            width: '100%'
                        }}
                    >
                        Login
                    </button>
                    <p className="mt-3">
                        Don’t have an account? <Link to="/register">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
