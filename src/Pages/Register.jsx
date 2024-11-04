import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from 'react';
import { auth } from "../Config/firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Register = () => {
    const fullName = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const registerUser = (e) => {
        e.preventDefault();

        // Basic form validation
        if (password.current.value !== confirmPassword.current.value) {
            setError("Passwords do not match");
            setSuccess('');
            return;
        }
        if (!email.current.value.includes('@')) {
            setError("Please enter a valid email address");
            setSuccess('');
            return;
        }
        if (password.current.value.length < 6) {
            setError("Password should be at least 6 characters long");
            setSuccess('');
            return;
        }

        // Firebase authentication
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User registered:", user);
                setError(""); // Clear any previous error
                setSuccess("Registration successful! You can now log in.");

                // Clear input fields
                fullName.current.value = "";
                email.current.value = "";
                password.current.value = "";
                confirmPassword.current.value = "";
            })
            .catch((error) => {
                console.log(error.code);
                setError("Failed to register. Please try again.");
                setSuccess('');
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
                <h1>Welcome OnBoard!</h1>
                <p>Let’s help you to meet your tasks</p>
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={registerUser}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Full Name"
                            style={{ borderRadius: '8px' }}
                            autoComplete="name"
                            ref={fullName}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            style={{ borderRadius: '8px' }}
                            ref={email}
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            style={{ borderRadius: '8px' }}
                            ref={password}
                            autoComplete="new-password"
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                cursor: 'pointer',
                                transform: 'translateY(-50%)'
                            }}
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            style={{ borderRadius: '8px' }}
                            ref={confirmPassword}
                            autoComplete="new-password"
                        />
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                cursor: 'pointer',
                                transform: 'translateY(-50%)'
                            }}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <button
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: '#0866ff', color: '#ffffff', fontSize:'1.1rem', borderRadius: '8px', width: '100%' }}
                    >
                        Register
                    </button>
                    <p className="mt-3">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
