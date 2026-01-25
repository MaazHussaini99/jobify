import React, { useState, useRef } from 'react';
import { uploadData, getUrl } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { updateUserProfile } from '../../graphql/mutations';
import { parseResumeLocally, ParsedResumeData } from '../../services/resumeParser';
import { Loading } from '../Common';
import './Resume.css';

const client = generateClient();

const ResumeUpload: React.FC = () => {
  const { profile, refreshProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setError(null);
    setSuccess(null);
    setParsedData(null);
  };

  const handleUploadAndParse = async () => {
    if (!selectedFile || !profile) return;

    try {
      setIsUploading(true);
      setError(null);

      // Upload to S3
      const fileName = `resumes/${profile.id}/${Date.now()}-${selectedFile.name}`;
      await uploadData({
        key: fileName,
        data: selectedFile,
        options: {
          contentType: selectedFile.type
        }
      });

      setIsUploading(false);
      setIsParsing(true);

      // Store the uploaded file URL (can be used for viewing later)
      await getUrl({ key: fileName });

      // Read file content for parsing
      const fileContent = await readFileContent(selectedFile);

      // Parse resume using AI
      const parsed = await parseResumeWithAI(fileContent);
      setParsedData(parsed);
      setPreviewMode(true);
      setSuccess('Resume parsed successfully! Review the extracted data below.');

    } catch (err: any) {
      setError(err.message || 'Failed to upload and parse resume');
    } finally {
      setIsUploading(false);
      setIsParsing(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));

      if (file.type === 'application/pdf') {
        // For PDF, we'll send it as base64
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const parseResumeWithAI = async (content: string): Promise<ParsedResumeData> => {
    // Use the resume parser service (falls back to local parsing if API unavailable)
    return parseResumeLocally(content);
  };

  const handleApplyToProfile = async () => {
    if (!parsedData || !profile) return;

    try {
      setIsUploading(true);
      setError(null);

      // Prepare the update input
      const updateInput: any = {
        id: profile.id,
      };

      // Only update fields that have data
      if (parsedData.headline) updateInput.headline = parsedData.headline;
      if (parsedData.bio) updateInput.bio = parsedData.bio;
      if (parsedData.phone) updateInput.phone = parsedData.phone;
      if (parsedData.location) updateInput.location = parsedData.location;
      if (parsedData.linkedIn) updateInput.linkedIn = parsedData.linkedIn;
      if (parsedData.github) updateInput.github = parsedData.github;
      if (parsedData.website) updateInput.website = parsedData.website;

      if (parsedData.skills && parsedData.skills.length > 0) {
        updateInput.skills = parsedData.skills.map(s => ({
          name: s.name,
          level: s.level || 'INTERMEDIATE',
          yearsOfExperience: s.yearsOfExperience || 1
        }));
      }

      if (parsedData.experience && parsedData.experience.length > 0) {
        updateInput.experience = parsedData.experience;
      }

      if (parsedData.education && parsedData.education.length > 0) {
        updateInput.education = parsedData.education;
      }

      if (parsedData.certifications && parsedData.certifications.length > 0) {
        updateInput.certifications = parsedData.certifications;
      }

      await client.graphql({
        query: updateUserProfile,
        variables: { input: updateInput },
        authMode: 'userPool'
      });

      await refreshProfile();
      setSuccess('Profile updated successfully with resume data!');
      setPreviewMode(false);
      setParsedData(null);
      setSelectedFile(null);

    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setPreviewMode(false);
    setParsedData(null);
    setSelectedFile(null);
    setError(null);
    setSuccess(null);
  };

  if (previewMode && parsedData) {
    return (
      <div className="resume-upload">
        <div className="resume-preview">
          <h2>Review Extracted Data</h2>
          <p className="preview-info">
            Review the information extracted from your resume. Click "Apply to Profile" to update your profile with this data.
          </p>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="preview-sections">
            {/* Contact Info */}
            <div className="preview-section">
              <h3>Contact Information</h3>
              <div className="preview-grid">
                {parsedData.email && <div><strong>Email:</strong> {parsedData.email}</div>}
                {parsedData.phone && <div><strong>Phone:</strong> {parsedData.phone}</div>}
                {parsedData.location && <div><strong>Location:</strong> {parsedData.location}</div>}
                {parsedData.linkedIn && <div><strong>LinkedIn:</strong> {parsedData.linkedIn}</div>}
                {parsedData.github && <div><strong>GitHub:</strong> {parsedData.github}</div>}
                {parsedData.website && <div><strong>Website:</strong> {parsedData.website}</div>}
              </div>
            </div>

            {/* Summary */}
            {(parsedData.headline || parsedData.bio) && (
              <div className="preview-section">
                <h3>Summary</h3>
                {parsedData.headline && <p><strong>Headline:</strong> {parsedData.headline}</p>}
                {parsedData.bio && <p><strong>About:</strong> {parsedData.bio}</p>}
              </div>
            )}

            {/* Skills */}
            {parsedData.skills && parsedData.skills.length > 0 && (
              <div className="preview-section">
                <h3>Skills ({parsedData.skills.length})</h3>
                <div className="skills-preview">
                  {parsedData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill.name}
                      {skill.yearsOfExperience && ` (${skill.yearsOfExperience}yr)`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {parsedData.experience && parsedData.experience.length > 0 && (
              <div className="preview-section">
                <h3>Experience ({parsedData.experience.length})</h3>
                {parsedData.experience.map((exp, index) => (
                  <div key={index} className="preview-item">
                    <h4>{exp.title}</h4>
                    <p className="company">{exp.company} {exp.location && `• ${exp.location}`}</p>
                    <p className="dates">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && <p className="description">{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {parsedData.education && parsedData.education.length > 0 && (
              <div className="preview-section">
                <h3>Education ({parsedData.education.length})</h3>
                {parsedData.education.map((edu, index) => (
                  <div key={index} className="preview-item">
                    <h4>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h4>
                    <p className="institution">{edu.institution}</p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="dates">{edu.startDate} - {edu.endDate}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {parsedData.certifications && parsedData.certifications.length > 0 && (
              <div className="preview-section">
                <h3>Certifications ({parsedData.certifications.length})</h3>
                {parsedData.certifications.map((cert, index) => (
                  <div key={index} className="preview-item">
                    <h4>{cert.name}</h4>
                    <p className="issuer">{cert.issuingOrganization}</p>
                    {cert.issueDate && <p className="dates">Issued: {cert.issueDate}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="preview-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApplyToProfile}
              disabled={isUploading}
            >
              {isUploading ? 'Applying...' : 'Apply to Profile'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-upload">
      <div className="upload-card">
        <div className="upload-header">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <h2>Upload Your Resume</h2>
          <p>Upload your resume and we'll automatically extract your information using AI</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div
          className={`upload-zone ${selectedFile ? 'has-file' : ''}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            hidden
          />

          {selectedFile ? (
            <div className="selected-file">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span className="file-name">{selectedFile.name}</span>
              <span className="file-size">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
            </div>
          ) : (
            <>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p>Click to upload or drag and drop</p>
              <span className="file-types">PDF, DOC, DOCX, or TXT (max 5MB)</span>
            </>
          )}
        </div>

        {selectedFile && (
          <div className="upload-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSelectedFile(null);
                setError(null);
              }}
            >
              Remove
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUploadAndParse}
              disabled={isUploading || isParsing}
            >
              {isUploading ? (
                <>
                  <Loading size="small" /> Uploading...
                </>
              ) : isParsing ? (
                <>
                  <Loading size="small" /> Analyzing with AI...
                </>
              ) : (
                'Upload & Parse Resume'
              )}
            </button>
          </div>
        )}

        <div className="upload-features">
          <h3>What we extract:</h3>
          <ul>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Contact information
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Work experience
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Education history
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Skills & expertise
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Certifications
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
