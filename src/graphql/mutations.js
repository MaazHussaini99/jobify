/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
export const createJobPosting = /* GraphQL */ `
  mutation CreateJobPosting(
    $input: CreateJobPostingInput!
    $condition: ModelJobPostingConditionInput
  ) {
    createJobPosting(input: $input, condition: $condition) {
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
export const updateJobPosting = /* GraphQL */ `
  mutation UpdateJobPosting(
    $input: UpdateJobPostingInput!
    $condition: ModelJobPostingConditionInput
  ) {
    updateJobPosting(input: $input, condition: $condition) {
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
export const deleteJobPosting = /* GraphQL */ `
  mutation DeleteJobPosting(
    $input: DeleteJobPostingInput!
    $condition: ModelJobPostingConditionInput
  ) {
    deleteJobPosting(input: $input, condition: $condition) {
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
export const createJobApplication = /* GraphQL */ `
  mutation CreateJobApplication(
    $input: CreateJobApplicationInput!
    $condition: ModelJobApplicationConditionInput
  ) {
    createJobApplication(input: $input, condition: $condition) {
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
export const updateJobApplication = /* GraphQL */ `
  mutation UpdateJobApplication(
    $input: UpdateJobApplicationInput!
    $condition: ModelJobApplicationConditionInput
  ) {
    updateJobApplication(input: $input, condition: $condition) {
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
export const deleteJobApplication = /* GraphQL */ `
  mutation DeleteJobApplication(
    $input: DeleteJobApplicationInput!
    $condition: ModelJobApplicationConditionInput
  ) {
    deleteJobApplication(input: $input, condition: $condition) {
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
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
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
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
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
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
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
export const createConversation = /* GraphQL */ `
  mutation CreateConversation(
    $input: CreateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    createConversation(input: $input, condition: $condition) {
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
export const updateConversation = /* GraphQL */ `
  mutation UpdateConversation(
    $input: UpdateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    updateConversation(input: $input, condition: $condition) {
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
export const deleteConversation = /* GraphQL */ `
  mutation DeleteConversation(
    $input: DeleteConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    deleteConversation(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createSavedJob = /* GraphQL */ `
  mutation CreateSavedJob(
    $input: CreateSavedJobInput!
    $condition: ModelSavedJobConditionInput
  ) {
    createSavedJob(input: $input, condition: $condition) {
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
export const updateSavedJob = /* GraphQL */ `
  mutation UpdateSavedJob(
    $input: UpdateSavedJobInput!
    $condition: ModelSavedJobConditionInput
  ) {
    updateSavedJob(input: $input, condition: $condition) {
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
export const deleteSavedJob = /* GraphQL */ `
  mutation DeleteSavedJob(
    $input: DeleteSavedJobInput!
    $condition: ModelSavedJobConditionInput
  ) {
    deleteSavedJob(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
