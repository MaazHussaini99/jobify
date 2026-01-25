// Resume Parser Service
// This service handles parsing resume content and extracting structured data

export interface ParsedResumeData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  headline?: string;
  bio?: string;
  skills?: { name: string; level?: string; yearsOfExperience?: number }[];
  experience?: {
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
  }[];
  education?: {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];
  certifications?: {
    id: string;
    name: string;
    issuingOrganization: string;
    issueDate?: string;
    expirationDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }[];
  linkedIn?: string;
  github?: string;
  website?: string;
}

// Common skill keywords to look for
const SKILL_KEYWORDS = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'PHP', 'Swift', 'Kotlin',
  // Frameworks
  'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Rails', 'Next.js',
  // Databases
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB', 'Firebase',
  // Cloud
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD',
  // Tools
  'Git', 'Jira', 'Figma', 'Photoshop', 'Excel', 'Tableau', 'Power BI',
  // Soft skills
  'Leadership', 'Communication', 'Problem Solving', 'Project Management', 'Agile', 'Scrum',
  // Other technical
  'Machine Learning', 'AI', 'Data Science', 'DevOps', 'REST API', 'GraphQL', 'Microservices',
  // Safety/Construction (based on user's context)
  'OSHA', 'Safety Management', 'Risk Assessment', 'Quality Control', 'Compliance'
];

// Education degree patterns
const DEGREE_PATTERNS = [
  /(?:Bachelor|B\.?S\.?|B\.?A\.?|BS|BA)\s*(?:of|in)?\s*(?:Science|Arts)?\s*(?:in)?\s*([\w\s]+)/i,
  /(?:Master|M\.?S\.?|M\.?A\.?|MS|MA|MBA)\s*(?:of|in)?\s*(?:Science|Arts|Business)?\s*(?:in)?\s*([\w\s]+)/i,
  /(?:Ph\.?D\.?|Doctor)\s*(?:of|in)?\s*([\w\s]+)/i,
  /(?:Associate|A\.?S\.?|A\.?A\.?)\s*(?:of|in)?\s*(?:Science|Arts)?\s*(?:in)?\s*([\w\s]+)/i,
];

// Date patterns
const DATE_PATTERNS = [
  /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}/gi,
  /\d{1,2}\/\d{4}/g,
  /\d{4}\s*-\s*(?:\d{4}|present|current)/gi,
];

export const parseResume = async (content: string, fileType?: string): Promise<ParsedResumeData> => {
  // Try to call the AI parsing API first
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/parse-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, fileType }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.log('AI parsing unavailable, using fallback parser');
  }

  // Fallback to client-side parsing
  return parseResumeLocally(content);
};

export const parseResumeLocally = (content: string): ParsedResumeData => {
  const data: ParsedResumeData = {
    skills: [],
    experience: [],
    education: [],
    certifications: []
  };

  // Clean up the content
  const cleanContent = content
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/\s+/g, ' ');

  const lines = content.split('\n').map(line => line.trim()).filter(line => line);

  // Extract email
  const emailMatch = cleanContent.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) {
    data.email = emailMatch[0].toLowerCase();
  }

  // Extract phone
  const phoneMatch = cleanContent.match(/(\+?1?[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    data.phone = phoneMatch[0];
  }

  // Extract LinkedIn
  const linkedInMatch = cleanContent.match(/(?:linkedin\.com\/in\/|linkedin:\s*)([\w-]+)/i);
  if (linkedInMatch) {
    data.linkedIn = `https://linkedin.com/in/${linkedInMatch[1]}`;
  }

  // Extract GitHub
  const githubMatch = cleanContent.match(/(?:github\.com\/|github:\s*)([\w-]+)/i);
  if (githubMatch) {
    data.github = `https://github.com/${githubMatch[1]}`;
  }

  // Extract website
  const websiteMatch = cleanContent.match(/(?:website|portfolio|web):\s*(https?:\/\/[\w.-]+\.\w+[\w/]*)/i);
  if (websiteMatch) {
    data.website = websiteMatch[1];
  }

  // Try to extract name from first line(s)
  const potentialName = lines[0];
  if (potentialName && !potentialName.includes('@') && potentialName.length < 50) {
    const nameParts = potentialName.split(/\s+/);
    if (nameParts.length >= 2 && nameParts.length <= 4) {
      data.firstName = nameParts[0];
      data.lastName = nameParts.slice(1).join(' ');
    }
  }

  // Extract skills
  const foundSkills: Set<string> = new Set();
  SKILL_KEYWORDS.forEach(skill => {
    const regex = new RegExp(`\\b${skill}\\b`, 'i');
    if (regex.test(cleanContent)) {
      foundSkills.add(skill);
    }
  });
  data.skills = Array.from(foundSkills).map(name => ({
    name,
    level: 'INTERMEDIATE',
    yearsOfExperience: 1
  }));

  // Extract experience (look for common section headers)
  const experienceSection = extractSection(content, ['experience', 'work history', 'employment', 'professional experience']);
  if (experienceSection) {
    data.experience = parseExperienceSection(experienceSection);
  }

  // Extract education
  const educationSection = extractSection(content, ['education', 'academic', 'qualifications']);
  if (educationSection) {
    data.education = parseEducationSection(educationSection);
  }

  // Extract certifications
  const certSection = extractSection(content, ['certifications', 'certificates', 'credentials', 'licenses']);
  if (certSection) {
    data.certifications = parseCertificationsSection(certSection);
  }

  // Try to extract summary/bio
  const summarySection = extractSection(content, ['summary', 'objective', 'profile', 'about']);
  if (summarySection) {
    const summaryLines = summarySection.split('\n').filter(l => l.trim());
    if (summaryLines.length > 0) {
      data.bio = summaryLines.slice(0, 3).join(' ').substring(0, 500);
    }
  }

  // Extract location from content
  const locationPatterns = [
    /(?:location|address|based in|located in):\s*([^,\n]+(?:,\s*[A-Z]{2})?)/i,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Z]{2}\s*\d{5})/,
    /([A-Z][a-z]+,\s*[A-Z]{2})/
  ];

  for (const pattern of locationPatterns) {
    const match = cleanContent.match(pattern);
    if (match) {
      data.location = match[1].trim();
      break;
    }
  }

  return data;
};

