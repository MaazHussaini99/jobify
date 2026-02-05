# Deploy OAuth Provider to Vercel

## Steps to Deploy

1. **Create a new Vercel project** for the OAuth provider (separate from your main site)

2. **Create these files in a new repository**:

```
my-oauth-provider/
├── api/
│   └── auth.js        (Use code from VERCEL_OAUTH_FUNCTION.js)
├── package.json
└── vercel.json
```

3. **package.json**:
```json
{
  "name": "decap-oauth-provider",
  "version": "1.0.0",
  "dependencies": {
    "simple-oauth2": "^5.0.0"
  }
}
```

4. **vercel.json**:
```json
{
  "functions": {
    "api/auth.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

5. **Deploy to Vercel**:
   - Push to GitHub
   - Import in Vercel
   - Add environment variables:
     - `OAUTH_CLIENT_ID`
     - `OAUTH_CLIENT_SECRET`

6. **Update your Nextonnect config** with the Vercel URL

---

## OR Use This Simpler Approach:

**Deploy using this template** (1-click):

1. Go to: https://vercel.com/new/clone?repository-url=https://github.com/vencax/netlify-cms-github-oauth-provider
2. Set environment variables
3. Deploy
4. Done!

---

## For Now: Test Locally

Since `local_backend: true` is enabled, you can test the CMS locally without OAuth:

```bash
cd nextonnect-website
npm run dev          # Terminal 1
npx decap-server     # Terminal 2
```

Then visit: `http://localhost:3000/admin/`

No OAuth needed for local development! ✅
