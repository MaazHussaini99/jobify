const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminGetUserCommand } = require('@aws-sdk/client-cognito-identity-provider');

const ADMIN_EMAIL_DOMAIN = '@nextonnect.com';
const VERSION = '3.0.0'; // Version to verify deployment

// Check if the caller is an admin
const isAdminUser = (email) => {
  return email && email.toLowerCase().endsWith(ADMIN_EMAIL_DOMAIN);
};

// Get caller's email by looking up user in Cognito using sub
const getCallerEmailFromCognito = async (cognitoClient, userPoolId, sub) => {
  try {
    console.log('Looking up user in Cognito by sub:', sub);

    const command = new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: sub
    });

    const response = await cognitoClient.send(command);
    console.log('AdminGetUser response:', JSON.stringify(response, null, 2));

    // Find email in user attributes
    const emailAttr = response.UserAttributes?.find(attr => attr.Name === 'email');
    if (emailAttr) {
      console.log('Found email from Cognito:', emailAttr.Value);
      return emailAttr.Value;
    }

    console.log('Email not found in user attributes');
    return null;
  } catch (error) {
    console.error('Error looking up user in Cognito:', error);
    return null;
  }
};

// Extract caller email from AppSync event identity
const getCallerEmail = (event) => {
  console.log('=== ADMIN USER MANAGER v' + VERSION + ' ===');
  console.log('Identity object:', JSON.stringify(event.identity, null, 2));

  const identity = event.identity || {};

  // Try direct email paths first
  if (identity.claims?.email) {
    console.log('Found email at claims.email:', identity.claims.email);
    return identity.claims.email;
  }

  if (identity.username && identity.username.includes('@')) {
    console.log('Found email at username:', identity.username);
    return identity.username;
  }

  if (identity.email) {
    console.log('Found email at identity.email:', identity.email);
    return identity.email;
  }

  // Return sub for Cognito lookup (will be done later with cognitoClient)
  if (identity.sub) {
    console.log('Found sub, will need Cognito lookup:', identity.sub);
    return { needsCognitoLookup: true, sub: identity.sub };
  }

  console.log('Could not extract email from identity');
  return null;
};

exports.handler = async (event) => {
  console.log('=== ADMIN USER MANAGER HANDLER v' + VERSION + ' ===');

  try {
    const { input } = event.arguments || {};

    if (!input) {
      return {
        success: false,
        message: `[v${VERSION}] No input provided`,
        userId: null
      };
    }

    const { email, firstName, lastName, userType, temporaryPassword } = input;

    if (!email || !firstName || !lastName || !userType || !temporaryPassword) {
      return {
        success: false,
        message: `[v${VERSION}] Missing required fields`,
        userId: null
      };
    }

    // Create Cognito client
    const cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.REGION || 'us-east-1'
    });

    const userPoolId = process.env.USER_POOL_ID;

    if (!userPoolId) {
      return {
        success: false,
        message: `[v${VERSION}] Server configuration error: User Pool ID not configured`,
        userId: null
      };
    }

    // Get caller email - may require Cognito lookup
    let callerEmail = getCallerEmail(event);

    // If we only have sub, look up email from Cognito
    if (callerEmail && callerEmail.needsCognitoLookup) {
      callerEmail = await getCallerEmailFromCognito(cognitoClient, userPoolId, callerEmail.sub);
    }

    console.log('Final caller email:', callerEmail);

    if (!callerEmail) {
      return {
        success: false,
        message: `[v${VERSION}] Unable to determine caller identity. Please ensure you are logged in.`,
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

    if (temporaryPassword.length < 8) {
      return {
        success: false,
        message: `[v${VERSION}] Password must be at least 8 characters long`,
        userId: null
      };
    }

    console.log('Creating user in pool:', userPoolId);

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
      MessageAction: 'SUPPRESS',
      DesiredDeliveryMediums: ['EMAIL']
    });

    const createUserResponse = await cognitoClient.send(createUserCommand);
    console.log('User created:', JSON.stringify(createUserResponse, null, 2));

    const userId = createUserResponse.User?.Username;

    return {
      success: true,
      message: `[v${VERSION}] User ${email} created successfully. They will be required to change their password on first login.`,
      userId: userId
    };

  } catch (error) {
    console.error('Error:', error);

    if (error.name === 'UsernameExistsException') {
      return {
        success: false,
        message: `[v${VERSION}] A user with this email already exists`,
        userId: null
      };
    }

    if (error.name === 'InvalidPasswordException') {
      return {
        success: false,
        message: `[v${VERSION}] Password does not meet requirements. Must include uppercase, lowercase, number, and special character.`,
        userId: null
      };
    }

    return {
      success: false,
      message: `[v${VERSION}] ${error.message || 'Failed to create user'}`,
      userId: null
    };
  }
};
