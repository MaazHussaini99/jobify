import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile } from '../../types';
import { getUserProfile, listConversationsByUser } from '../../graphql/queries';
import { createConversation, createMessage, updateConversation } from '../../graphql/mutations';
import { Loading } from '../Common';
import './Messaging.css';

const client = generateClient();

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

  useEffect(() => {
    const fetchTargetUser = async () => {
      if (!targetUserId) {
        setIsLoading(false);
        return;
      }

      try {
        const response: any = await client.graphql({
          query: getUserProfile,
          variables: { id: targetUserId }
        });
        setTargetUser(response.data?.getUserProfile);
      } catch (err: any) {
        setError('Failed to load user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTargetUser();
  }, [targetUserId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !profile || !targetUser) return;

    try {
      setIsSending(true);
      setError(null);

      // Check for existing conversation
      const existingConvResponse: any = await client.graphql({
        query: listConversationsByUser,
        variables: { userId: profile.id }
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
          }
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
        }
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
        }
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

  if (!targetUserId || !targetUser) {
    return (
      <div className="new-conversation">
        <div className="new-conversation-content">
          <h2>New Message</h2>
          <p>Select a user to start a conversation with.</p>
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
