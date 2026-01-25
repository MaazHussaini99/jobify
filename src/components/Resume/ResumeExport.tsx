import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loading } from '../Common';
import './Resume.css';

type TemplateType = 'professional' | 'modern' | 'minimal';

interface ExportOptions {
  includePhoto: boolean;
  includeContact: boolean;
  includeSkills: boolean;
  includeExperience: boolean;
  includeEducation: boolean;
  includeCertifications: boolean;
  includeSummary: boolean;
}

const ResumeExport: React.FC = () => {
  const { profile } = useAuth();
  const resumeRef = useRef<HTMLDivElement>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [options, setOptions] = useState<ExportOptions>({
    includePhoto: true,
    includeContact: true,
    includeSkills: true,
    includeExperience: true,
    includeEducation: true,
    includeCertifications: true,
    includeSummary: true,
  });

  const handleOptionChange = (key: keyof ExportOptions) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExportPDF = async () => {
    if (!profile) return;

    setIsGenerating(true);

    try {
      // Dynamic import of html2pdf.js
      const html2pdf = (await import('html2pdf.js')).default;

      const element = resumeRef.current;
      if (!element) {
        throw new Error('Resume element not found');
      }

      const opt = {
        margin: 0,
        filename: `${profile.firstName}_${profile.lastName}_Resume.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();

    } catch (err) {
      console.error('Failed to generate PDF:', err);
      // Fallback: open print dialog
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  if (!profile) {
    return (
      <div className="resume-export">
        <div className="export-card">
          <p>Please sign in to export your resume.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="resume-export">
      <div className="export-card">
        <div className="export-header">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h2>Export Resume</h2>
          <p>Download your professional resume in PDF format</p>
        </div>

        <div className="template-options">
          <div
            className={`template-option ${selectedTemplate === 'professional' ? 'selected' : ''}`}
            onClick={() => setSelectedTemplate('professional')}
          >
            <div className="template-preview">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="4" y="2" width="16" height="20" rx="1"></rect>
                <line x1="8" y1="6" x2="16" y2="6"></line>
                <line x1="8" y1="10" x2="16" y2="10"></line>
                <line x1="8" y1="14" x2="12" y2="14"></line>
              </svg>
            </div>
            <h4>Professional</h4>
            <p>Clean and traditional</p>
          </div>

          <div
            className={`template-option ${selectedTemplate === 'modern' ? 'selected' : ''}`}
            onClick={() => setSelectedTemplate('modern')}
          >
            <div className="template-preview">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="4" y="2" width="16" height="20" rx="1"></rect>
                <rect x="6" y="4" width="4" height="4" rx="1"></rect>
                <line x1="12" y1="5" x2="18" y2="5"></line>
                <line x1="12" y1="8" x2="16" y2="8"></line>
                <line x1="6" y1="12" x2="18" y2="12"></line>
              </svg>
            </div>
            <h4>Modern</h4>
            <p>Contemporary design</p>
          </div>

          <div
            className={`template-option ${selectedTemplate === 'minimal' ? 'selected' : ''}`}
            onClick={() => setSelectedTemplate('minimal')}
          >
            <div className="template-preview">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="4" y="2" width="16" height="20" rx="1"></rect>
                <line x1="8" y1="8" x2="16" y2="8"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
                <line x1="8" y1="16" x2="14" y2="16"></line>
              </svg>
            </div>
            <h4>Minimal</h4>
            <p>Simple and elegant</p>
          </div>
        </div>

        <div className="export-options">
          <h3>Include in Resume:</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={options.includeContact}
                onChange={() => handleOptionChange('includeContact')}
              />
              Contact Information
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.includeSummary}
                onChange={() => handleOptionChange('includeSummary')}
              />
              Professional Summary
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.includeSkills}
                onChange={() => handleOptionChange('includeSkills')}
              />
              Skills
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.includeExperience}
                onChange={() => handleOptionChange('includeExperience')}
              />
              Work Experience
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.includeEducation}
                onChange={() => handleOptionChange('includeEducation')}
              />
              Education
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.includeCertifications}
                onChange={() => handleOptionChange('includeCertifications')}
              />
              Certifications
            </label>
          </div>
        </div>

        <div className="export-actions">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleExportPDF}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loading size="small" /> Generating PDF...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hidden PDF Template */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div ref={resumeRef} className="resume-pdf">
          {/* Header */}
          <div className="resume-pdf-header">
            <h1>{profile.firstName} {profile.lastName}</h1>
            {options.includeSummary && profile.headline && (
              <div className="headline">{profile.headline}</div>
            )}
            {options.includeContact && (
              <div className="resume-pdf-contact">
                {profile.email && <span>{profile.email}</span>}
                {profile.phone && <span>{profile.phone}</span>}
                {profile.location && <span>{profile.location}</span>}
                {profile.linkedIn && <span>LinkedIn</span>}
                {profile.website && <span>{profile.website}</span>}
              </div>
            )}
          </div>

          {/* Summary */}
          {options.includeSummary && profile.bio && (
            <div className="resume-pdf-section">
              <h2>Professional Summary</h2>
              <p>{profile.bio}</p>
            </div>
          )}

          {/* Skills */}
          {options.includeSkills && profile.skills && profile.skills.length > 0 && (
            <div className="resume-pdf-section">
              <h2>Skills</h2>
              <div className="resume-pdf-skills">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="skill">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {options.includeExperience && profile.experience && profile.experience.length > 0 && (
            <div className="resume-pdf-section">
              <h2>Work Experience</h2>
              {profile.experience.map((exp, index) => (
                <div key={index} className="resume-pdf-item">
                  <h3>
                    {exp.title}
                    <span className="dates">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </h3>
                  <div className="subtitle">{exp.company}{exp.location && `, ${exp.location}`}</div>
                  {exp.description && <p>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {options.includeEducation && profile.education && profile.education.length > 0 && (
            <div className="resume-pdf-section">
              <h2>Education</h2>
              {profile.education.map((edu, index) => (
                <div key={index} className="resume-pdf-item">
                  <h3>
                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    {(edu.startDate || edu.endDate) && (
                      <span className="dates">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    )}
                  </h3>
                  <div className="subtitle">{edu.institution}</div>
                  {edu.description && <p>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {options.includeCertifications && profile.certifications && profile.certifications.length > 0 && (
            <div className="resume-pdf-section">
              <h2>Certifications</h2>
              {profile.certifications.map((cert, index) => (
                <div key={index} className="resume-pdf-item">
                  <h3>
                    {cert.name}
                    {cert.issueDate && <span className="dates">{formatDate(cert.issueDate)}</span>}
                  </h3>
                  <div className="subtitle">{cert.issuingOrganization}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeExport;
