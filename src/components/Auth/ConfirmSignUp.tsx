import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const ConfirmSignUp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmSignUpUser, error, isLoading, clearError } = useAuth();

  const email = (location.state as any)?.email || '';
  const [code, setCode] = useState('');
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (formError) setFormError('');
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setFormError('Verification code is required');
      return;
    }

    try {
      await confirmSignUpUser(email, code);
      navigate('/signin', { state: { message: 'Account verified successfully. Please sign in.' } });
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  if (!email) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Verification Required</h1>
            <p>Please complete the sign up process first.</p>
          </div>
          <Link to="/signup" className="auth-button">
            Go to Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Verify Your Email</h1>
          <p>We sent a verification code to <strong>{email}</strong></p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="code">Verification Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={handleChange}
              placeholder="Enter 6-digit code"
              maxLength={6}
              disabled={isLoading}
            />
            {formError && <span className="form-error">{formError}</span>}
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Didn't receive the code? <button className="link-button">Resend Code</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSignUp;
