// GraphQL Subscriptions for real-time updates

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($conversationId: ID!) {
    onCreateMessage(filter: { conversationId: { eq: $conversationId } }) {
      id
      conversationId
      senderId
      content
      messageType
      attachments {
        id
        fileName
        fileType
        fileSize
        url
      }
      isRead
      createdAt
    }
  }
`;

export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($conversationId: ID!) {
    onUpdateMessage(filter: { conversationId: { eq: $conversationId } }) {
      id
      content
      isRead
      readAt
      isEdited
      isDeleted
      updatedAt
    }
  }
`;

export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($userId: ID!) {
    onCreateNotification(filter: { userId: { eq: $userId } }) {
      id
      type
      title
      message
      relatedJobId
      relatedUserId
      relatedApplicationId
      relatedMessageId
      actionUrl
      createdAt
    }
  }
`;

export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation($user1Id: ID, $user2Id: ID) {
    onUpdateConversation(filter: {
      or: [
        { user1Id: { eq: $user1Id } },
        { user2Id: { eq: $user2Id } }
      ]
    }) {
      id
      lastMessageAt
      lastMessagePreview
      user1UnreadCount
      user2UnreadCount
    }
  }
`;

export const onCreateJobApplication = /* GraphQL */ `
  subscription OnCreateJobApplication($jobId: ID!) {
    onCreateJobApplication(filter: { jobId: { eq: $jobId } }) {
      id
      jobId
      applicantId
      applicant {
        firstName
        lastName
        profilePicture
      }
      status
      appliedAt
    }
  }
`;

export const onUpdateJobApplication = /* GraphQL */ `
  subscription OnUpdateJobApplication($applicantId: ID!) {
    onUpdateJobApplication(filter: { applicantId: { eq: $applicantId } }) {
      id
      jobId
      job {
        title
      }
      status
      updatedAt
    }
  }
`;
