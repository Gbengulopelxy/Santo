# Deployment Guide - Vercel

Complete guide for deploying the Strategic Business Consulting landing page to Vercel.

## Prerequisites

- ✅ Next.js project configured
- ✅ All dependencies installed
- ✅ Environment variables documented
- ✅ Build script working locally

## Step 1: Prepare Your Repository

### Initialize Git (if not already done)

```bash
# Check if git is initialized
git status

# If not, initialize git
git init
git add .
git commit -m "Initial commit: Strategic Business Consulting landing page"
```

### Push to GitHub/GitLab/Bitbucket

```bash
# Create a new repository on GitHub/GitLab/Bitbucket
# Then connect your local repository

git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

## Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub, GitLab, or Bitbucket
3. Verify your email address

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Import Project**
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js

2. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

3. **Environment Variables**
   Click "Environment Variables" and add:

   ```env
   # Email Service (Resend)
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
   FROM_EMAIL=noreply@yourdomain.com
   TO_EMAIL=admin@yourdomain.com

   # Analytics
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://your-endpoint.com/track

   # Calendly
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/consultation
   ```

   **Important**: Add these for all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name? **strategic-consulting** (or your choice)
   - Directory? **./**
   - Override settings? **No**

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

## Step 4: Configure Custom Domain

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `strategicconsulting.com`)

2. **Configure DNS**
   Vercel will provide DNS records to add:

   **For Root Domain:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For WWW Subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - Wait for DNS propagation (can take up to 48 hours)
   - SSL will be active once DNS is verified

## Step 5: Post-Deployment Checklist

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] Navigation menu works (desktop & mobile)
- [ ] Smooth scroll to sections works
- [ ] Contact form submits successfully
- [ ] Email notifications are received
- [ ] Cookie consent banner appears
- [ ] Calendly widget loads and works
- [ ] Video background plays
- [ ] All images load correctly
- [ ] Animations work smoothly

### Performance Tests
- [ ] Run Lighthouse audit (target: 90+)
- [ ] Test on PageSpeed Insights
- [ ] Check Core Web Vitals
- [ ] Verify image optimization
- [ ] Check font loading

### Responsive Tests
- [ ] Test on mobile (320px - 767px)
- [ ] Test on tablet (768px - 1023px)
- [ ] Test on desktop (1024px+)
- [ ] Test on large desktop (1440px+)
- [ ] Check all breakpoints

### Browser Tests
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### SEO Tests
- [ ] Verify meta tags
- [ ] Check structured data
- [ ] Test Open Graph tags
- [ ] Verify sitemap
- [ ] Check robots.txt

## Step 6: Set Up Monitoring

### Vercel Analytics (Optional)
1. Go to Project Settings → Analytics
2. Enable Vercel Analytics
3. View real-time analytics

### Error Tracking (Recommended)
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Datadog for monitoring

## Step 7: Continuous Deployment

### Automatic Deployments
Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Deployment Settings
1. Go to Project Settings → Git
2. Configure:
   - Production Branch: `main`
   - Preview Deployments: Enabled
   - Automatic Deployments: Enabled

## Troubleshooting

### Build Fails

**Error**: Module not found
```bash
# Solution: Ensure all dependencies are in package.json
npm install
```

**Error**: TypeScript errors
```bash
# Solution: Fix TypeScript errors locally first
npm run build
```

**Error**: Environment variables missing
```bash
# Solution: Add all required env vars in Vercel dashboard
```

### Email Not Sending

**Check:**
1. Resend API key is correct
2. Domain is verified in Resend
3. FROM_EMAIL matches verified domain
4. Check Resend dashboard for errors

### Analytics Not Tracking

**Check:**
1. NEXT_PUBLIC_GA_ID is correct
2. Analytics script is loading (check browser console)
3. No ad blockers interfering

### Calendly Not Loading

**Check:**
1. NEXT_PUBLIC_CALENDLY_URL is correct
2. Calendly script is loading
3. No CORS issues

### Images Not Loading

**Check:**
1. Images are in `public/` directory
2. Image paths are correct
3. Next.js Image component is used

## Environment Variables Reference

### Required for Production

```env
# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=admin@yourdomain.com
```

### Optional

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://your-endpoint.com/track

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/consultation
```

## Vercel CLI Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>

# View project info
vercel inspect
```

## Performance Optimization

### Vercel Optimizations
- ✅ Automatic image optimization
- ✅ Automatic font optimization
- ✅ Edge caching
- ✅ CDN distribution
- ✅ Serverless functions

### Additional Optimizations
- Use Vercel Analytics
- Enable Edge Functions for API routes
- Configure caching headers
- Use ISR (Incremental Static Regeneration) where applicable

## Security Checklist

- [ ] Environment variables are secure
- [ ] API keys are not exposed
- [ ] HTTPS is enabled (automatic)
- [ ] Security headers are configured
- [ ] CORS is properly configured
- [ ] Rate limiting on API routes (if needed)

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support

## Quick Deploy Command

```bash
# One-command deployment (after initial setup)
vercel --prod
```

Your site will be live at: `https://your-project.vercel.app`

## Next Steps After Deployment

1. ✅ Test all functionality
2. ✅ Set up custom domain
3. ✅ Configure analytics
4. ✅ Set up monitoring
5. ✅ Add sitemap and robots.txt
6. ✅ Submit to search engines
7. ✅ Set up backups
8. ✅ Document deployment process

---

**Your landing page is now live! 🚀**


