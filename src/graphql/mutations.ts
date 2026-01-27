// GraphQL Mutations for the Professional Networking Platform

// User Profile Mutations
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile($input: CreateUserProfileInput!) {
    createUserProfile(input: $input) {
      id
      userId
      email
      firstName
      lastName
      headline
      bio
      profilePicture
      userType
      createdAt
      updatedAt
    }
  }
`;

export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      id
      userId
      email
      firstName
      lastName
      headline
      bio
      profilePicture
      coverPhoto
      location
      phone
      website
      linkedIn
      github
      userType
      companyName
      companySize
      industry
      skills {
        name
        level
        yearsOfExperience
        endorsed
      }
      experience {
        id
        title
        company
        location
        startDate
        endDate
        current
        description
      }
      education {
        id
        institution
        degree
        fieldOfStudy
        startDate
        endDate
        description
      }
      certifications {
        id
        name
        issuingOrganization
        issueDate
        expirationDate
        credentialId
        credentialUrl
      }
      availability {
        status
        hoursPerWeek
        startDate
        timezone
        preferredSchedule
      }
      hourlyRate
      preferredJobTypes
      updatedAt
    }
  }
`;

export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile($input: DeleteUserProfileInput!) {
    deleteUserProfile(input: $input) {
      id
    }
  }
`;

// Job Posting Mutations
export const createJobPosting = /* GraphQL */ `
  mutation CreateJobPosting($input: CreateJobPostingInput!) {
    createJobPosting(input: $input) {
      id
      employerId
      title
      description
      shortDescription
      requirements
      responsibilities
      requiredSkills
      preferredSkills
      jobType
      duration
      durationValue
      experienceLevel
      compensationType
      minBudget
      maxBudget
      currency
      locationType
      location
      timezone
      status
      applicationDeadline
      startDate
      createdAt
      updatedAt
    }
  }
`;

export const updateJobPosting = /* GraphQL */ `
  mutation UpdateJobPosting($input: UpdateJobPostingInput!) {
    updateJobPosting(input: $input) {
      id
      title
      description
      shortDescription
      requirements
      responsibilities
      requiredSkills
      preferredSkills
      jobType
      duration
      durationValue
      experienceLevel
      compensationType
      minBudget
      maxBudget
      currency
      locationType
      location
      timezone
      status
      applicationDeadline
      startDate
      viewCount
      applicationCount
      updatedAt
    }
  }
`;

export const deleteJobPosting = /* GraphQL */ `
  mutation DeleteJobPosting($input: DeleteJobPostingInput!) {
    deleteJobPosting(input: $input) {
      id
    }
  }
`;

// Job Application Mutations
export const createJobApplication = /* GraphQL */ `
  mutation CreateJobApplication($input: CreateJobApplicationInput!) {
    createJobApplication(input: $input) {
      id
      jobId
      applicantId
      coverLetter
      proposedRate
      estimatedDuration
      availability
      portfolioLinks
      status
      appliedAt
    }
  }
`;

export const updateJobApplication = /* GraphQL */ `
  mutation UpdateJobApplication($input: UpdateJobApplicationInput!) {
    updateJobApplication(input: $input) {
      id
      status
      employerNotes
      reviewedAt
      updatedAt
    }
  }
`;

export const deleteJobApplication = /* GraphQL */ `
  mutation DeleteJobApplication($input: DeleteJobApplicationInput!) {
    deleteJobApplication(input: $input) {
      id
    }
  }
`;

// Review Mutations
export const createReview = /* GraphQL */ `
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      reviewerId
      revieweeId
      jobId
      rating
      title
      content
      communicationRating
      qualityRating
      timelinessRating
      professionalismRating
      reviewType
      isPublic
      createdAt
    }
  }
`;

export const updateReview = /* GraphQL */ `
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      id
      rating
      title
      content
      communicationRating
      qualityRating
      timelinessRating
      professionalismRating
      response
      responseDate
      updatedAt
    }
  }
