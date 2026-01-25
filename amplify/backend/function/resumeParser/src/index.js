const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const pdfParse = require('pdf-parse');

// Configure Bedrock client with external AWS account credentials if provided
const getBedrockClient = () => {
  const config = {
    region: process.env.BEDROCK_REGION || 'us-east-1'
  };

  // Use external account credentials if provided
  if (process.env.BEDROCK_ACCESS_KEY_ID && process.env.BEDROCK_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: process.env.BEDROCK_ACCESS_KEY_ID,
      secretAccessKey: process.env.BEDROCK_SECRET_ACCESS_KEY
    };
    console.log('Using external AWS account for Bedrock');
  }

  return new BedrockRuntimeClient(config);
};

const RESUME_PARSING_PROMPT = `You are an expert resume parser. Analyze the following resume content and extract structured information. Return ONLY a valid JSON object with no additional text or explanation.

Extract the following fields (use null for any field you cannot find):
{
  "firstName": "string or null",
  "lastName": "string or null",
  "email": "string or null",
  "phone": "string or null",
  "location": "string (city, state/country) or null",
  "headline": "string (professional title/headline) or null",
  "bio": "string (professional summary, max 500 chars) or null",
  "linkedIn": "string (full URL) or null",
  "github": "string (full URL) or null",
  "website": "string (full URL) or null",
  "skills": [
    {
      "name": "string",
      "level": "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT",
      "yearsOfExperience": number or null
    }
  ],
  "experience": [
    {
      "id": "unique string",
      "title": "string",
      "company": "string",
      "location": "string or null",
      "startDate": "YYYY-MM or Month YYYY",
      "endDate": "YYYY-MM or Month YYYY or null if current",
      "current": boolean,
      "description": "string (job responsibilities, max 1000 chars)"
    }
  ],
  "education": [
    {
      "id": "unique string",
      "institution": "string",
      "degree": "string",
      "fieldOfStudy": "string or null",
      "startDate": "YYYY or null",
      "endDate": "YYYY or null",
      "description": "string or null"
    }
  ],
  "certifications": [
    {
      "id": "unique string",
      "name": "string",
      "issuingOrganization": "string",
      "issueDate": "YYYY-MM or YYYY or null",
      "expirationDate": "YYYY-MM or YYYY or null",
      "credentialId": "string or null",
      "credentialUrl": "string or null"
    }
  ]
}

RESUME CONTENT:
`;

exports.handler = async (event) => {
  console.log('Resume parser invoked with event:', JSON.stringify(event, null, 2));

  // AppSync @function directive sends arguments directly in event.arguments
  // Also handle API Gateway format for testing
  let content, fileType;

  if (event.arguments) {
    // AppSync @function format
    content = event.arguments.content;
    fileType = event.arguments.fileType;
  } else if (event.body) {
    // API Gateway format
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    content = body.content;
    fileType = body.fileType;
  } else {
    // Direct invocation
    content = event.content;
    fileType = event.fileType;
  }

  if (!content) {
    console.error('No content provided');
    return {
      parseError: 'Resume content is required'
    };
  }

  console.log('Processing resume content, length:', content.length, 'fileType:', fileType);

  try {
    // Check if content is base64 (PDF uploaded as data URL)
    let textContent = content;

    if (content.startsWith('data:')) {
      // Extract base64 data and media type
      const matches = content.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        const mediaType = matches[1];
        const base64Data = matches[2];

        console.log('Detected base64 content, media type:', mediaType);

        // For PDFs, extract text using pdf-parse
        if (mediaType === 'application/pdf') {
          try {
            const pdfBuffer = Buffer.from(base64Data, 'base64');
            const pdfData = await pdfParse(pdfBuffer);
            textContent = pdfData.text;
            console.log('Extracted text from PDF, length:', textContent.length);
          } catch (pdfError) {
            console.error('Failed to parse PDF:', pdfError.message);
            return {
              skills: [],
              experience: [],
              education: [],
              certifications: [],
              parseError: 'Failed to extract text from PDF. Please try uploading a text-based resume.'
            };
          }
        } else {
          // For other base64 content, try to decode as text
          try {
            textContent = Buffer.from(base64Data, 'base64').toString('utf-8');
          } catch (e) {
            console.log('Could not decode base64 as text, using raw');
          }
        }
      }
    }

    // Prepare the prompt with extracted text
    const messageContent = RESUME_PARSING_PROMPT + textContent;

    console.log('Calling Bedrock with text content, length:', messageContent.length);

    // Call Amazon Bedrock with Claude using cross-region inference profile
    const command = new InvokeModelCommand({
      modelId: 'us.anthropic.claude-3-haiku-20240307-v1:0', // Using inference profile for on-demand
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: messageContent
          }
        ],
        temperature: 0.1 // Low temperature for consistent parsing
      })
    });

    const bedrockClient = getBedrockClient();
    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    console.log('Bedrock response received');

    // Extract the text content from Claude's response
    const assistantMessage = responseBody.content?.[0]?.text || '';

    console.log('Assistant message length:', assistantMessage.length);

    // Parse the JSON from the response
    let parsedResume;
    try {
      // Try to extract JSON from the response (Claude might include some text around it)
      const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResume = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed JSON from response');
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Bedrock response as JSON:', parseError);
      console.log('Raw response:', assistantMessage.substring(0, 500));

      // Return a minimal structure if parsing fails
      return {
        skills: [],
        experience: [],
        education: [],
        certifications: [],
        parseError: 'Failed to fully parse resume. Please review and update manually.'
      };
    }

    // Ensure all arrays exist and filter out null/invalid entries
    parsedResume.skills = (parsedResume.skills || []).filter(s => s && s.name);
    parsedResume.experience = (parsedResume.experience || []).filter(e => e && e.title);
    parsedResume.education = (parsedResume.education || []).filter(e => e && e.institution);
    parsedResume.certifications = (parsedResume.certifications || []).filter(c => c && c.name);

    // Add unique IDs if missing and ensure required fields
    parsedResume.experience = parsedResume.experience.map((exp, idx) => ({
      ...exp,
      id: exp.id || `exp-${Date.now()}-${idx}`,
      title: exp.title || 'Unknown Position',
      company: exp.company || 'Unknown Company'
    }));

    parsedResume.education = parsedResume.education.map((edu, idx) => ({
      ...edu,
      id: edu.id || `edu-${Date.now()}-${idx}`,
      institution: edu.institution || 'Unknown Institution',
      degree: edu.degree || 'Unknown Degree'
    }));

    parsedResume.certifications = parsedResume.certifications.map((cert, idx) => ({
      ...cert,
      id: cert.id || `cert-${Date.now()}-${idx}`,
      name: cert.name || 'Unknown Certification',
      issuingOrganization: cert.issuingOrganization || 'Unknown'
    }));

    console.log('Returning parsed resume with', parsedResume.skills?.length, 'skills,',
      parsedResume.experience?.length, 'experiences,',
      parsedResume.education?.length, 'education entries');

    // Return the data directly for AppSync
    return parsedResume;

  } catch (error) {
    console.error('Error calling Bedrock:', error.name, error.message);

    // Check if it's an access denied error
    if (error.name === 'AccessDeniedException') {
      return {
        skills: [],
        experience: [],
        education: [],
        certifications: [],
        parseError: 'Bedrock access not configured. Please enable Claude model access in AWS Bedrock console.'
      };
    }

    return {
      skills: [],
      experience: [],
      education: [],
      certifications: [],
      parseError: error.message || 'Failed to parse resume'
    };
  }
};
