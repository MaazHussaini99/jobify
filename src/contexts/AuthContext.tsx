import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  signUp,
  signIn,
  signOut,
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
  confirmSignIn,
  getCurrentUser,
  fetchAuthSession
} from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { UserProfile, UserType } from '../types';
import { getUserProfileByUserId } from '../graphql/queries';
import { createUserProfile } from '../graphql/mutations';

const client = generateClient();

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  newPasswordRequired: boolean;
  pendingUser: { email: string } | null;
  signUpUser: (email: string, password: string, firstName: string, lastName: string, userType: UserType) => Promise<void>;
  confirmSignUpUser: (email: string, code: string) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<{ challengeName?: string }>;
  completeNewPassword: (newPassword: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  resetPasswordUser: (email: string) => Promise<void>;
  confirmResetPasswordUser: (email: string, code: string, newPassword: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPasswordRequired, setNewPasswordRequired] = useState(false);
  const [pendingUser, setPendingUser] = useState<{ email: string } | null>(null);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const response: any = await client.graphql({
        query: getUserProfileByUserId,
        variables: { userId },
        authMode: 'userPool'
      });
      const profiles = response.data?.listUserProfiles?.items || [];
      if (profiles.length > 0) {
        setProfile(profiles[0]);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  }, []);

  const checkAuthState = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      const session = await fetchAuthSession();

      if (currentUser && session.tokens) {
        setUser(currentUser);
        setIsAuthenticated(true);
        await fetchUserProfile(currentUser.userId);
      }
    } catch (err) {
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserProfile]);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  const signUpUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: UserType
  ) => {
    try {
      setError(null);
      setIsLoading(true);

      const { userId } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            given_name: firstName,
            family_name: lastName
          }
        }
      });

      // Store pending profile data for after confirmation
      sessionStorage.setItem('pendingProfile', JSON.stringify({
        userId,
        email,
        firstName,
        lastName,
        userType
      }));
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSignUpUser = async (email: string, code: string) => {
    try {
      setError(null);
      setIsLoading(true);

      await confirmSignUp({
        username: email,
        confirmationCode: code
      });

      // Profile will be created after sign-in when user is authenticated
    } catch (err: any) {
      setError(err.message || 'Confirmation failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signInUser = async (email: string, password: string): Promise<{ challengeName?: string }> => {
    try {
      setError(null);
      setIsLoading(true);

      const result = await signIn({
        username: email,
        password
      });

      // Check if new password is required (admin-created user with temp password)
      if (result.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        setNewPasswordRequired(true);
        setPendingUser({ email });
        return { challengeName: 'NEW_PASSWORD_REQUIRED' };
      }

      if (result.isSignedIn) {
        // Check if there's a pending profile to create (new user after confirmation)
        const pendingProfile = sessionStorage.getItem('pendingProfile');
        if (pendingProfile) {
          const profileData = JSON.parse(pendingProfile);
          try {
            await client.graphql({
              query: createUserProfile,
              variables: {
                input: {
                  userId: profileData.userId,
                  email: profileData.email,
                  firstName: profileData.firstName,
                  lastName: profileData.lastName,
                  userType: profileData.userType
                }
              },
              authMode: 'userPool'
            });
            sessionStorage.removeItem('pendingProfile');
          } catch (profileErr) {
            console.error('Error creating profile:', profileErr);
            // Profile might already exist, continue anyway
          }
        }

        setNewPasswordRequired(false);
        setPendingUser(null);
        await checkAuthState();
      }

      return {};
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const completeNewPassword = async (newPassword: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const result = await confirmSignIn({
        challengeResponse: newPassword
      });

      if (result.isSignedIn) {
        setNewPasswordRequired(false);
        setPendingUser(null);
        await checkAuthState();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to set new password');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      setError(null);
      setIsLoading(true);

      await signOut();
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
    } catch (err: any) {
      setError(err.message || 'Sign out failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPasswordUser = async (email: string) => {
    try {
      setError(null);
      setIsLoading(true);

      await resetPassword({ username: email });
    } catch (err: any) {
      setError(err.message || 'Password reset failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmResetPasswordUser = async (email: string, code: string, newPassword: string) => {
    try {
      setError(null);
      setIsLoading(true);

      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword
      });
    } catch (err: any) {
      setError(err.message || 'Password reset confirmation failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user?.userId) {
      await fetchUserProfile(user.userId);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    profile,
    isAuthenticated,
    isLoading,
    error,
    newPasswordRequired,
    pendingUser,
    signUpUser,
    confirmSignUpUser,
    signInUser,
    completeNewPassword,
    signOutUser,
    resetPasswordUser,
    confirmResetPasswordUser,
    refreshProfile,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