`;

export const deleteReview = /* GraphQL */ `
  mutation DeleteReview($input: DeleteReviewInput!) {
    deleteReview(input: $input) {
      id
    }
  }
`;

// Conversation Mutations
export const createConversation = /* GraphQL */ `
  mutation CreateConversation($input: CreateConversationInput!) {
    createConversation(input: $input) {
      id
      user1Id
      user2Id
      jobId
      status
      createdAt
    }
  }
`;

export const updateConversation = /* GraphQL */ `
  mutation UpdateConversation($input: UpdateConversationInput!) {
    updateConversation(input: $input) {
      id
      lastMessageAt
      lastMessagePreview
      user1UnreadCount
      user2UnreadCount
      status
      updatedAt
    }
  }
`;

export const deleteConversation = /* GraphQL */ `
  mutation DeleteConversation($input: DeleteConversationInput!) {
    deleteConversation(input: $input) {
      id
    }
  }
`;

// Message Mutations
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
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

export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
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

export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage($input: DeleteMessageInput!) {
    deleteMessage(input: $input) {
      id
    }
  }
`;

// Saved Job Mutations
export const createSavedJob = /* GraphQL */ `
  mutation CreateSavedJob($input: CreateSavedJobInput!) {
    createSavedJob(input: $input) {
      id
      userId
      jobId
      savedAt
      notes
    }
  }
`;

export const deleteSavedJob = /* GraphQL */ `
  mutation DeleteSavedJob($input: DeleteSavedJobInput!) {
    deleteSavedJob(input: $input) {
      id
    }
  }
`;

// Notification Mutations
export const createNotification = /* GraphQL */ `
  mutation CreateNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      id
      userId
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

export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification($input: UpdateNotificationInput!) {
    updateNotification(input: $input) {
      id
      isRead
      readAt
    }
  }
`;

export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification($input: DeleteNotificationInput!) {
    deleteNotification(input: $input) {
      id
    }
  }
`;

// Batch Operations
export const markAllNotificationsAsRead = /* GraphQL */ `
  mutation MarkAllNotificationsAsRead($userId: ID!) {
    markAllNotificationsAsRead(userId: $userId) {
      success
      count
    }
  }
`;

export const incrementJobViewCount = /* GraphQL */ `
  mutation IncrementJobViewCount($id: ID!) {
    updateJobPosting(input: { id: $id }) {
      id
      viewCount
    }
  }
`;

// Meeting Mutations
export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting($input: CreateMeetingInput!) {
    createMeeting(input: $input) {
      id
      organizerId
      professionalId
      adminEmail
      jobId
      title
      description
      scheduledDate
      duration
      timezone
      meetingLink
      status
      organizerNotes
      createdAt
    }
  }
`;

export const updateMeeting = /* GraphQL */ `
  mutation UpdateMeeting($input: UpdateMeetingInput!) {
    updateMeeting(input: $input) {
      id
      title
      description
      scheduledDate
      duration
      timezone
      meetingLink
      status
      organizerNotes
      professionalNotes
      adminNotes
      updatedAt
    }
  }
`;

export const deleteMeeting = /* GraphQL */ `
  mutation DeleteMeeting($input: DeleteMeetingInput!) {
    deleteMeeting(input: $input) {
      id
    }
  }
`;

// AI Resume Parsing using AWS Bedrock
export const parseResume = /* GraphQL */ `
  mutation ParseResume($content: String!, $fileType: String) {
    parseResume(content: $content, fileType: $fileType) {
      firstName
      lastName
      email
      phone
      location
      headline
      bio
      linkedIn
      github
      website
      skills {
        name
        level
        yearsOfExperience
      }
      experience {
        id
        title
        company
        location
        startDate
        endDate
        current
        description
      }
      education {
        id
        institution
        degree
        fieldOfStudy
        startDate
        endDate
        description
      }
      certifications {
        id
        name
        issuingOrganization
        issueDate
        expirationDate
        credentialId
        credentialUrl
      }
      parseError
    }
  }
`;
