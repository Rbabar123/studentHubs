# Deploying Student Hub to Vercel

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

Before deploying, you'll need to set up these environment variables in your Vercel project:

### Required Environment Variables:
- `DATABASE_URL` - Your PostgreSQL database connection string
- `OPENWEATHER_API_KEY` - Your OpenWeather API key

### Optional Environment Variables (for Replit Auth, if you want to re-enable it later):
- `SESSION_SECRET` - A secure random string for session encryption
- `REPL_ID` - Your Replit application ID
- `REPLIT_DOMAINS` - Comma-separated list of your domains

## Deployment Steps

### 1. Push Code to Git Repository
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Select your repository from the list

### 3. Configure Project Settings
1. **Framework Preset**: Select "Other"
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist/public`
4. **Install Command**: `npm install`

### 4. Set Environment Variables
1. In your Vercel project dashboard, go to "Settings" → "Environment Variables"
2. Add each required environment variable:
   - Variable Name: `DATABASE_URL`
   - Value: Your PostgreSQL connection string
   - Environment: Production, Preview, Development
   
   - Variable Name: `OPENWEATHER_API_KEY`
   - Value: Your OpenWeather API key
   - Environment: Production, Preview, Development

### 5. Deploy
1. Click "Deploy" button
2. Wait for the build and deployment to complete
3. Your app will be available at: `https://your-project-name.vercel.app`

## Database Setup

### Option 1: Use Neon (Recommended)
1. Sign up at https://neon.tech
2. Create a new project
3. Copy the connection string
4. Add it as `DATABASE_URL` in Vercel environment variables

### Option 2: Use Vercel Postgres
1. In your Vercel project, go to "Storage"
2. Create a new Postgres database
3. The `DATABASE_URL` will be automatically added to your environment variables

## Post-Deployment

1. Run database migrations (if needed):
```bash
npx drizzle-kit push
```

2. Test your deployed application:
   - Visit your Vercel URL
   - Try entering different school names
   - Test the weather functionality
   - Check Maps integration

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check build logs in Vercel dashboard
2. **Database Connection**: Verify `DATABASE_URL` is correct
3. **Weather Not Working**: Confirm `OPENWEATHER_API_KEY` is set
4. **404 on API Routes**: Check that `vercel.json` is in the root directory

### Debug Steps:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set
3. Test API endpoints directly: `https://your-app.vercel.app/api/weather/Manila`

## File Structure for Vercel

Your project should have this structure:
```
/
├── api/
│   └── index.js          # Vercel serverless function
├── client/               # Frontend React app
├── server/               # Backend Express routes
├── shared/               # Shared schemas
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies
```

## Custom Domain (Optional)

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Configure DNS settings as instructed
4. SSL certificate will be automatically generated

Your Student Hub will be live and accessible worldwide!