import React, { useState } from 'react';
import { JobSearchFilters, JobType, ExperienceLevel, LocationType, JobDuration } from '../../types';
import './Jobs.css';

interface JobFiltersProps {
  filters: JobSearchFilters;
  onFilterChange: (filters: JobSearchFilters) => void;
}

const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'FREELANCE', label: 'Freelance' },
  { value: 'INTERNSHIP', label: 'Internship' }
];

const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: 'ENTRY', label: 'Entry Level' },
  { value: 'JUNIOR', label: 'Junior' },
  { value: 'MID', label: 'Mid Level' },
  { value: 'SENIOR', label: 'Senior' },
  { value: 'LEAD', label: 'Lead' },
  { value: 'EXECUTIVE', label: 'Executive' }
];

const LOCATION_TYPES: { value: LocationType; label: string }[] = [
  { value: 'REMOTE', label: 'Remote' },
  { value: 'ONSITE', label: 'On-site' },
  { value: 'HYBRID', label: 'Hybrid' }
];

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFilterChange }) => {
  const [keyword, setKeyword] = useState(filters.keyword || '');
  const [skillInput, setSkillInput] = useState('');

  const handleKeywordSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, keyword });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !filters.skills?.includes(skillInput.trim())) {
      onFilterChange({
        ...filters,
        skills: [...(filters.skills || []), skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    onFilterChange({
      ...filters,
      skills: filters.skills?.filter(s => s !== skill)
    });
  };

  const handleJobTypeToggle = (jobType: JobType) => {
    const currentTypes = filters.jobTypes || [];
    const newTypes = currentTypes.includes(jobType)
      ? currentTypes.filter(t => t !== jobType)
      : [...currentTypes, jobType];
    onFilterChange({ ...filters, jobTypes: newTypes });
  };

  const handleExperienceLevelToggle = (level: ExperienceLevel) => {
    const currentLevels = filters.experienceLevels || [];
    const newLevels = currentLevels.includes(level)
      ? currentLevels.filter(l => l !== level)
      : [...currentLevels, level];
    onFilterChange({ ...filters, experienceLevels: newLevels });
  };

  const handleLocationTypeToggle = (locationType: LocationType) => {
    const currentTypes = filters.locationTypes || [];
    const newTypes = currentTypes.includes(locationType)
      ? currentTypes.filter(t => t !== locationType)
      : [...currentTypes, locationType];
    onFilterChange({ ...filters, locationTypes: newTypes });
  };

  const handleBudgetChange = (field: 'minBudget' | 'maxBudget', value: string) => {
    onFilterChange({
      ...filters,
      [field]: value ? parseFloat(value) : undefined
    });
  };

  const clearAllFilters = () => {
    setKeyword('');
    setSkillInput('');
    onFilterChange({});
  };

  const hasActiveFilters = () => {
    return (
      filters.keyword ||
      (filters.skills && filters.skills.length > 0) ||
      (filters.jobTypes && filters.jobTypes.length > 0) ||
      (filters.experienceLevels && filters.experienceLevels.length > 0) ||
      (filters.locationTypes && filters.locationTypes.length > 0) ||
      filters.minBudget ||
      filters.maxBudget ||
      filters.location
    );
  };

  return (
    <div className="job-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        {hasActiveFilters() && (
          <button className="clear-filters" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Keyword Search */}
      <div className="filter-section">
        <label className="filter-label">Search</label>
        <form onSubmit={handleKeywordSearch} className="search-form">
          <input
            type="text"
            placeholder="Job title, keywords..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
      </div>

      {/* Skills */}
      <div className="filter-section">
        <label className="filter-label">Skills</label>
        <div className="skill-input-group">
          <input
            type="text"
            placeholder="Add skill..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
          />
          <button type="button" className="add-skill-btn" onClick={handleAddSkill}>
            Add
          </button>
        </div>
        {filters.skills && filters.skills.length > 0 && (
          <div className="selected-skills">
            {filters.skills.map(skill => (
              <span key={skill} className="selected-skill">
                {skill}
                <button onClick={() => handleRemoveSkill(skill)}>&times;</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Job Type */}
      <div className="filter-section">
        <label className="filter-label">Job Type</label>
        <div className="checkbox-list">
          {JOB_TYPES.map(({ value, label }) => (
            <label key={value} className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.jobTypes?.includes(value)}
                onChange={() => handleJobTypeToggle(value)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="filter-section">
        <label className="filter-label">Experience Level</label>
        <div className="checkbox-list">
          {EXPERIENCE_LEVELS.map(({ value, label }) => (
            <label key={value} className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.experienceLevels?.includes(value)}
                onChange={() => handleExperienceLevelToggle(value)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Location Type */}
      <div className="filter-section">
        <label className="filter-label">Location Type</label>
        <div className="checkbox-list">
          {LOCATION_TYPES.map(({ value, label }) => (
            <label key={value} className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.locationTypes?.includes(value)}
                onChange={() => handleLocationTypeToggle(value)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="filter-section">
        <label className="filter-label">Location</label>
        <input
          type="text"
          placeholder="City, state, or country..."
          value={filters.location || ''}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
        />
      </div>

      {/* Budget Range */}
      <div className="filter-section">
        <label className="filter-label">Budget Range</label>
        <div className="budget-inputs">
          <input
            type="number"
            placeholder="Min"
            min="0"
            value={filters.minBudget || ''}
            onChange={(e) => handleBudgetChange('minBudget', e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            min="0"
            value={filters.maxBudget || ''}
            onChange={(e) => handleBudgetChange('maxBudget', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
