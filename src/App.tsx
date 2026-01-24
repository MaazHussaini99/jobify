import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import amplifyConfig from './amplifyconfiguration';

// Layout
import { Header, Footer } from './components/Layout';

// Auth Components
import { SignUp, SignIn, ConfirmSignUp, ForgotPassword, ResetPassword } from './components/Auth';

// Profile Components
import { ProfileView, ProfileEdit } from './components/Profile';

// Job Components
import { JobList, JobDetails, JobCreate, JobApply } from './components/Jobs';

// Search Components
import { ProfessionalSearch } from './components/Search';

// Messaging Components
import { MessagesPage } from './components/Messaging';

// Pages
import { HomePage, Dashboard } from './pages';

// Styles
import './App.css';

// Configure Amplify
Amplify.configure(amplifyConfig);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

// Public Route (redirects if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Main App Layout
const AppLayout: React.FC<{ children: React.ReactNode; showFooter?: boolean }> = ({
  children,
  showFooter = true
}) => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

// App Routes
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        }
      />

      {/* Auth Routes */}
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/confirm-signup"
        element={
          <PublicRoute>
            <ConfirmSignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile Routes */}
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProfileEdit />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <AppLayout>
            <ProfileView />
          </AppLayout>
        }
      />

      {/* Job Routes */}
      <Route
        path="/jobs"
        element={
          <AppLayout>
            <JobList />
          </AppLayout>
        }
      />
      <Route
        path="/jobs/create"
        element={
          <ProtectedRoute>
            <AppLayout>
              <JobCreate />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs/:id"
        element={
          <AppLayout>
            <JobDetails />
          </AppLayout>
        }
      />
      <Route
        path="/jobs/:id/apply"
        element={
          <ProtectedRoute>
            <AppLayout>
              <JobApply />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Professional Search */}
      <Route
        path="/professionals"
        element={
          <AppLayout>
            <ProfessionalSearch />
          </AppLayout>
        }
      />

      {/* Messaging */}
      <Route
        path="/messages/*"
        element={
          <ProtectedRoute>
            <AppLayout showFooter={false}>
              <MessagesPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
