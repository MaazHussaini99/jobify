// Type definitions for the Professional Networking Platform

// Enums
export type UserType = 'PROFESSIONAL' | 'EMPLOYER';
export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type AvailabilityStatus = 'AVAILABLE' | 'PARTIALLY_AVAILABLE' | 'NOT_AVAILABLE' | 'OPEN_TO_OFFERS';
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'INTERNSHIP';
export type JobDuration = 'LESS_THAN_WEEK' | 'ONE_TO_FOUR_WEEKS' | 'ONE_TO_THREE_MONTHS' | 'THREE_TO_SIX_MONTHS' | 'MORE_THAN_SIX_MONTHS' | 'ONGOING';
export type ExperienceLevel = 'ENTRY' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD' | 'EXECUTIVE';
export type CompensationType = 'HOURLY' | 'FIXED' | 'SALARY' | 'NEGOTIABLE';
export type LocationType = 'REMOTE' | 'ONSITE' | 'HYBRID';
export type JobStatus = 'DRAFT' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'CLOSED';
export type ApplicationStatus = 'PENDING' | 'REVIEWING' | 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
export type ReviewType = 'EMPLOYER_TO_PROFESSIONAL' | 'PROFESSIONAL_TO_EMPLOYER';
export type ConversationStatus = 'ACTIVE' | 'ARCHIVED' | 'BLOCKED';
export type MessageType = 'TEXT' | 'FILE' | 'IMAGE' | 'SYSTEM';
export type NotificationType = 'NEW_APPLICATION' | 'APPLICATION_STATUS' | 'NEW_MESSAGE' | 'NEW_REVIEW' | 'JOB_MATCH' | 'PROFILE_VIEW' | 'SYSTEM';

// Nested Types
export interface Skill {
  name: string;
  level?: SkillLevel;
  yearsOfExperience?: number;
  endorsed?: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate?: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Availability {
  status: AvailabilityStatus;
  hoursPerWeek?: number;
  startDate?: string;
  timezone?: string;
  preferredSchedule?: string;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
}

// Main Models
export interface UserProfile {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  headline?: string;
  bio?: string;
  profilePicture?: string;
  coverPhoto?: string;
  location?: string;
  phone?: string;
  website?: string;
  linkedIn?: string;
  github?: string;
  userType: UserType;
  companyName?: string;
  companySize?: string;
  industry?: string;
  skills?: Skill[];
  experience?: Experience[];
  education?: Education[];
  certifications?: Certification[];
  availability?: Availability;
  hourlyRate?: number;
  preferredJobTypes?: JobType[];
  totalJobsCompleted?: number;
  averageRating?: number;
  totalReviews?: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobPosting {
  id: string;
  employerId: string;
  employer?: UserProfile;
  title: string;
  description: string;
  shortDescription?: string;
  requirements?: string[];
  responsibilities?: string[];
  requiredSkills: string[];
  preferredSkills?: string[];
  jobType: JobType;
  duration: JobDuration;
  durationValue?: number;
  experienceLevel: ExperienceLevel;
  compensationType: CompensationType;
  minBudget?: number;
  maxBudget?: number;
  currency?: string;
  locationType: LocationType;
  location?: string;
  timezone?: string;
  status: JobStatus;
  applicationDeadline?: string;
  startDate?: string;
  viewCount?: number;
  applicationCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  job?: JobPosting;
  applicantId: string;
  applicant?: UserProfile;
  coverLetter?: string;
  proposedRate?: number;
  estimatedDuration?: string;
  availability?: string;
  portfolioLinks?: string[];
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  reviewedAt?: string;
  employerNotes?: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewer?: UserProfile;
  revieweeId: string;
  reviewee?: UserProfile;
  jobId: string;
  job?: JobPosting;
  rating: number;
  title?: string;
  content: string;
  communicationRating?: number;
  qualityRating?: number;
  timelinessRating?: number;
  professionalismRating?: number;
  reviewType: ReviewType;
  isPublic?: boolean;
  isVerified?: boolean;
  response?: string;
  responseDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  user1Id: string;
  user1?: UserProfile;
  user2Id: string;
  user2?: UserProfile;
  jobId?: string;
  job?: JobPosting;
  lastMessageAt?: string;
  lastMessagePreview?: string;
  user1UnreadCount?: number;
  user2UnreadCount?: number;
  status?: ConversationStatus;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType?: MessageType;
  attachments?: Attachment[];
  isRead?: boolean;
  readAt?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SavedJob {
  id: string;
  userId: string;
  jobId: string;
  job?: JobPosting;
  savedAt: string;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedJobId?: string;
  relatedUserId?: string;
  relatedApplicationId?: string;
  relatedMessageId?: string;
  isRead?: boolean;
  readAt?: string;
  actionUrl?: string;
  createdAt: string;
}

// Search & Filter Types
export interface JobSearchFilters {
  keyword?: string;
  skills?: string[];
  jobTypes?: JobType[];
  experienceLevels?: ExperienceLevel[];
  locationTypes?: LocationType[];
  location?: string;
  minBudget?: number;
  maxBudget?: number;
  duration?: JobDuration[];
}

export interface ProfessionalSearchFilters {
  keyword?: string;
  skills?: string[];
  experienceLevels?: ExperienceLevel[];
  availability?: AvailabilityStatus[];
  location?: string;
  minRate?: number;
  maxRate?: number;
  minRating?: number;
}

// API Response Types
export interface PaginatedResponse<T> {
  items: T[];
  nextToken?: string;
  totalCount?: number;
}

// Auth Types
export interface AuthUser {
  userId: string;
  email: string;
  isAuthenticated: boolean;
  profile?: UserProfile;
}
