/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onCreateUserProfile(filter: $filter, owner: $owner) {
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onUpdateUserProfile(filter: $filter, owner: $owner) {
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onDeleteUserProfile(filter: $filter, owner: $owner) {
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
export const onCreateJobPosting = /* GraphQL */ `
  subscription OnCreateJobPosting(
    $filter: ModelSubscriptionJobPostingFilterInput
    $owner: String
  ) {
    onCreateJobPosting(filter: $filter, owner: $owner) {
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
export const onUpdateJobPosting = /* GraphQL */ `
  subscription OnUpdateJobPosting(
    $filter: ModelSubscriptionJobPostingFilterInput
    $owner: String
  ) {
    onUpdateJobPosting(filter: $filter, owner: $owner) {
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
export const onDeleteJobPosting = /* GraphQL */ `
  subscription OnDeleteJobPosting(
    $filter: ModelSubscriptionJobPostingFilterInput
    $owner: String
  ) {
    onDeleteJobPosting(filter: $filter, owner: $owner) {
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
export const onCreateJobApplication = /* GraphQL */ `
  subscription OnCreateJobApplication(
    $filter: ModelSubscriptionJobApplicationFilterInput
    $owner: String
  ) {
    onCreateJobApplication(filter: $filter, owner: $owner) {
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
export const onUpdateJobApplication = /* GraphQL */ `
  subscription OnUpdateJobApplication(
    $filter: ModelSubscriptionJobApplicationFilterInput
    $owner: String
  ) {
    onUpdateJobApplication(filter: $filter, owner: $owner) {
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
export const onDeleteJobApplication = /* GraphQL */ `
  subscription OnDeleteJobApplication(
    $filter: ModelSubscriptionJobApplicationFilterInput
    $owner: String
  ) {
    onDeleteJobApplication(filter: $filter, owner: $owner) {
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
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview(
    $filter: ModelSubscriptionReviewFilterInput
    $owner: String
  ) {
    onCreateReview(filter: $filter, owner: $owner) {
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
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview(
    $filter: ModelSubscriptionReviewFilterInput
    $owner: String
  ) {
    onUpdateReview(filter: $filter, owner: $owner) {
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
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview(
    $filter: ModelSubscriptionReviewFilterInput
    $owner: String
  ) {
    onDeleteReview(filter: $filter, owner: $owner) {
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
export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation(
    $filter: ModelSubscriptionConversationFilterInput
    $owner: String
  ) {
    onCreateConversation(filter: $filter, owner: $owner) {
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
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation(
    $filter: ModelSubscriptionConversationFilterInput
    $owner: String
  ) {
    onUpdateConversation(filter: $filter, owner: $owner) {
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
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation(
    $filter: ModelSubscriptionConversationFilterInput
    $owner: String
  ) {
    onDeleteConversation(filter: $filter, owner: $owner) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onCreateMessage(filter: $filter, owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onUpdateMessage(filter: $filter, owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onDeleteMessage(filter: $filter, owner: $owner) {
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
export const onCreateSavedJob = /* GraphQL */ `
  subscription OnCreateSavedJob(
    $filter: ModelSubscriptionSavedJobFilterInput
    $owner: String
  ) {
    onCreateSavedJob(filter: $filter, owner: $owner) {
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
export const onUpdateSavedJob = /* GraphQL */ `
  subscription OnUpdateSavedJob(
    $filter: ModelSubscriptionSavedJobFilterInput
    $owner: String
  ) {
    onUpdateSavedJob(filter: $filter, owner: $owner) {
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
export const onDeleteSavedJob = /* GraphQL */ `
  subscription OnDeleteSavedJob(
    $filter: ModelSubscriptionSavedJobFilterInput
    $owner: String
  ) {
    onDeleteSavedJob(filter: $filter, owner: $owner) {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
    $owner: String
  ) {
    onCreateNotification(filter: $filter, owner: $owner) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
    $owner: String
  ) {
    onUpdateNotification(filter: $filter, owner: $owner) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification(
    $filter: ModelSubscriptionNotificationFilterInput
    $owner: String
  ) {
    onDeleteNotification(filter: $filter, owner: $owner) {
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
