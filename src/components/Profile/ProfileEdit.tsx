import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuid } from 'uuid';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile, Skill, Experience, Education, Certification, Availability, SkillLevel, AvailabilityStatus, JobType } from '../../types';
import { updateUserProfile } from '../../graphql/mutations';
import './Profile.css';

const client = generateClient();

const SKILL_LEVELS: SkillLevel[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
const AVAILABILITY_STATUSES: AvailabilityStatus[] = ['AVAILABLE', 'PARTIALLY_AVAILABLE', 'NOT_AVAILABLE', 'OPEN_TO_OFFERS'];
const JOB_TYPES: JobType[] = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP'];
const AVAILABLE_WITHIN_OPTIONS = [
  { value: 'IMMEDIATELY', label: 'Immediately' },
  { value: 'HOURS_48', label: 'Within 48 hours' },
  { value: 'HOURS_72', label: 'Within 72 hours' },
  { value: 'CUSTOM', label: 'Custom (specify date)' }
];

const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const { profile, refreshProfile, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [availability, setAvailability] = useState<Availability>({
    status: 'AVAILABLE',
    hoursPerWeek: 40
  });
  const [preferredJobTypes, setPreferredJobTypes] = useState<JobType[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New skill form
  const [newSkill, setNewSkill] = useState({ name: '', level: 'INTERMEDIATE' as SkillLevel, yearsOfExperience: 0 });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        headline: profile.headline || '',
        bio: profile.bio || '',
        location: profile.location || '',
        phone: profile.phone || '',
        website: profile.website || '',
        linkedIn: profile.linkedIn || '',
        github: profile.github || '',
        companyName: profile.companyName || '',
        companySize: profile.companySize || '',
        industry: profile.industry || '',
        hourlyRate: profile.hourlyRate || 0
      });
      setSkills(profile.skills || []);
      setExperiences(profile.experience || []);
      setEducations(profile.education || []);
      setCertifications(profile.certifications || []);
      if (profile.availability) {
        setAvailability(profile.availability);
      }
      setPreferredJobTypes(profile.preferredJobTypes || []);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setSkills(prev => [...prev, { ...newSkill }]);
      setNewSkill({ name: '', level: 'INTERMEDIATE', yearsOfExperience: 0 });
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddExperience = () => {
    setExperiences(prev => [...prev, {
      id: uuid(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: any) => {
    setExperiences(prev => prev.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    ));
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddEducation = () => {
    setEducations(prev => [...prev, {
      id: uuid(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setEducations(prev => prev.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    ));
  };

  const handleRemoveEducation = (index: number) => {
    setEducations(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddCertification = () => {
    setCertifications(prev => [...prev, {
      id: uuid(),
      name: '',
      issuingOrganization: '',
      issueDate: '',
      expirationDate: '',
      credentialId: '',
      credentialUrl: ''
    }]);
  };

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    setCertifications(prev => prev.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    ));
  };

  const handleRemoveCertification = (index: number) => {
    setCertifications(prev => prev.filter((_, i) => i !== index));
  };

  const handleJobTypeToggle = (jobType: JobType) => {
    setPreferredJobTypes(prev =>
      prev.includes(jobType)
        ? prev.filter(t => t !== jobType)
        : [...prev, jobType]
    );
  };

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileKey = `profiles/${profile?.id}/${uuid()}-${file.name}`;
      await uploadData({
        path: fileKey,
        data: file,
        options: {
          contentType: file.type
        }
      });
      setFormData(prev => ({ ...prev, profilePicture: fileKey }));
    } catch (err: any) {
      setError('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile?.id) return;

    try {
      setIsSaving(true);
      setError(null);

      await client.graphql({
        query: updateUserProfile,
        variables: {
          input: {
            id: profile.id,
            ...formData,
            skills: skills.length > 0 ? skills : null,
            experience: experiences.filter(e => e.title && e.company),
            education: educations.filter(e => e.institution && e.degree),
            certifications: certifications.filter(c => c.name && c.issuingOrganization),
            availability,
            preferredJobTypes: preferredJobTypes.length > 0 ? preferredJobTypes : null
          }
        },
        authMode: 'userPool'
      });

      await refreshProfile();
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return <div className="profile-loading">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <h2>Profile Not Found</h2>
        <p>Please sign in to edit your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-edit">
      <div className="edit-header">
        <h1>Edit Profile</h1>
        <button onClick={() => navigate(`/profile/${profile.id}`)} className="btn btn-secondary">
          View Profile
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="edit-form">
        {/* Basic Information */}
        <section className="edit-section">
          <h2>Basic Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="headline">Professional Headline</label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={formData.headline || ''}
              onChange={handleInputChange}
              placeholder="e.g., Senior Software Engineer | React & Node.js Expert"
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">About</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio || ''}
              onChange={handleInputChange}
              rows={5}
              placeholder="Tell others about yourself, your experience, and what you're looking for..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureUpload}
            />
          </div>
        </section>

        {/* Company Information (for Employers) */}
        {profile.userType === 'EMPLOYER' && (
          <section className="edit-section">
            <h2>Company Information</h2>

            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companySize">Company Size</label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="industry">Industry</label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., Technology, Healthcare"
                />
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {profile.userType === 'PROFESSIONAL' && (
          <section className="edit-section">
            <h2>Skills</h2>

            <div className="skills-list">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item-edit">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}</span>
                  <span className="skill-years">{skill.yearsOfExperience} yrs</span>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="add-skill-form">
              <input
                type="text"
                placeholder="Skill name"
                value={newSkill.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
              />
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value as SkillLevel }))}
              >
                {SKILL_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Years"
                min="0"
                max="50"
                value={newSkill.yearsOfExperience}
                onChange={(e) => setNewSkill(prev => ({ ...prev, yearsOfExperience: parseInt(e.target.value) || 0 }))}
              />
              <button type="button" className="btn btn-secondary" onClick={handleAddSkill}>
                Add Skill
              </button>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {profile.userType === 'PROFESSIONAL' && (
          <section className="edit-section">
            <h2>Experience</h2>

            {experiences.map((exp, index) => (
              <div key={exp.id} className="experience-item-edit">
                <div className="item-header">
                  <h4>Experience {index + 1}</h4>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveExperience(index)}
                  >
                    Remove
                  </button>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Company *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="month"
                      value={exp.endDate || ''}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                      />
                      Currently working here
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={exp.description || ''}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    rows={3}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}

            <button type="button" className="btn btn-secondary" onClick={handleAddExperience}>
              + Add Experience
            </button>
          </section>
        )}

        {/* Education Section */}
        {profile.userType === 'PROFESSIONAL' && (
          <section className="edit-section">
            <h2>Education</h2>

            {educations.map((edu, index) => (
              <div key={edu.id} className="education-item-edit">
                <div className="item-header">
                  <h4>Education {index + 1}</h4>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveEducation(index)}
                  >
                    Remove
                  </button>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Institution *</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Degree *</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Field of Study</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ''}
                    onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="month"
                      value={edu.startDate || ''}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="month"
                      value={edu.endDate || ''}
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="btn btn-secondary" onClick={handleAddEducation}>
              + Add Education
            </button>
          </section>
        )}

        {/* Certifications Section */}
        {profile.userType === 'PROFESSIONAL' && (
          <section className="edit-section">
            <h2>Certifications</h2>

            {certifications.map((cert, index) => (
              <div key={cert.id} className="certification-item-edit">
                <div className="item-header">
                  <h4>Certification {index + 1}</h4>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveCertification(index)}
                  >
                    Remove
                  </button>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Certification Name *</label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Issuing Organization *</label>
                    <input
                      type="text"
                      value={cert.issuingOrganization}
                      onChange={(e) => handleCertificationChange(index, 'issuingOrganization', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Issue Date</label>
                    <input
                      type="month"
                      value={cert.issueDate || ''}
                      onChange={(e) => handleCertificationChange(index, 'issueDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Expiration Date</label>
                    <input
                      type="month"
                      value={cert.expirationDate || ''}
                      onChange={(e) => handleCertificationChange(index, 'expirationDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Credential URL</label>
                  <input
                    type="url"
                    value={cert.credentialUrl || ''}
                    onChange={(e) => handleCertificationChange(index, 'credentialUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            ))}

            <button type="button" className="btn btn-secondary" onClick={handleAddCertification}>
              + Add Certification
            </button>
          </section>
        )}

        {/* Availability & Rate Section */}
        {profile.userType === 'PROFESSIONAL' && (
          <section className="edit-section">
            <h2>Availability & Rate</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="availabilityStatus">Availability Status</label>
                <select
                  id="availabilityStatus"
                  value={availability.status}
                  onChange={(e) => setAvailability(prev => ({ ...prev, status: e.target.value as AvailabilityStatus }))}
                >
                  {AVAILABILITY_STATUSES.map(status => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="availableWithin">Available to Start</label>
                <select
                  id="availableWithin"
                  value={availability.availableWithin || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAvailability(prev => ({
                      ...prev,
                      availableWithin: value ? value as 'IMMEDIATELY' | 'HOURS_48' | 'HOURS_72' | 'CUSTOM' : undefined
                    }));
                  }}
                >
                  <option value="">Select availability</option>
                  {AVAILABLE_WITHIN_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hoursPerWeek">Hours Per Week</label>
                <input
                  type="number"
                  id="hoursPerWeek"
                  min="0"
                  max="168"
                  value={availability.hoursPerWeek || ''}
                  onChange={(e) => setAvailability(prev => ({ ...prev, hoursPerWeek: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hourlyRate">Hourly Rate (USD)</label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  min="0"
                  value={formData.hourlyRate || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., 75"
                />
              </div>
              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <input
                  type="text"
                  id="timezone"
                  value={availability.timezone || ''}
                  onChange={(e) => setAvailability(prev => ({ ...prev, timezone: e.target.value }))}
                  placeholder="e.g., PST, EST, UTC+5"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Preferred Job Types</label>
              <div className="checkbox-group">
                {JOB_TYPES.map(jobType => (
                  <label key={jobType} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferredJobTypes.includes(jobType)}
                      onChange={() => handleJobTypeToggle(jobType)}
                    />
                    {jobType.replace(/_/g, ' ')}
                  </label>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Links Section */}
        <section className="edit-section">
          <h2>Links</h2>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website || ''}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedIn">LinkedIn</label>
            <input
              type="url"
              id="linkedIn"
              name="linkedIn"
              value={formData.linkedIn || ''}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className="form-group">
            <label htmlFor="github">GitHub</label>
            <input
              type="url"
              id="github"
              name="github"
              value={formData.github || ''}
              onChange={handleInputChange}
              placeholder="https://github.com/yourusername"
            />
          </div>
        </section>

        {/* Submit */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/profile/${profile.id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
