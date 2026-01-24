/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
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
        __typename
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
        __typename
      }
      education {
        id
        institution
        degree
        fieldOfStudy
        startDate
        endDate
        description
        __typename
      }
      certifications {
        id
        name
        issuingOrganization
        issueDate
        expirationDate
        credentialId
        credentialUrl
        __typename
      }
      availability {
        status
        hoursPerWeek
        startDate
        timezone
        preferredSchedule
        __typename
      }
      hourlyRate
      preferredJobTypes
      totalJobsCompleted
      averageRating
      totalReviews
      createdAt
      updatedAt
      jobPostings {
        nextToken
        __typename
      }
      applications {
        nextToken
        __typename
      }
      reviewsGiven {
        nextToken
        __typename
      }
      reviewsReceived {
        nextToken
        __typename
      }
      conversationsAsUser1 {
        nextToken
        __typename
      }
      conversationsAsUser2 {
        nextToken
        __typename
      }
      owner
      __typename
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        hourlyRate
        preferredJobTypes
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userProfilesByUserId = /* GraphQL */ `
  query UserProfilesByUserId(
    $userId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userProfilesByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        hourlyRate
        preferredJobTypes
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getJobPosting = /* GraphQL */ `
  query GetJobPosting($id: ID!) {
    getJobPosting(id: $id) {
      id
      employerId
      employer {
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
        hourlyRate
        preferredJobTypes
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
        updatedAt
        owner
        __typename
      }
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
      createdAt
      updatedAt
      applications {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      conversations {
        nextToken
        __typename
      }
      savedBy {
        nextToken
        __typename
      }
      owner
      __typename
    }
  }
`;
export const listJobPostings = /* GraphQL */ `
  query ListJobPostings(
    $filter: ModelJobPostingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobPostings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        viewCount
        applicationCount
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const jobPostingsByEmployerId = /* GraphQL */ `
  query JobPostingsByEmployerId(
    $employerId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelJobPostingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    jobPostingsByEmployerId(
      employerId: $employerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        viewCount
        applicationCount
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getJobApplication = /* GraphQL */ `
  query GetJobApplication($id: ID!) {
    getJobApplication(id: $id) {
      id
      jobId
      job {
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
        viewCount
        applicationCount
        createdAt
        updatedAt
        owner
        __typename
      }
      applicantId
      applicant {
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
        hourlyRate
        preferredJobTypes
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
        updatedAt
        owner
        __typename
      }
      coverLetter
      proposedRate
      estimatedDuration
      availability
      portfolioLinks
      status
      appliedAt
      updatedAt
      reviewedAt
      employerNotes
      createdAt
      owner
      __typename
    }
  }
`;
export const listJobApplications = /* GraphQL */ `
  query ListJobApplications(
    $filter: ModelJobApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        updatedAt
        reviewedAt
        employerNotes
        createdAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const jobApplicationsByJobId = /* GraphQL */ `
  query JobApplicationsByJobId(
    $jobId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelJobApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    jobApplicationsByJobId(
      jobId: $jobId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
        reviewedAt
        employerNotes
        createdAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const jobApplicationsByApplicantId = /* GraphQL */ `
  query JobApplicationsByApplicantId(
    $applicantId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelJobApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    jobApplicationsByApplicantId(
      applicantId: $applicantId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
        reviewedAt
        employerNotes
        createdAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      reviewerId
      reviewer {
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
        hourlyRate
        preferredJobTypes
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
        updatedAt
        owner
        __typename
      }
      revieweeId
      reviewee {
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
        hourlyRate
        preferredJobTypes
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
        updatedAt
        owner
        __typename
      }
      jobId
      job {
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
        viewCount
        applicationCount
        createdAt
        updatedAt
        owner
        __typename
      }
      rating
      title
      content
      communicationRating
      qualityRating
      timelinessRating
      professionalismRating
      reviewType
      isPublic
      isVerified
      response
      responseDate
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        isVerified
        response
        responseDate
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const reviewsByReviewerId = /* GraphQL */ `
  query ReviewsByReviewerId(
    $reviewerId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewsByReviewerId(
      reviewerId: $reviewerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        isVerified
        response
        responseDate
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const reviewsByRevieweeId = /* GraphQL */ `
  query ReviewsByRevieweeId(
    $revieweeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewsByRevieweeId(
      revieweeId: $revieweeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        isVerified
        response
        responseDate
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const reviewsByJobId = /* GraphQL */ `
  query ReviewsByJobId(
    $jobId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewsByJobId(
      jobId: $jobId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        isVerified
        response
        responseDate
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      user1Id
      user1 {
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
        hourlyRate
        preferredJobTypes
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
        updatedAt
        owner
        __typename
      }
      user2Id
      user2 {
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
        hourlyRate
        preferredJobTypes
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
        updatedAt
        owner
        __typename
      }
      jobId
      job {
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
        viewCount
        applicationCount
        createdAt
        updatedAt
        owner
        __typename
      }
      lastMessageAt
      lastMessagePreview
      user1UnreadCount
      user2UnreadCount
      status
      createdAt
      updatedAt
      messages {
        nextToken
        __typename
      }
      owner
      __typename
    }
  }
`;
export const listConversations = /* GraphQL */ `
  query ListConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user1Id
        user2Id
        jobId
        lastMessageAt
        lastMessagePreview
        user1UnreadCount
        user2UnreadCount
        status
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const conversationsByUser1Id = /* GraphQL */ `
  query ConversationsByUser1Id(
    $user1Id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    conversationsByUser1Id(
      user1Id: $user1Id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user1Id
        user2Id
        jobId
        lastMessageAt
        lastMessagePreview
        user1UnreadCount
        user2UnreadCount
        status
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const conversationsByUser2Id = /* GraphQL */ `
  query ConversationsByUser2Id(
    $user2Id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    conversationsByUser2Id(
      user2Id: $user2Id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user1Id
        user2Id
        jobId
        lastMessageAt
        lastMessagePreview
        user1UnreadCount
        user2UnreadCount
        status
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const conversationsByJobId = /* GraphQL */ `
  query ConversationsByJobId(
    $jobId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    conversationsByJobId(
      jobId: $jobId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user1Id
        user2Id
        jobId
        lastMessageAt
        lastMessagePreview
        user1UnreadCount
        user2UnreadCount
        status
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      conversationId
      conversation {
        id
        user1Id
        user2Id
        jobId
        lastMessageAt
        lastMessagePreview
        user1UnreadCount
        user2UnreadCount
        status
        createdAt
        updatedAt
        owner
        __typename
      }
      senderId
      content
      messageType
      attachments {
        id
        fileName
        fileType
        fileSize
        url
        __typename
      }
      isRead
      readAt
      isEdited
      isDeleted
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        conversationId
        senderId
        content
        messageType
        isRead
        readAt
        isEdited
        isDeleted
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const messagesByConversationIdAndCreatedAt = /* GraphQL */ `
  query MessagesByConversationIdAndCreatedAt(
    $conversationId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByConversationIdAndCreatedAt(
      conversationId: $conversationId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        conversationId
        senderId
        content
        messageType
        isRead
        readAt
        isEdited
        isDeleted
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const messagesBySenderId = /* GraphQL */ `
  query MessagesBySenderId(
    $senderId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesBySenderId(
      senderId: $senderId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        conversationId
        senderId
        content
        messageType
        isRead
        readAt
        isEdited
        isDeleted
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSavedJob = /* GraphQL */ `
  query GetSavedJob($id: ID!) {
    getSavedJob(id: $id) {
      id
      userId
      jobId
      job {
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
        viewCount
        applicationCount
        createdAt
        updatedAt
        owner
        __typename
      }
      savedAt
      notes
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listSavedJobs = /* GraphQL */ `
  query ListSavedJobs(
    $filter: ModelSavedJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        jobId
        savedAt
        notes
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const savedJobsByUserId = /* GraphQL */ `
  query SavedJobsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSavedJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    savedJobsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        jobId
        savedAt
        notes
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const savedJobsByJobId = /* GraphQL */ `
  query SavedJobsByJobId(
    $jobId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSavedJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    savedJobsByJobId(
      jobId: $jobId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        jobId
        savedAt
        notes
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      userId
      type
      title
      message
      relatedJobId
      relatedUserId
      relatedApplicationId
      relatedMessageId
      isRead
      readAt
      actionUrl
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        type
        title
        message
        relatedJobId
        relatedUserId
        relatedApplicationId
        relatedMessageId
        isRead
        readAt
        actionUrl
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const notificationsByUserIdAndCreatedAt = /* GraphQL */ `
  query NotificationsByUserIdAndCreatedAt(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByUserIdAndCreatedAt(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        type
        title
        message
        relatedJobId
        relatedUserId
        relatedApplicationId
        relatedMessageId
        isRead
        readAt
        actionUrl
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
