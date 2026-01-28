const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand } = require('@aws-sdk/client-cognito-identity-provider');

const ADMIN_EMAIL_DOMAIN = '@nextonnect.com';
const VERSION = '2.0.0'; // Version to verify deployment

// Check if the caller is an admin
const isAdminUser = (email) => {
  return email && email.toLowerCase().endsWith(ADMIN_EMAIL_DOMAIN);
};

// Extract caller email from AppSync event identity
const getCallerEmail = (event) => {
  // Log the full event and identity for debugging
  console.log('=== ADMIN USER MANAGER v' + VERSION + ' ===');
  console.log('Full event:', JSON.stringify(event, null, 2));
  console.log('Identity object:', JSON.stringify(event.identity, null, 2));

  const identity = event.identity || {};

  // Try multiple paths where email might be located
  // Path 1: Direct claims.email
  if (identity.claims?.email) {
    console.log('Found email at claims.email:', identity.claims.email);
    return identity.claims.email;
  }

  // Path 2: Username (if email is used as username)
  if (identity.username && identity.username.includes('@')) {
    console.log('Found email at username:', identity.username);
    return identity.username;
  }

  // Path 3: Claims with cognito:username
  if (identity.claims?.['cognito:username']) {
    const username = identity.claims['cognito:username'];
    if (username.includes('@')) {
      console.log('Found email at cognito:username:', username);
      return username;
    }
  }

  // Path 4: Check sub and try to get from username (AppSync sometimes uses sub)
  if (identity.sub) {
    console.log('Found sub:', identity.sub);
    // Sub is usually a UUID, but let's check if username is available elsewhere
  }

  // Path 5: Direct identity.email
  if (identity.email) {
    console.log('Found email at identity.email:', identity.email);
    return identity.email;
  }

  // Path 6: Check if claims is a string (JWT token) that needs parsing
  if (typeof identity.claims === 'string') {
    try {
      const parsed = JSON.parse(identity.claims);
      if (parsed.email) {
        console.log('Found email in parsed claims:', parsed.email);
        return parsed.email;
      }
    } catch (e) {
      console.log('Could not parse claims string');
    }
  }

  console.log('Could not extract email from identity');
  return null;
};

exports.handler = async (event) => {
  console.log('=== ADMIN USER MANAGER HANDLER v' + VERSION + ' ===');

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
    const callerEmail = getCallerEmail(event);
    console.log('Extracted caller email:', callerEmail);

    if (!callerEmail) {
      return {
        success: false,
        message: `[v${VERSION}] Unable to determine caller identity. Please ensure you are logged in. Check CloudWatch logs for details.`,
        userId: null
      };
    }

    if (!isAdminUser(callerEmail)) {
      return {
        success: false,
        message: `[v${VERSION}] Unauthorized: Only admin users (@nextonnect.com) can create new users. Your email: ${callerEmail}`,
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
