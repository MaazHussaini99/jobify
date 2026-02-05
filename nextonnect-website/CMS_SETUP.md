# Nextonnect CMS Setup Guide

This website uses **Decap CMS** (formerly Netlify CMS) - a lightweight, open-source CMS that stores content in your Git repository.

## Features

- ✅ **Open Source & Free** - No costs or subscriptions
- ✅ **Git-Based** - All content stored in your repository as Markdown
- ✅ **Visual Editor** - User-friendly interface for non-technical users
- ✅ **Works with Static Sites** - Perfect for AWS Amplify deployment
- ✅ **No Database Required** - Everything in Git

## Accessing the CMS

The CMS admin panel is available at:
```
https://your-domain.com/admin/
```

Or locally:
```
http://localhost:3000/admin/
```

## Setup for Production (AWS Amplify)

### Option 1: GitHub OAuth (Recommended for Teams)

1. **Create a GitHub OAuth App**:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - Application name: `Nextonnect CMS`
     - Homepage URL: `https://your-amplify-url.com`
     - Authorization callback URL: `https://your-amplify-url.com/admin/`
   - Note the **Client ID** and **Client Secret**

2. **Update Decap CMS Config**:
   - Edit `public/admin/config.yml`
   - Change backend to:
     ```yaml
     backend:
       name: github
       repo: MaazHussaini99/safety
       branch: main
       base_url: https://your-amplify-url.com
       auth_endpoint: /api/auth
     ```

3. **Add GitHub OAuth to Environment**:
   - In AWS Amplify Console, go to Environment Variables
   - Add:
     - `GITHUB_CLIENT_ID`: Your OAuth Client ID
     - `GITHUB_CLIENT_SECRET`: Your OAuth Client Secret

### Option 2: Netlify Identity (Quick Setup)

1. **Deploy to Netlify** (free tier works):
   - Connect your GitHub repo to Netlify
   - Enable Netlify Identity in Netlify Dashboard
   - Enable Git Gateway

2. **Update Config**:
   - `public/admin/config.yml` is already configured for this
   - Login at `/admin/` using Netlify Identity

### Option 3: Local Development Only

For testing locally without authentication:

1. Run the local development server:
   ```bash
   npm run dev
   ```

2. Start Decap CMS in local mode:
   ```bash
   npx decap-server
   ```

3. Access CMS at:
   ```
   http://localhost:3000/admin/
   ```

## Using the CMS

### Managing Content

1. **Login** to `/admin/`
2. **Select a Collection**:
   - Talent Solutions
   - Technology Solutions
   - Compliance Solutions
   - Training & Development

3. **Edit or Create**:
   - Click existing entries to edit
   - Click "New [Collection]" to create
   - Use the rich text editor for content
   - Click "Publish" to save (commits to Git)

### Content Structure

Each entry has:
- **Title**: Page heading
- **Description**: SEO meta description
- **Icon**: Emoji for visual appeal (optional)
- **Order**: Display order (lower = first)
- **Body**: Main content in Markdown

### Publishing Workflow

1. **Edit Content** in CMS
2. **Save/Publish** - Creates a Git commit
3. **AWS Amplify** auto-detects the commit
4. **Automatic Rebuild** - Site updates in 2-5 minutes

## Content Files

All content is stored as Markdown in:
```
content/
├── talent/
├── technology/
├── compliance/
└── training/
```

You can also edit these files directly in your code editor or GitHub!

## Tips

- **Preview Changes**: Use the CMS preview pane before publishing
- **Bulk Edits**: Edit files directly in your code editor for bulk changes
- **Version Control**: All changes are Git commits - easy to revert
- **Media Upload**: Upload images through CMS to `public/images/uploads/`

## Troubleshooting

### Can't login to CMS
- Check GitHub OAuth credentials
- Verify callback URLs match
- Clear browser cache

### Changes not appearing
- Wait 2-5 minutes for Amplify rebuild
- Check Amplify Console for build status

### CMS not loading
- Verify `public/admin/index.html` exists
- Check browser console for errors

## Security

- Admin panel is at `/admin/` (hidden, not linked publicly)
- Authentication via GitHub OAuth
- All users need GitHub access to your repository
- Configure repository permissions carefully

## Support

For issues with Decap CMS, see:
- Documentation: https://decapcms.org/docs/
- GitHub: https://github.com/decaporg/decap-cms
