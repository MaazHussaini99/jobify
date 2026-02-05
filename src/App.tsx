import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import amplifyConfig from './amplifyconfiguration';

// Nextonnect Layout
import PublicLayout from './components/Nextonnect/layout/PublicLayout';

// Auth Components
import { SignUp, SignIn, ConfirmSignUp, ForgotPassword, ResetPassword, NewPasswordRequired } from './components/Auth';

// Admin Components
import { AdminPanel } from './components/Admin';

// Profile Components
import { ProfileView, ProfileEdit } from './components/Profile';

// Job Components
import { JobList, JobDetails, JobCreate, JobApply } from './components/Jobs';

// Search Components
import { ProfessionalSearch } from './components/Search';

// Messaging Components
import { MessagesPage } from './components/Messaging';

// Meeting Components
import { ScheduleMeeting } from './components/Meetings';

// Resume Components
import { ResumeUpload, ResumeExport } from './components/Resume';

// Pages
import { Dashboard } from './pages';
import {
  HomePage as NextonnectHome,
  AboutPage,
  TalentPage,
  TechnologyPage,
  CompliancePage,
  TrainingPage,
  ContactPage
} from './pages/Nextonnect';

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

// Main App Layout using Nextonnect Navigation and Footer
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PublicLayout>
      {children}
    </PublicLayout>
  );
};

// Home Route - redirects to dashboard if authenticated, shows Nextonnect landing for public
const HomeRoute: React.FC = () => {
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

  // Show Nextonnect landing page for non-authenticated users
  return <NextonnectHome />;
};

// App Routes
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Home - redirects to dashboard if authenticated */}
      <Route path="/" element={<HomeRoute />} />

      {/* Nextonnect Public Pages */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/talent" element={<TalentPage />} />
      <Route path="/technology" element={<TechnologyPage />} />
      <Route path="/compliance" element={<CompliancePage />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Auth Routes */}
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <AppLayout>
              <SignIn />
            </AppLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <AppLayout>
              <SignUp />
            </AppLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/confirm-signup"
        element={
          <PublicRoute>
            <AppLayout>
              <ConfirmSignUp />
            </AppLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <AppLayout>
              <ForgotPassword />
            </AppLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <AppLayout>
              <ResetPassword />
            </AppLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/new-password"
        element={
          <AppLayout>
            <NewPasswordRequired />
          </AppLayout>
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
            <AppLayout>
              <MessagesPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Meetings */}
      <Route
        path="/meetings/schedule/:professionalId"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ScheduleMeeting />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AdminPanel />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Resume Routes */}
      <Route
        path="/resume/upload"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ResumeUpload />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/resume/export"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ResumeExport />
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
