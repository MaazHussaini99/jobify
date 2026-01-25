const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });

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

  // Handle different event sources (API Gateway, direct invocation, etc.)
  let body;
  if (event.body) {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  } else {
    body = event;
  }

  const { content, fileType } = body;

  if (!content) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({ error: 'Resume content is required' })
    };
  }

  try {
    // Prepare the prompt for Claude
    const fullPrompt = RESUME_PARSING_PROMPT + content;

    // Call Amazon Bedrock with Claude
    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-haiku-20240307-v1:0', // Using Haiku for cost efficiency
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: fullPrompt
          }
        ],
        temperature: 0.1 // Low temperature for consistent parsing
      })
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    console.log('Bedrock response:', JSON.stringify(responseBody, null, 2));

    // Extract the text content from Claude's response
    const assistantMessage = responseBody.content?.[0]?.text || '';

    // Parse the JSON from the response
    let parsedResume;
    try {
      // Try to extract JSON from the response (Claude might include some text around it)
      const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResume = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Bedrock response as JSON:', parseError);
      console.log('Raw response:', assistantMessage);

      // Return a minimal structure if parsing fails
      parsedResume = {
        skills: [],
        experience: [],
        education: [],
        certifications: [],
        parseError: 'Failed to fully parse resume. Please review and update manually.'
      };
    }

    // Ensure all arrays exist
    parsedResume.skills = parsedResume.skills || [];
    parsedResume.experience = parsedResume.experience || [];
    parsedResume.education = parsedResume.education || [];
    parsedResume.certifications = parsedResume.certifications || [];

    // Add unique IDs if missing
    parsedResume.experience = parsedResume.experience.map((exp, idx) => ({
      ...exp,
      id: exp.id || `exp-${Date.now()}-${idx}`
    }));

    parsedResume.education = parsedResume.education.map((edu, idx) => ({
      ...edu,
      id: edu.id || `edu-${Date.now()}-${idx}`
    }));

    parsedResume.certifications = parsedResume.certifications.map((cert, idx) => ({
      ...cert,
      id: cert.id || `cert-${Date.now()}-${idx}`
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify(parsedResume)
    };

  } catch (error) {
    console.error('Error calling Bedrock:', error);

    // Check if it's an access denied error
    if (error.name === 'AccessDeniedException') {
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify({
          error: 'Bedrock access not configured. Please enable Claude model access in AWS Bedrock console.',
          fallback: true
        })
      };
    }

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({
        error: error.message || 'Failed to parse resume',
        fallback: true
      })
    };
  }
};
