import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile } from '../../types';
import { getUserProfile, listConversationsByUser, listProfessionals } from '../../graphql/queries';
import { createConversation, createMessage, updateConversation } from '../../graphql/mutations';
import { Loading } from '../Common';
import './Messaging.css';

const client = generateClient();

// Admin email domain for Nextonnect support
const ADMIN_EMAIL_DOMAIN = '@nextonnect.com';

const isAdminUser = (email: string): boolean => {
  return email.toLowerCase().endsWith(ADMIN_EMAIL_DOMAIN);
};

const NewConversation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { profile } = useAuth();

  const targetUserId = searchParams.get('userId');
  const jobId = searchParams.get('jobId');

  const [targetUser, setTargetUser] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // User search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);

  // Fetch all users on mount (for user selection)
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (targetUserId) {
        // If we have a target user, fetch that specific user
        try {
          const response: any = await client.graphql({
            query: getUserProfile,
            variables: { id: targetUserId },
            authMode: 'userPool'
          });
          setTargetUser(response.data?.getUserProfile);
        } catch (err: any) {
          setError('Failed to load user');
        } finally {
          setIsLoading(false);
        }
      } else {
        // Fetch all users for selection - only show admin accounts
        try {
          const response: any = await client.graphql({
            query: listProfessionals,
            variables: { limit: 100 },
            authMode: 'userPool'
          });
          const users = response.data?.listUserProfiles?.items || [];
          // Filter to only show admin users (@nextonnect.com) and exclude current user
          const adminUsers = users.filter((u: UserProfile) =>
            u.id !== profile?.id && isAdminUser(u.email)
          );
          setAllUsers(adminUsers);
          setSearchResults(adminUsers);
        } catch (err: any) {
          console.error('Failed to load users:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllUsers();
  }, [targetUserId, profile?.id]);

  // Filter users based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(allUsers);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    const filtered = allUsers.filter((user) =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.companyName && user.companyName.toLowerCase().includes(query))
    );
    setSearchResults(filtered);
    setIsSearching(false);
  }, [searchQuery, allUsers]);

  const selectUser = (user: UserProfile) => {
    setTargetUser(user);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !profile || !targetUser) return;

    // Verify target user is an admin (unless current user is admin)
    if (!isAdminUser(profile.email) && !isAdminUser(targetUser.email)) {
      setError('You can only send messages to Nextonnect support team.');
      return;
    }

    try {
      setIsSending(true);
      setError(null);

      // Check for existing conversation
      const existingConvResponse: any = await client.graphql({
        query: listConversationsByUser,
        variables: { userId: profile.id },
        authMode: 'userPool'
      });

      const existingConversations = existingConvResponse.data?.listConversations?.items || [];
      let existingConv = existingConversations.find((c: any) =>
        (c.user1Id === targetUser.id || c.user2Id === targetUser.id) &&
        (!jobId || c.jobId === jobId)
      );

      let conversationId: string;

      if (existingConv) {
        conversationId = existingConv.id;
      } else {
        // Create new conversation
        const convResponse: any = await client.graphql({
          query: createConversation,
          variables: {
            input: {
              user1Id: profile.id,
              user2Id: targetUser.id,
              jobId: jobId || null,
              status: 'ACTIVE'
            }
          },
          authMode: 'userPool'
        });
        conversationId = convResponse.data?.createConversation?.id;
      }

      // Create message
      await client.graphql({
        query: createMessage,
        variables: {
          input: {
            conversationId,
            senderId: profile.id,
            content: message.trim(),
            messageType: 'TEXT',
            isRead: false
          }
        },
        authMode: 'userPool'
      });

      // Update conversation
      await client.graphql({
        query: updateConversation,
        variables: {
          input: {
            id: conversationId,
            lastMessageAt: new Date().toISOString(),
            lastMessagePreview: message.trim().substring(0, 100),
            user2UnreadCount: 1
          }
        },
        authMode: 'userPool'
      });

      navigate(`/messages/${conversationId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="new-conversation">
        <Loading message="Loading..." />
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="new-conversation">
        <div className="new-conversation-header">
          <h2>New Message</h2>
        </div>
        <div className="new-conversation-content">
          <div className="user-search">
            <div className="form-group">
              <label htmlFor="search">Search Users</label>
              <input
                type="text"
                id="search"
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {isSearching ? (
              <Loading message="Searching..." />
            ) : searchResults.length > 0 ? (
              <div className="user-list">
                <p className="support-notice">Contact our support team for assistance:</p>
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="user-list-item"
                    onClick={() => selectUser(user)}
                  >
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt="" className="user-avatar" />
                    ) : (
                      <div className="avatar-placeholder small">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                    )}
                    <div className="user-info">
                      <p className="user-name">{user.firstName} {user.lastName}</p>
                      {user.headline && <p className="user-headline">{user.headline}</p>}
                      <p className="user-company">Nextonnect Support</p>
                    </div>
                    <span className="user-type-badge admin">Support</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No support team members available at the moment.</p>
                <p>Please try again later or email admin@nextonnect.com directly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="new-conversation">
      <div className="new-conversation-header">
        <h2>New Message</h2>
      </div>

      <div className="new-conversation-content">
        {!targetUserId && (
          <button
            type="button"
            className="back-to-search"
            onClick={() => setTargetUser(null)}
          >
            ← Back to user search
          </button>
        )}
        <div className="recipient-info">
          <label>To:</label>
          <div className="recipient">
            {targetUser.profilePicture ? (
              <img src={targetUser.profilePicture} alt="" />
            ) : (
              <div className="avatar-placeholder small">
                {targetUser.firstName[0]}{targetUser.lastName[0]}
              </div>
            )}
            <span>{targetUser.firstName} {targetUser.lastName}</span>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSend} className="new-message-form">
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Write your message..."
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/messages')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!message.trim() || isSending}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewConversation;
