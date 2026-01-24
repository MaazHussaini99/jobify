// GraphQL Queries for the Professional Networking Platform

// User Profile Queries
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
      totalJobsCompleted
      averageRating
      totalReviews
      createdAt
      updatedAt
    }
  }
`;

export const getUserProfileByUserId = /* GraphQL */ `
  query GetUserProfileByUserId($userId: String!) {
    listUserProfiles(filter: { userId: { eq: $userId } }) {
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
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
        updatedAt
      }
    }
  }
`;

export const listProfessionals = /* GraphQL */ `
  query ListProfessionals($filter: ModelUserProfileFilterInput, $limit: Int, $nextToken: String) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        email
        firstName
        lastName
        headline
        profilePicture
        location
        userType
        skills {
          name
          level
          yearsOfExperience
        }
        availability {
          status
          hoursPerWeek
        }
        hourlyRate
        totalJobsCompleted
        averageRating
        totalReviews
        createdAt
      }
      nextToken
    }
  }
`;

// Job Posting Queries
export const getJobPosting = /* GraphQL */ `
  query GetJobPosting($id: ID!) {
    getJobPosting(id: $id) {
      id
      employerId
      employer {
        id
        firstName
        lastName
        companyName
        profilePicture
        location
        averageRating
        totalReviews
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
    }
  }
`;

export const listJobPostings = /* GraphQL */ `
  query ListJobPostings($filter: ModelJobPostingFilterInput, $limit: Int, $nextToken: String) {
    listJobPostings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        employerId
        employer {
          id
          firstName
          lastName
          companyName
          profilePicture
          averageRating
        }
        title
        shortDescription
        requiredSkills
        jobType
        duration
        experienceLevel
        compensationType
        minBudget
        maxBudget
        currency
        locationType
        location
        status
        applicationDeadline
        applicationCount
        createdAt
      }
      nextToken
    }
  }
`;

export const getJobsByEmployer = /* GraphQL */ `
  query GetJobsByEmployer($employerId: ID!, $limit: Int, $nextToken: String) {
    listJobPostings(filter: { employerId: { eq: $employerId } }, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        shortDescription
        requiredSkills
        jobType
        duration
        status
        applicationCount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// Job Application Queries
export const getJobApplication = /* GraphQL */ `
  query GetJobApplication($id: ID!) {
    getJobApplication(id: $id) {
      id
      jobId
      job {
        id
        title
        employer {
          companyName
        }
      }
      applicantId
      applicant {
        id
        firstName
        lastName
        headline
        profilePicture
        skills {
          name
          level
        }
        averageRating
        totalReviews
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
    }
  }
`;

export const listApplicationsByJob = /* GraphQL */ `
  query ListApplicationsByJob($jobId: ID!, $limit: Int, $nextToken: String) {
    listJobApplications(filter: { jobId: { eq: $jobId } }, limit: $limit, nextToken: $nextToken) {
      items {
        id
        applicantId
        applicant {
          id
          firstName
          lastName
          headline
          profilePicture
          skills {
            name
            level
          }
          averageRating
          totalReviews
          totalJobsCompleted
        }
        coverLetter
        proposedRate
        status
        appliedAt
      }
      nextToken
    }
  }
`;

export const listApplicationsByApplicant = /* GraphQL */ `
  query ListApplicationsByApplicant($applicantId: ID!, $limit: Int, $nextToken: String) {
    listJobApplications(filter: { applicantId: { eq: $applicantId } }, limit: $limit, nextToken: $nextToken) {
      items {
        id
        jobId
        job {
          id
          title
          employer {
            companyName
            profilePicture
          }
          status
        }
        status
        appliedAt
        updatedAt
      }
      nextToken
    }
  }
`;

// Review Queries
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      reviewerId
      reviewer {
        id
        firstName
        lastName
        profilePicture
        companyName
      }
      revieweeId
      reviewee {
        id
        firstName
        lastName
        profilePicture
      }
      jobId
      job {
        id
        title
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
    }
  }
`;

export const listReviewsByUser = /* GraphQL */ `
  query ListReviewsByUser($revieweeId: ID!, $limit: Int, $nextToken: String) {
    listReviews(filter: { revieweeId: { eq: $revieweeId }, isPublic: { eq: true } }, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reviewerId
        reviewer {
          id
          firstName
          lastName
          profilePicture
          companyName
        }
        jobId
        job {
          id
          title
        }
        rating
        title
        content
        communicationRating
        qualityRating
        timelinessRating
        professionalismRating
        reviewType
        isVerified
        response
        responseDate
        createdAt
      }
      nextToken
    }
  }
