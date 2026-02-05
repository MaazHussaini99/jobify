// api/auth.js - Vercel Serverless Function for GitHub OAuth

const simpleOauthModule = require('simple-oauth2');

module.exports = async (req, res) => {
  const {
    OAUTH_CLIENT_ID: clientId,
    OAUTH_CLIENT_SECRET: clientSecret,
  } = process.env;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Missing OAuth credentials' });
  }

  const oauth2 = simpleOauthModule.create({
    client: {
      id: clientId,
      secret: clientSecret,
    },
    auth: {
      tokenHost: 'https://github.com',
      tokenPath: '/login/oauth/access_token',
      authorizePath: '/login/oauth/authorize',
    },
  });

  const { code, provider, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    const tokenParams = {
      code,
      redirect_uri: req.headers.referer,
    };

    const result = await oauth2.authorizationCode.getToken(tokenParams);
    const token = oauth2.accessToken.create(result);

    const responseBody = {
      token: token.token.access_token,
      provider: provider || 'github',
    };

    res.status(200).send(
      `<!doctype html><html><body><script>
        (function() {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify(responseBody)}',
            window.location.origin
          );
          window.close();
        })()
      </script></body></html>`
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
