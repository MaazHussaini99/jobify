import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { JobType, JobDuration, ExperienceLevel, CompensationType, LocationType } from '../../types';
import { createJobPosting } from '../../graphql/mutations';
import './Jobs.css';

const client = generateClient();

const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'FREELANCE', label: 'Freelance' },
  { value: 'INTERNSHIP', label: 'Internship' }
];

const JOB_DURATIONS: { value: JobDuration; label: string }[] = [
  { value: 'LESS_THAN_WEEK', label: 'Less than a week' },
  { value: 'ONE_TO_FOUR_WEEKS', label: '1-4 weeks' },
  { value: 'ONE_TO_THREE_MONTHS', label: '1-3 months' },
  { value: 'THREE_TO_SIX_MONTHS', label: '3-6 months' },
  { value: 'MORE_THAN_SIX_MONTHS', label: 'More than 6 months' },
  { value: 'ONGOING', label: 'Ongoing' }
];

const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: 'ENTRY', label: 'Entry Level' },
  { value: 'JUNIOR', label: 'Junior' },
  { value: 'MID', label: 'Mid Level' },
  { value: 'SENIOR', label: 'Senior' },
  { value: 'LEAD', label: 'Lead' },
  { value: 'EXECUTIVE', label: 'Executive' }
];

const COMPENSATION_TYPES: { value: CompensationType; label: string }[] = [
  { value: 'HOURLY', label: 'Hourly' },
  { value: 'FIXED', label: 'Fixed Price' },
  { value: 'SALARY', label: 'Salary' },
  { value: 'NEGOTIABLE', label: 'Negotiable' }
];

const LOCATION_TYPES: { value: LocationType; label: string }[] = [
  { value: 'REMOTE', label: 'Remote' },
  { value: 'ONSITE', label: 'On-site' },
  { value: 'HYBRID', label: 'Hybrid' }
];

