import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation(
    async ({ password }) => {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        console.log('Login successful:', data);
        alert('You have succesfully reset your password');
        navigate('/login');
      },
      onError: (error) => {
        console.error('Login error:', error);
        setMessage(error.message)
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        return setMessage('Password not match');
    }
    mutation.mutate({ password });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="password">Confirm Password</label>
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        {message && <p>{message}</p>}
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default ResetPassword