const extractSection = (content: string, headers: string[]): string | null => {
  const lines = content.split('\n');
  let startIndex = -1;
  let endIndex = lines.length;

  // Find section start
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase().trim();
    if (headers.some(header => line.includes(header) && line.length < 50)) {
      startIndex = i + 1;
      break;
    }
  }

  if (startIndex === -1) return null;

  // Find section end (next section header)
  const allHeaders = ['experience', 'education', 'skills', 'certifications', 'projects', 'summary', 'references'];
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].toLowerCase().trim();
    if (allHeaders.some(h => line.includes(h) && !headers.includes(h) && line.length < 50)) {
      endIndex = i;
      break;
    }
  }

  return lines.slice(startIndex, endIndex).join('\n');
};

const parseExperienceSection = (section: string): ParsedResumeData['experience'] => {
  const experiences: ParsedResumeData['experience'] = [];
  const lines = section.split('\n').filter(l => l.trim());

  let currentExp: any = null;
  let descriptionLines: string[] = [];

  for (const line of lines) {
    // Check if this is a new job entry (usually has a date)
    const hasDate = DATE_PATTERNS.some(p => p.test(line));
    const isTitle = line.length < 100 && !line.startsWith('-') && !line.startsWith('•');

    if ((hasDate || (isTitle && /(?:manager|engineer|developer|analyst|director|specialist|coordinator|lead|senior|junior)/i.test(line))) && line.length < 100) {
      // Save previous experience
      if (currentExp) {
        currentExp.description = descriptionLines.join(' ').substring(0, 1000);
        experiences.push(currentExp);
        descriptionLines = [];
      }

      // Parse dates
      const dateMatch = line.match(/(\w+\s*\d{4})\s*[-–]\s*(\w+\s*\d{4}|present|current)/i);

      currentExp = {
        id: `exp-${Date.now()}-${experiences.length}`,
        title: line.replace(/\d{4}.*$/, '').replace(/[-–].*$/, '').trim(),
        company: '',
        startDate: dateMatch ? dateMatch[1] : '',
        endDate: dateMatch ? (dateMatch[2].toLowerCase() === 'present' || dateMatch[2].toLowerCase() === 'current' ? undefined : dateMatch[2]) : undefined,
        current: dateMatch ? dateMatch[2].toLowerCase() === 'present' || dateMatch[2].toLowerCase() === 'current' : false,
        description: ''
      };
    } else if (currentExp && !currentExp.company && line.length < 80 && !line.startsWith('-') && !line.startsWith('•')) {
      // This might be the company name
      currentExp.company = line.trim();
    } else if (currentExp && (line.startsWith('-') || line.startsWith('•') || line.length > 50)) {
      // This is description
      descriptionLines.push(line.replace(/^[-•]\s*/, '').trim());
    }
  }

  // Don't forget the last one
  if (currentExp) {
    currentExp.description = descriptionLines.join(' ').substring(0, 1000);
    experiences.push(currentExp);
  }

  return experiences;
};

const parseEducationSection = (section: string): ParsedResumeData['education'] => {
  const educations: ParsedResumeData['education'] = [];
  const lines = section.split('\n').filter(l => l.trim());

  let currentEdu: any = null;

  for (const line of lines) {
    // Check for degree patterns
    let degreeMatch = null;
    for (const pattern of DEGREE_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        degreeMatch = match;
        break;
      }
    }

    if (degreeMatch) {
      if (currentEdu) {
        educations.push(currentEdu);
      }

      currentEdu = {
        id: `edu-${Date.now()}-${educations.length}`,
        degree: degreeMatch[0].trim(),
        fieldOfStudy: degreeMatch[1]?.trim() || '',
        institution: '',
        startDate: '',
        endDate: ''
      };
    } else if (currentEdu && !currentEdu.institution && line.length < 100) {
      // Check if it's a university/college name
      if (/university|college|institute|school/i.test(line)) {
        currentEdu.institution = line.trim();
      }
    }

    // Try to extract dates
    if (currentEdu) {
      const yearMatch = line.match(/(\d{4})\s*[-–]\s*(\d{4})/);
      if (yearMatch) {
        currentEdu.startDate = yearMatch[1];
        currentEdu.endDate = yearMatch[2];
      }
    }
  }

  if (currentEdu) {
    educations.push(currentEdu);
  }

  return educations;
};

const parseCertificationsSection = (section: string): ParsedResumeData['certifications'] => {
  const certifications: ParsedResumeData['certifications'] = [];
  const lines = section.split('\n').filter(l => l.trim());

  for (const line of lines) {
    if (line.length > 10 && line.length < 150 && !line.startsWith('-')) {
      const yearMatch = line.match(/\d{4}/);

      certifications.push({
        id: `cert-${Date.now()}-${certifications.length}`,
        name: line.replace(/\d{4}.*$/, '').replace(/[-–].*$/, '').trim(),
        issuingOrganization: 'See certificate',
        issueDate: yearMatch ? yearMatch[0] : undefined
      });
    }
  }

  return certifications;
};

export default { parseResume, parseResumeLocally };
