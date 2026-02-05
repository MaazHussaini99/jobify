## Quick Setup Guide: Decap CMS on AWS Amplify

Your CMS is already deployed at:
```
https://your-amplify-url.com/admin/
```

To enable authentication, follow ONE of these options:

---

## Option 1: Free OAuth Provider (Easiest - 5 minutes)

Use this free service to handle GitHub OAuth for static sites:

### Step 1: Create GitHub OAuth App

1. Go to **GitHub Settings** → **Developer settings** → **OAuth Apps**
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `Nextonnect CMS`
   - **Homepage URL**: `https://claude-nextonnect-website-build-011szkmzv7npggzxrusf6gxc.d1nz4xwmcbtc3p.amplifyapp.com`
   - **Authorization callback URL**: `https://decap-oauth-provider.vercel.app/callback`
4. Click **"Register application"**
5. **Save** the Client ID and generate a **Client Secret** (save it!)

### Step 2: Deploy Free OAuth Provider

1. Go to: **https://github.com/markjaquith/netlify-cms-github-oauth-provider**
2. Click **"Deploy to Vercel"** button (free tier works)
3. Set environment variables:
   - `OAUTH_CLIENT_ID`: Your GitHub Client ID
   - `OAUTH_CLIENT_SECRET`: Your GitHub Client Secret
4. Deploy and copy the Vercel URL (e.g., `https://your-oauth.vercel.app`)

### Step 3: Update CMS Config

Update `public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: MaazHussaini99/safety
  branch: claude/nextonnect-website-build-011sZkmZv7nPGgZXruSF6gXc
  base_url: https://your-oauth.vercel.app  # Your Vercel OAuth provider URL
```

Commit, push, and you're done! ✅

---

## Option 2: AWS Lambda OAuth (More Complex)

If you prefer keeping everything in AWS:

### Create Lambda Function

1. Go to **AWS Lambda Console**
2. Create new function (Node.js runtime)
3. Add this code: [Full code in CMS_SETUP.md]
4. Create API Gateway endpoint
5. Update CMS config with Lambda URL

---

## Option 3: Test Locally Only

For development without OAuth:

1. Edit `public/admin/config.yml`:
```yaml
local_backend: true
```

2. Run development:
```bash
npm run dev
npx decap-server  # In separate terminal
```

3. Access CMS at `http://localhost:3000/admin/`

---

## What Happens After Setup

1. Visit `/admin/` on your live site
2. Click **"Login with GitHub"**
3. Authorize the app
4. Edit content in visual editor
5. Click **"Publish"** → Automatically commits to Git
6. AWS Amplify rebuilds → Changes go live!

---

## Currently Deployed

✅ CMS Admin UI at `/admin/`
✅ All content collections configured
✅ Markdown-based storage in Git
⏳ Needs OAuth setup to login (follow Option 1 above)

---

## Quick Start (Recommended)

**I recommend Option 1** - it's free, takes 5 minutes, and works perfectly with static sites!

After setup, you can:
- Edit all content visually
- Upload images
- Preview changes before publishing
- Auto-deploy to Amplify on save
