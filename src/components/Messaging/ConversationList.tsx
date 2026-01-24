import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { Conversation } from '../../types';
import { listConversationsByUser } from '../../graphql/queries';
import { Loading, EmptyState } from '../Common';
import './Messaging.css';

const client = generateClient();

const ConversationList: React.FC = () => {
  const { profile } = useAuth();
  const { conversationId } = useParams<{ conversationId?: string }>();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      if (!profile) return;

      try {
        setIsLoading(true);

        const response: any = await client.graphql({
          query: listConversationsByUser,
          variables: { userId: profile.id },
          authMode: 'userPool'
        });

        let fetchedConversations = response.data?.listConversations?.items || [];

        // Sort by last message date
        fetchedConversations.sort((a: Conversation, b: Conversation) => {
          const dateA = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : new Date(a.createdAt).getTime();
          const dateB = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        setConversations(fetchedConversations);
      } catch (err: any) {
        setError(err.message || 'Failed to load conversations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [profile]);

  const getOtherUser = (conv: Conversation) => {
    if (conv.user1Id === profile?.id) {
      return conv.user2;
    }
    return conv.user1;
  };

  const getUnreadCount = (conv: Conversation) => {
    if (conv.user1Id === profile?.id) {
      return conv.user1UnreadCount || 0;
    }
    return conv.user2UnreadCount || 0;
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    const otherUser = getOtherUser(conv);
    const searchLower = searchQuery.toLowerCase();
    return (
      otherUser?.firstName?.toLowerCase().includes(searchLower) ||
      otherUser?.lastName?.toLowerCase().includes(searchLower) ||
      conv.lastMessagePreview?.toLowerCase().includes(searchLower) ||
      conv.job?.title?.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="conversation-list">
        <Loading message="Loading conversations..." />
      </div>
    );
  }

  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h2>Messages</h2>
        <Link to="/messages/new" className="btn btn-primary btn-sm">
          New Message
        </Link>
      </div>

      <div className="conversation-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {filteredConversations.length === 0 ? (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          }
          title={searchQuery ? "No matching conversations" : "No conversations yet"}
          description={searchQuery ? "Try a different search term." : "Start a conversation with a professional or employer."}
        />
      ) : (
        <div className="conversation-items">
          {filteredConversations.map(conv => {
            const otherUser = getOtherUser(conv);
            const unreadCount = getUnreadCount(conv);
            const isActive = conv.id === conversationId;

            return (
              <Link
                key={conv.id}
                to={`/messages/${conv.id}`}
                className={`conversation-item ${isActive ? 'active' : ''} ${unreadCount > 0 ? 'unread' : ''}`}
              >
                <div className="conversation-avatar">
                  {otherUser?.profilePicture ? (
                    <img src={otherUser.profilePicture} alt="" />
                  ) : (
                    <div className="avatar-placeholder">
                      {otherUser?.firstName?.[0]}{otherUser?.lastName?.[0]}
                    </div>
                  )}
                  {unreadCount > 0 && (
                    <span className="unread-badge">{unreadCount}</span>
                  )}
                </div>
                <div className="conversation-info">
                  <div className="conversation-header">
                    <span className="conversation-name">
                      {otherUser?.firstName} {otherUser?.lastName}
                    </span>
                    <span className="conversation-time">
                      {conv.lastMessageAt
                        ? formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: false })
                        : formatDistanceToNow(new Date(conv.createdAt), { addSuffix: false })}
                    </span>
                  </div>
                  {conv.job && (
                    <p className="conversation-job">Re: {conv.job.title}</p>
                  )}
                  <p className="conversation-preview">
                    {conv.lastMessagePreview || 'No messages yet'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConversationList;
