# Deploy OAuth Provider to Vercel - Step by Step

## Your Credentials
- **Client ID**: `Ov23liB3DvQ4O1OsSkCR`
- **Client Secret**: `040673894a82ba82373b33c1428c23e888d7f92a`
- **Your Site**: `claude-nextonnect-website-build-011szkmzv7npggzxrusf6gxc.d1nz4xwmcbtc3p.amplifyapp.com`

---

## Quick Deploy (Recommended)

### Step 1: Deploy Using Template

1. **Click this link**: https://vercel.com/new/clone?repository-url=https://github.com/vencax/netlify-cms-github-oauth-provider

2. **Login to Vercel** (use GitHub account)

3. **Create Git Repository**:
   - Name it: `nextonnect-oauth-provider`
   - Keep it private
   - Click "Create"

4. **Configure Project**:
   - Click "Deploy" (don't add env vars yet)

5. **After deployment completes**:
   - Go to project settings → Environment Variables
   - Add these variables:

   ```
   OAUTH_CLIENT_ID=Ov23liB3DvQ4O1OsSkCR
   OAUTH_CLIENT_SECRET=040673894a82ba82373b33c1428c23e888d7f92a
   ORIGINS=claude-nextonnect-website-build-011szkmzv7npggzxrusf6gxc.d1nz4xwmcbtc3p.amplifyapp.com
   GIT_HOSTNAME=https://github.com
   ```

6. **Redeploy**:
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

7. **Copy your Vercel URL**:
   - Example: `https://nextonnect-oauth-provider.vercel.app`
   - **Save this!**

---

### Step 2: Update GitHub OAuth App

1. **Go to GitHub**: Settings → Developer settings → OAuth Apps
2. **Click your app** (Nextonnect CMS)
3. **Update these fields**:
   - **Homepage URL**: `https://claude-nextonnect-website-build-011szkmzv7npggzxrusf6gxc.d1nz4xwmcbtc3p.amplifyapp.com`
   - **Authorization callback URL**: `https://YOUR-VERCEL-URL.vercel.app/callback`
     (Replace YOUR-VERCEL-URL with your actual Vercel deployment URL)
4. **Save changes**

---

### Step 3: Update Nextonnect CMS Config

Update `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: MaazHussaini99/safety
  branch: claude/nextonnect-website-build-011sZkmZv7nPGgZXruSF6gXc
  base_url: https://YOUR-VERCEL-URL.vercel.app  # Your Vercel OAuth provider URL
```

Commit and push:
```bash
git add public/admin/config.yml
git commit -m "Add OAuth provider URL"
git push
```

---

### Step 4: Test It!

1. Wait for AWS Amplify to rebuild (2-3 minutes)

2. Visit your site: `https://claude-nextonnect-website-build-011szkmzv7npggzxrusf6gxc.d1nz4xwmcbtc3p.amplifyapp.com/admin/`

3. Click **"Login with GitHub"**

4. Authorize the app

5. You're in! 🎉

---

## Troubleshooting

### "404 Not Found" on auth
- Check environment variables are set correctly in Vercel
- Make sure you redeployed after adding env vars

### "Unauthorized" error
- Verify GitHub OAuth callback URL matches your Vercel URL + `/callback`
- Check Client ID and Secret are correct

### CMS loads but can't login
- Check `base_url` in config.yml is correct
- Ensure no trailing slash in base_url

---

## Security Note

⚠️ **Never commit real credentials to Git!**

The `.env.vercel.example` file I created is just for reference. The actual environment variables should **only** be set in Vercel's dashboard.

---

## Your URLs Summary

- **CMS Admin**: `https://claude-nextonnect-website-build-011szkmzv7npggzxrusf6gxc.d1nz4xwmcbtc3p.amplifyapp.com/admin/`
- **OAuth Provider**: `https://YOUR-VERCEL-URL.vercel.app` (you'll get this after deploying)
- **GitHub OAuth App**: https://github.com/settings/developers
