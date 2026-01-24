import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { format, isToday, isYesterday } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { Conversation, Message } from '../../types';
import { getConversation, listMessagesByConversation } from '../../graphql/queries';
import { createMessage, updateConversation, updateMessage } from '../../graphql/mutations';
import { onCreateMessage } from '../../graphql/subscriptions';
import { Loading } from '../Common';
import './Messaging.css';

const client = generateClient();

const ChatWindow: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { profile } = useAuth();

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversation = useCallback(async () => {
    if (!conversationId) return;

    try {
      setIsLoading(true);

      const convResponse: any = await client.graphql({
        query: getConversation,
        variables: { id: conversationId }
      });

      const conv = convResponse.data?.getConversation;
      setConversation(conv);

      const messagesResponse: any = await client.graphql({
        query: listMessagesByConversation,
        variables: { conversationId, limit: 100 }
      });

      const fetchedMessages = messagesResponse.data?.listMessages?.items || [];
      // Sort messages by creation time (oldest first)
      fetchedMessages.sort((a: Message, b: Message) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessages(fetchedMessages);

      // Mark messages as read
      if (profile) {
        const unreadMessages = fetchedMessages.filter(
          (m: Message) => m.senderId !== profile.id && !m.isRead
        );
        for (const msg of unreadMessages) {
          await client.graphql({
            query: updateMessage,
            variables: {
              input: {
                id: msg.id,
                isRead: true,
                readAt: new Date().toISOString()
              }
            }
          });
        }

        // Update unread count
        if (conv && unreadMessages.length > 0) {
          const isUser1 = conv.user1Id === profile.id;
          await client.graphql({
            query: updateConversation,
            variables: {
              input: {
                id: conversationId,
                [isUser1 ? 'user1UnreadCount' : 'user2UnreadCount']: 0
              }
            }
          });
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load conversation');
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, profile]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Subscribe to new messages
  useEffect(() => {
    if (!conversationId) return;

    let subscription: { unsubscribe: () => void } | null = null;

    const setupSubscription = () => {
      subscription = (client.graphql({
        query: onCreateMessage,
        variables: { conversationId }
      }) as any).subscribe({
        next: ({ data }: any) => {
          const newMsg = data?.onCreateMessage;
          if (newMsg) {
            setMessages(prev => [...prev, newMsg]);

            // Mark as read if from other user
            if (profile && newMsg.senderId !== profile.id) {
              client.graphql({
                query: updateMessage,
                variables: {
                  input: {
                    id: newMsg.id,
                    isRead: true,
                    readAt: new Date().toISOString()
                  }
                }
              });
            }
          }
        },
        error: (err: any) => console.error('Subscription error:', err)
      });
    };

    setupSubscription();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [conversationId, profile]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !profile || !conversationId || !conversation) return;

    try {
      setIsSending(true);

      const messageContent = newMessage.trim();
      setNewMessage('');

      // Create message
      await client.graphql({
        query: createMessage,
        variables: {
          input: {
            conversationId,
            senderId: profile.id,
            content: messageContent,
            messageType: 'TEXT',
            isRead: false
          }
        }
      });

      // Update conversation
      const isUser1 = conversation.user1Id === profile.id;
      await client.graphql({
        query: updateConversation,
        variables: {
          input: {
            id: conversationId,
            lastMessageAt: new Date().toISOString(),
            lastMessagePreview: messageContent.substring(0, 100),
            [isUser1 ? 'user2UnreadCount' : 'user1UnreadCount']:
              (isUser1 ? conversation.user2UnreadCount || 0 : conversation.user1UnreadCount || 0) + 1
          }
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
      setNewMessage(newMessage); // Restore message on error
    } finally {
      setIsSending(false);
    }
  };

  const formatMessageDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    }
    if (isYesterday(date)) {
      return 'Yesterday ' + format(date, 'h:mm a');
    }
    return format(date, 'MMM d, h:mm a');
  };

  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';

    messages.forEach(msg => {
      const msgDate = format(new Date(msg.createdAt), 'yyyy-MM-dd');
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ date: msgDate, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });

    return groups;
  };

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMMM d, yyyy');
  };

  const getOtherUser = () => {
    if (!conversation || !profile) return null;
    return conversation.user1Id === profile.id ? conversation.user2 : conversation.user1;
  };

  if (!conversationId) {
    return (
      <div className="chat-window-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <h3>Select a conversation</h3>
        <p>Choose a conversation from the list or start a new one</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="chat-window">
        <Loading message="Loading messages..." />
      </div>
    );
  }

  if (error || !conversation) {
    return (
      <div className="chat-window">
        <div className="chat-error">
          <p>{error || 'Conversation not found'}</p>
          <Link to="/messages" className="btn btn-secondary">
            Back to Messages
          </Link>
        </div>
      </div>
    );
  }

  const otherUser = getOtherUser();
  const messageGroups = groupMessagesByDate();

  return (
    <div className="chat-window">
      {/* Chat Header */}
      <div className="chat-header">
        <Link to={`/profile/${otherUser?.id}`} className="chat-user-info">
          {otherUser?.profilePicture ? (
            <img src={otherUser.profilePicture} alt="" className="chat-avatar" />
          ) : (
            <div className="avatar-placeholder">
              {otherUser?.firstName?.[0]}{otherUser?.lastName?.[0]}
            </div>
          )}
          <div>
            <h3>{otherUser?.firstName} {otherUser?.lastName}</h3>
            {conversation.job && (
              <p className="chat-job-context">
                Re: <Link to={`/jobs/${conversation.job.id}`}>{conversation.job.title}</Link>
              </p>
            )}
          </div>
        </Link>
        <div className="chat-actions">
          <Link to={`/profile/${otherUser?.id}`} className="btn btn-secondary btn-sm">
            View Profile
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messageGroups.map(group => (
          <div key={group.date} className="message-group">
            <div className="date-divider">
              <span>{formatDateHeader(group.date)}</span>
            </div>
            {group.messages.map(msg => {
              const isMine = msg.senderId === profile?.id;
              const isDeleted = msg.isDeleted;

              return (
                <div
                  key={msg.id}
                  className={`message ${isMine ? 'mine' : 'theirs'} ${isDeleted ? 'deleted' : ''}`}
                >
                  <div className="message-content">
                    {isDeleted ? (
                      <em>This message was deleted</em>
                    ) : (
                      <>
                        <p>{msg.content}</p>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="message-attachments">
                            {msg.attachments.map(att => (
                              <a key={att.id} href={att.url} target="_blank" rel="noopener noreferrer" className="attachment">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                </svg>
                                {att.fileName}
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="message-meta">
                    <span className="message-time">{formatMessageDate(msg.createdAt)}</span>
                    {isMine && !isDeleted && (
                      <span className={`message-status ${msg.isRead ? 'read' : ''}`}>
                        {msg.isRead ? 'Read' : 'Sent'}
                      </span>
                    )}
                    {msg.isEdited && !isDeleted && (
                      <span className="edited-label">Edited</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="chat-input-form">
        <div className="chat-input-wrapper">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSending}
          />
          <button type="submit" disabled={!newMessage.trim() || isSending} className="send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
