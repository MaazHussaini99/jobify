// AWS Amplify Configuration
// This configuration will be automatically populated when you run `amplify init`
// For now, we're setting up the structure for local development

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID || 'YOUR_USER_POOL_ID',
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || 'YOUR_USER_POOL_CLIENT_ID',
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID || 'YOUR_IDENTITY_POOL_ID',
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code' as const,
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'YOUR_GRAPHQL_ENDPOINT',
      region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
      defaultAuthMode: 'userPool' as const,
    },
  },
  Storage: {
    S3: {
      bucket: process.env.REACT_APP_S3_BUCKET || 'YOUR_S3_BUCKET',
      region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
    },
  },
};

export default amplifyConfig;
