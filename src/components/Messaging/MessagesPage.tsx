import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import NewConversation from './NewConversation';
import './Messaging.css';

const MessagesPage: React.FC = () => {
  return (
    <div className="messages-page">
      <div className="messages-container">
        <ConversationList />
        <Routes>
          <Route path="new" element={<NewConversation />} />
          <Route path=":conversationId" element={<ChatWindow />} />
          <Route path="" element={<ChatWindow />} />
        </Routes>
      </div>
    </div>
  );
};

export default MessagesPage;