`;

// Conversation Queries
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      user1Id
      user1 {
        id
        firstName
        lastName
        profilePicture
      }
      user2Id
      user2 {
        id
        firstName
        lastName
        profilePicture
      }
      jobId
      job {
        id
        title
      }
      lastMessageAt
      lastMessagePreview
      user1UnreadCount
      user2UnreadCount
      status
      createdAt
      messages(sortDirection: DESC, limit: 50) {
        items {
          id
          senderId
          content
          messageType
          attachments {
            id
            fileName
            fileType
            url
          }
          isRead
          createdAt
        }
      }
    }
  }
`;

export const listConversationsByUser = /* GraphQL */ `
  query ListConversationsByUser($userId: ID!) {
    listConversations(
      filter: {
        or: [
          { user1Id: { eq: $userId } },
          { user2Id: { eq: $userId } }
        ]
      }
    ) {
      items {
        id
        user1Id
        user1 {
          id
          firstName
          lastName
          profilePicture
        }
        user2Id
        user2 {
          id
          firstName
          lastName
          profilePicture
        }
        jobId
        job {
          id
          title
        }
        lastMessageAt
        lastMessagePreview
        user1UnreadCount
        user2UnreadCount
        status
      }
    }
  }
`;

// Message Queries
export const listMessagesByConversation = /* GraphQL */ `
  query ListMessagesByConversation($conversationId: ID!, $limit: Int, $nextToken: String) {
    listMessages(
      filter: { conversationId: { eq: $conversationId } }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        readAt
        isEdited
        isDeleted
        createdAt
      }
      nextToken
    }
  }
`;

// Saved Jobs Queries
export const listSavedJobs = /* GraphQL */ `
  query ListSavedJobs($userId: ID!, $limit: Int, $nextToken: String) {
    listSavedJobs(filter: { userId: { eq: $userId } }, limit: $limit, nextToken: $nextToken) {
      items {
        id
        jobId
        job {
          id
          title
          employer {
            companyName
            profilePicture
          }
          requiredSkills
          jobType
          locationType
          status
          createdAt
        }
        savedAt
        notes
      }
      nextToken
    }
  }
`;

// Notification Queries
export const listNotifications = /* GraphQL */ `
  query ListNotifications($userId: ID!, $limit: Int, $nextToken: String) {
    listNotifications(
      filter: { userId: { eq: $userId } }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        title
        message
        relatedJobId
        relatedUserId
        relatedApplicationId
        relatedMessageId
        isRead
        actionUrl
        createdAt
      }
      nextToken
    }
  }
`;

// Search Queries
export const searchJobs = /* GraphQL */ `
  query SearchJobs($filter: SearchableJobPostingFilterInput, $sort: [SearchableJobPostingSortInput], $limit: Int, $nextToken: String) {
    searchJobPostings(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
      items {
        id
        employerId
        employer {
          companyName
          profilePicture
          averageRating
        }
        title
        shortDescription
        requiredSkills
        jobType
        duration
        experienceLevel
        compensationType
        minBudget
        maxBudget
        locationType
        location
        status
        createdAt
      }
      nextToken
      total
    }
  }
`;

export const searchProfessionals = /* GraphQL */ `
  query SearchProfessionals($filter: SearchableUserProfileFilterInput, $sort: [SearchableUserProfileSortInput], $limit: Int, $nextToken: String) {
    searchUserProfiles(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        headline
        profilePicture
        location
        skills {
          name
          level
        }
        availability {
          status
        }
        hourlyRate
        averageRating
        totalReviews
        totalJobsCompleted
      }
      nextToken
      total
    }
  }
`;
