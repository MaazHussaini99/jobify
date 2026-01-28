const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand } = require('@aws-sdk/client-cognito-identity-provider');

const ADMIN_EMAIL_DOMAIN = '@nextonnect.com';

// Check if the caller is an admin
const isAdminUser = (email) => {
  return email && email.toLowerCase().endsWith(ADMIN_EMAIL_DOMAIN);
};

exports.handler = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));

  try {
    // Get the input from the GraphQL mutation
    const { input } = event.arguments || {};

    if (!input) {
      return {
        success: false,
        message: 'No input provided',
        userId: null
      };
    }

    const { email, firstName, lastName, userType, temporaryPassword } = input;

    // Validate required fields
    if (!email || !firstName || !lastName || !userType || !temporaryPassword) {
      return {
        success: false,
        message: 'Missing required fields: email, firstName, lastName, userType, temporaryPassword',
        userId: null
      };
    }

    // Check if the caller is an admin (from the identity context)
    const callerEmail = event.identity?.claims?.email;
    console.log('Caller email:', callerEmail);

    if (!isAdminUser(callerEmail)) {
      return {
        success: false,
        message: 'Unauthorized: Only admin users can create new users',
        userId: null
      };
    }

    // Validate password meets requirements
    if (temporaryPassword.length < 8) {
      return {
        success: false,
        message: 'Password must be at least 8 characters long',
        userId: null
      };
    }

    // Create Cognito client
    const cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.REGION || 'us-east-1'
    });

    const userPoolId = process.env.USER_POOL_ID;

    if (!userPoolId) {
      console.error('USER_POOL_ID environment variable not set');
      return {
        success: false,
        message: 'Server configuration error: User Pool ID not configured',
        userId: null
      };
    }

    console.log('Creating user in pool:', userPoolId);

    // Create the user with a temporary password
    const createUserCommand = new AdminCreateUserCommand({
      UserPoolId: userPoolId,
      Username: email,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'given_name', Value: firstName },
        { Name: 'family_name', Value: lastName }
      ],
      TemporaryPassword: temporaryPassword,
      MessageAction: 'SUPPRESS', // We'll handle sending the email ourselves or show in UI
      DesiredDeliveryMediums: ['EMAIL']
    });

    const createUserResponse = await cognitoClient.send(createUserCommand);
    console.log('User created:', JSON.stringify(createUserResponse, null, 2));

    const userId = createUserResponse.User?.Username;

    // Note: The user will be in FORCE_CHANGE_PASSWORD status
    // They will need to change their password on first login

    return {
      success: true,
      message: `User ${email} created successfully. They will be required to change their password on first login.`,
      userId: userId
    };

  } catch (error) {
    console.error('Error creating user:', error);

    // Handle specific Cognito errors
    if (error.name === 'UsernameExistsException') {
      return {
        success: false,
        message: 'A user with this email already exists',
        userId: null
      };
    }

    if (error.name === 'InvalidPasswordException') {
      return {
        success: false,
        message: 'Password does not meet requirements. Must include uppercase, lowercase, number, and special character.',
        userId: null
      };
    }

    if (error.name === 'InvalidParameterException') {
      return {
        success: false,
        message: `Invalid parameter: ${error.message}`,
        userId: null
      };
    }

    return {
      success: false,
      message: error.message || 'Failed to create user',
      userId: null
    };
  }
};