const JobCreate: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    jobType: 'FULL_TIME' as JobType,
    duration: 'ONE_TO_THREE_MONTHS' as JobDuration,
    experienceLevel: 'MID' as ExperienceLevel,
    compensationType: 'NEGOTIABLE' as CompensationType,
    minBudget: '',
    maxBudget: '',
    locationType: 'REMOTE' as LocationType,
    location: '',
    timezone: '',
    applicationDeadline: '',
    startDate: ''
  });

  const [requirements, setRequirements] = useState<string[]>(['']);
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [preferredSkillInput, setPreferredSkillInput] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!profile || profile.userType !== 'EMPLOYER') {
    return (
      <div className="job-error">
        <h2>Access Denied</h2>
        <p>Only employers can post jobs.</p>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRequirement = () => {
    setRequirements(prev => [...prev, '']);
  };

  const handleRequirementChange = (index: number, value: string) => {
    setRequirements(prev => prev.map((item, i) => i === index ? value : item));
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddResponsibility = () => {
    setResponsibilities(prev => [...prev, '']);
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    setResponsibilities(prev => prev.map((item, i) => i === index ? value : item));
  };

  const handleRemoveResponsibility = (index: number) => {
    setResponsibilities(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSkill = (type: 'required' | 'preferred') => {
    const input = type === 'required' ? skillInput : preferredSkillInput;
    const setSkills = type === 'required' ? setRequiredSkills : setPreferredSkills;
    const setInput = type === 'required' ? setSkillInput : setPreferredSkillInput;
    const skills = type === 'required' ? requiredSkills : preferredSkills;

    if (input.trim() && !skills.includes(input.trim())) {
      setSkills(prev => [...prev, input.trim()]);
      setInput('');
    }
  };

  const handleRemoveSkill = (skill: string, type: 'required' | 'preferred') => {
    const setSkills = type === 'required' ? setRequiredSkills : setPreferredSkills;
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Job title is required');
      return;
    }

    if (!formData.description.trim()) {
      setError('Job description is required');
      return;
    }

    if (requiredSkills.length === 0) {
      setError('At least one required skill is needed');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const jobInput = {
        employerId: profile.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim() || formData.description.slice(0, 200),
        requirements: requirements.filter(r => r.trim()),
        responsibilities: responsibilities.filter(r => r.trim()),
        requiredSkills,
        preferredSkills: preferredSkills.length > 0 ? preferredSkills : null,
        jobType: formData.jobType,
        duration: formData.duration,
        experienceLevel: formData.experienceLevel,
        compensationType: formData.compensationType,
        minBudget: formData.minBudget ? parseFloat(formData.minBudget) : null,
        maxBudget: formData.maxBudget ? parseFloat(formData.maxBudget) : null,
        currency: 'USD',
        locationType: formData.locationType,
        location: formData.location || null,
        timezone: formData.timezone || null,
        status: saveAsDraft ? 'DRAFT' : 'OPEN',
        applicationDeadline: formData.applicationDeadline || null,
        startDate: formData.startDate || null
      };

      const response: any = await client.graphql({
        query: createJobPosting,
        variables: { input: jobInput }
      });

      const createdJob = response.data?.createJobPosting;
      if (createdJob) {
        navigate(`/jobs/${createdJob.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create job posting');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="job-create-page">
      <div className="job-create-header">
        <h1>Post a New Job</h1>
        <p>Find the perfect professional for your project</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={(e) => handleSubmit(e, false)} className="job-create-form">
        {/* Basic Information */}
        <section className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Senior React Developer"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="shortDescription">Short Description</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              rows={2}
              placeholder="Brief overview of the job (appears in listings)"
              maxLength={200}
            />
            <span className="char-count">{formData.shortDescription.length}/200</span>
          </div>

          <div className="form-group">
            <label htmlFor="description">Full Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              placeholder="Detailed description of the job, expectations, and any other relevant information..."
              required
            />
          </div>
        </section>

        {/* Job Details */}
        <section className="form-section">
          <h2>Job Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="jobType">Job Type *</label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
              >
                {JOB_TYPES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration *</label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
              >
                {JOB_DURATIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experienceLevel">Experience Level *</label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
              >
                {EXPERIENCE_LEVELS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="locationType">Location Type *</label>
              <select
                id="locationType"
                name="locationType"
                value={formData.locationType}
                onChange={handleInputChange}
              >
                {LOCATION_TYPES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {formData.locationType !== 'REMOTE' && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <input
                  type="text"
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  placeholder="e.g., PST, EST"
                />
              </div>
            </div>
          )}
        </section>

        {/* Compensation */}
        <section className="form-section">
          <h2>Compensation</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="compensationType">Compensation Type *</label>
              <select
                id="compensationType"
                name="compensationType"
                value={formData.compensationType}
                onChange={handleInputChange}
              >
                {COMPENSATION_TYPES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {formData.compensationType !== 'NEGOTIABLE' && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="minBudget">
                  Minimum Budget ({formData.compensationType === 'HOURLY' ? '$/hr' : '$'})
                </label>
                <input
                  type="number"
                  id="minBudget"
                  name="minBudget"
                  value={formData.minBudget}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="e.g., 50"
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxBudget">
                  Maximum Budget ({formData.compensationType === 'HOURLY' ? '$/hr' : '$'})
                </label>
                <input
                  type="number"
                  id="maxBudget"
                  name="maxBudget"
                  value={formData.maxBudget}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="e.g., 100"
                />
              </div>
            </div>
          )}
        </section>

        {/* Requirements & Responsibilities */}
        <section className="form-section">
          <h2>Requirements</h2>
          {requirements.map((req, index) => (
            <div key={index} className="list-input-item">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                placeholder="Add a requirement..."
              />
              {requirements.length > 1 && (
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => handleRemoveRequirement(index)}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddRequirement}>
            + Add Requirement
          </button>
        </section>

        <section className="form-section">
          <h2>Responsibilities</h2>
          {responsibilities.map((resp, index) => (
            <div key={index} className="list-input-item">
              <input
                type="text"
                value={resp}
                onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                placeholder="Add a responsibility..."
              />
              {responsibilities.length > 1 && (
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => handleRemoveResponsibility(index)}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddResponsibility}>
            + Add Responsibility
          </button>
        </section>

        {/* Skills */}
        <section className="form-section">
          <h2>Required Skills *</h2>
          <div className="skill-input-row">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add a required skill..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill('required'))}
            />
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAddSkill('required')}>
              Add
            </button>
          </div>
          {requiredSkills.length > 0 && (
            <div className="skills-chips">
              {requiredSkills.map(skill => (
                <span key={skill} className="skill-chip">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill, 'required')}>&times;</button>
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="form-section">
          <h2>Preferred Skills</h2>
          <div className="skill-input-row">
            <input
              type="text"
              value={preferredSkillInput}
              onChange={(e) => setPreferredSkillInput(e.target.value)}
              placeholder="Add a preferred skill..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill('preferred'))}
            />
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAddSkill('preferred')}>
              Add
            </button>
          </div>
          {preferredSkills.length > 0 && (
            <div className="skills-chips preferred">
              {preferredSkills.map(skill => (
                <span key={skill} className="skill-chip">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill, 'preferred')}>&times;</button>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Dates */}
        <section className="form-section">
          <h2>Timeline</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="applicationDeadline">Application Deadline</label>
              <input
                type="date"
                id="applicationDeadline"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Expected Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={(e) => handleSubmit(e as any, true)}
            disabled={isSaving}
          >
            Save as Draft
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Publishing...' : 'Publish Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobCreate;
