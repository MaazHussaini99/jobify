import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { UserType } from '../../types';
import './Admin.css';

const client = generateClient();

// Admin email domain
const ADMIN_EMAIL_DOMAIN = '@nextonnect.com';

interface CreateUserForm {
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  temporaryPassword: string;
}

const AdminPanel: React.FC = () => {
  const { profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateUserForm>({
    email: '',
    firstName: '',
    lastName: '',
    userType: 'PROFESSIONAL',
    temporaryPassword: ''
  });

  // Check if current user is an admin
  const isAdmin = profile?.email?.toLowerCase().endsWith(ADMIN_EMAIL_DOMAIN);

  const generateTemporaryPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Ensure at least one of each required character type
    password = password.slice(0, 8) + 'A' + 'a' + '1' + '!';
    setFormData(prev => ({ ...prev, temporaryPassword: password }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.firstName || !formData.lastName || !formData.temporaryPassword) {
      setError('All fields are required');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      // Call the admin Lambda function to create the user
      const response: any = await client.graphql({
        query: `
          mutation AdminCreateUser($input: AdminCreateUserInput!) {
            adminCreateUser(input: $input) {
              success
              message
              userId
            }
          }
        `,
        variables: {
          input: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            userType: formData.userType,
            temporaryPassword: formData.temporaryPassword
          }
        },
        authMode: 'userPool'
      });

      if (response.data?.adminCreateUser?.success) {
        setSuccess(`User created successfully! An email has been sent to ${formData.email} with their temporary password.`);
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          userType: 'PROFESSIONAL',
          temporaryPassword: ''
        });
      } else {
        setError(response.data?.adminCreateUser?.message || 'Failed to create user');
      }
    } catch (err: any) {
      console.error('Error creating user:', err);
      setError(err.message || 'Failed to create user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="admin-panel">
        <div className="admin-error">
          <h2>Access Denied</h2>
          <p>You do not have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage users and platform settings</p>
      </div>

      <div className="admin-section">
        <h2>Create New User</h2>
        <p className="section-description">
          Create a new user account. They will receive an email with their temporary password
          and will be prompted to set a new password on first login.
        </p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">User Type *</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="PROFESSIONAL">Professional</option>
              <option value="EMPLOYER">Employer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="temporaryPassword">Temporary Password *</label>
            <div className="password-input-group">
              <input
                type="text"
                id="temporaryPassword"
                name="temporaryPassword"
                value={formData.temporaryPassword}
                onChange={handleChange}
                placeholder="Temporary password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={generateTemporaryPassword}
                disabled={isLoading}
              >
                Generate
              </button>
            </div>
            <span className="form-hint">
              Password must be at least 8 characters with uppercase, lowercase, number, and special character.
            </span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Creating User...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
