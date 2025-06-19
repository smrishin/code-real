# Backend API

Express.js backend API for the code-real project.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with your environment variables:

```bash
cp env.template .env
# Edit .env with your actual values
# Note: NODE_ENV=localhost for local development
```

3. Start the development server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Deployment

### Deploy to Vercel

#### Option 1: Using Vercel CLI (Local Deployment)

1. Install Vercel CLI globally:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Create your `.env` file with your secrets:

```bash
cp env.template .env
# Edit .env with your actual API keys and secrets
# NODE_ENV will be automatically set to 'production' for Vercel
```

4. Set up environment variables in Vercel (reads from your .env file):

```bash
cd backend
npm run setup-vercel-env
```

5. Deploy from the backend directory:

```bash
vercel
```

6. For production deployment:

```bash
vercel --prod
```

#### Option 2: Using GitHub Actions (Automated Deployment)

1. Set up Vercel secrets in your GitHub repository:

   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel API token
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID
     - `GEMINI_API_KEY`: Your Gemini API key
     - `QUESTIONS_SECRET_CODE`: Your secret code for questions endpoint

2. Push to main/master branch to trigger automatic deployment

### Getting Vercel Credentials

1. **VERCEL_TOKEN**:

   - Go to https://vercel.com/account/tokens
   - Create a new token

2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**:

   - Run `vercel` locally first
   - Check the `.vercel/project.json` file that gets created
   - Or run `vercel ls` to see your projects

### Environment Variables

The following environment variables are required:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `QUESTIONS_SECRET_CODE`: Secret code for accessing the questions endpoint
- `NODE_ENV`:
  - `localhost` for local development (starts Express server)
  - `production` for Vercel deployment (serverless mode)
- `PORT`: Server port (automatically set by Vercel)

**For Local Development:**

- Create a `.env` file using `cp env.template .env`
- Set `NODE_ENV=localhost` (this starts the Express server)
- Add your actual API keys and secrets

**For Local Deployment to Vercel:**

- Use the same `.env` file with your secrets
- Run `npm run setup-vercel-env` (automatically sets `NODE_ENV=production` for Vercel)

**For GitHub Actions:**

- Store secrets in GitHub repository settings
- The workflow automatically sets `NODE_ENV=production` in Vercel

## API Endpoints

- `GET /api/status` - Health check endpoint
- `POST /api/questions` - Get questions (requires secret code in request body)
