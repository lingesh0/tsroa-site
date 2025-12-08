# 🚀 Deployment Guide

## தமிழ் மாநில வருவாய்த் துறை அலுவலர் சங்கம்

---

## Prerequisites

✅ Project built and tested locally  
✅ Firebase project created  
✅ All environment variables configured  
✅ Logo added  
✅ Sample data added to Firestore  

---

## Option 1: Firebase Hosting (Recommended) ⭐

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase (First Time Only)

```bash
firebase init
```

Select:
- ✅ Hosting
- ✅ Firestore
- ✅ Storage

Choose:
- Use existing project → Select your TSROA project
- Public directory: `dist`
- Single-page app: `Yes`
- Automatic builds: `No`

### Step 4: Build the Project

```bash
npm run build
```

### Step 5: Deploy

```bash
firebase deploy
```

Your site will be live at: `https://your-project-id.web.app`

### Step 6: Deploy Only Hosting (Future Updates)

```bash
npm run build
firebase deploy --only hosting
```

### Step 7: Custom Domain (Optional)

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the instructions to add DNS records
4. Wait for SSL certificate (can take 24 hours)

Example: `www.tsroa-namakkal.org`

---

## Option 2: Vercel 🔺

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
vercel
```

Follow the prompts:
- Set up project: `Yes`
- Project name: `tsroa-namakkal`
- Directory: `./`
- Override settings: `No`

### Step 4: Add Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add all `VITE_*` variables from your `.env` file

### Step 5: Redeploy

```bash
vercel --prod
```

Your site will be live at: `https://tsroa-namakkal.vercel.app`

---

## Option 3: Netlify 🎯

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login

```bash
netlify login
```

### Step 3: Initialize

```bash
netlify init
```

### Step 4: Configure Build Settings

- Build command: `npm run build`
- Publish directory: `dist`

### Step 5: Add Environment Variables

```bash
netlify env:set VITE_FIREBASE_API_KEY "your_value"
netlify env:set VITE_FIREBASE_AUTH_DOMAIN "your_value"
# ... add all other variables
```

### Step 6: Deploy

```bash
netlify deploy --prod
```

Your site will be live at: `https://your-site-name.netlify.app`

---

## Post-Deployment Checklist

### 1. Update Firebase Authorized Domains

1. Go to Firebase Console → Authentication → Settings
2. Add your deployment domain to "Authorized domains"
   - Example: `tsroa-namakkal.web.app`
   - Example: `www.tsroa-namakkal.org`

### 2. Test All Features

- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] About page displays leadership
- [ ] Events page shows data from Firestore
- [ ] Announcements page works
- [ ] Gallery displays images
- [ ] Contact page map loads
- [ ] Membership form submits successfully
- [ ] Admin login works
- [ ] Admin can approve/reject applications
- [ ] Mobile responsive on all pages

### 3. Update Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### 4. Update Storage Rules

```bash
firebase deploy --only storage
```

### 5. Monitor Performance

- Go to Firebase Console → Performance
- Enable Performance Monitoring
- Add monitoring script if needed

---

## Continuous Deployment (Auto-Deploy on Git Push)

### GitHub + Firebase Hosting

1. Create `.github/workflows/firebase-hosting.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

### GitHub + Vercel

1. Connect repository in Vercel dashboard
2. Auto-deploys on every push to main

### GitHub + Netlify

1. Connect repository in Netlify dashboard
2. Auto-deploys on every push to main

---

## Environment Variables for Production

Make sure these are set in your hosting platform:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef
```

---

## SSL/HTTPS

All platforms provide free SSL certificates:
- ✅ Firebase Hosting: Automatic
- ✅ Vercel: Automatic
- ✅ Netlify: Automatic

---

## Performance Optimization

### 1. Enable Compression

Already configured in `firebase.json`

### 2. Image Optimization

Compress images before uploading to Storage:
- Use: [TinyPNG](https://tinypng.com)
- Or: [Squoosh](https://squoosh.app)

### 3. Lazy Loading

Already implemented with React lazy loading

### 4. CDN

Firebase Hosting, Vercel, and Netlify all use global CDNs automatically

---

## Monitoring & Analytics

### Google Analytics (Optional)

1. Create GA4 property
2. Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Firebase Analytics

Already enabled with Firebase SDK

---

## Backup & Recovery

### Firestore Backup

```bash
gcloud firestore export gs://your-bucket/backups/$(date +%Y%m%d)
```

### Code Backup

Always push to GitHub:

```bash
git add .
git commit -m "Update"
git push origin main
```

---

## Troubleshooting

### Build fails

```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Firebase deploy fails

```bash
firebase logout
firebase login
firebase use --add
firebase deploy
```

### Environment variables not working

Make sure they start with `VITE_` prefix

---

## Support

For deployment issues:
- Firebase: [Firebase Support](https://firebase.google.com/support)
- Vercel: [Vercel Support](https://vercel.com/support)
- Netlify: [Netlify Support](https://netlify.com/support)

---

## Final Steps

1. ✅ Test on multiple devices
2. ✅ Test on different browsers
3. ✅ Share link with association members
4. ✅ Create admin accounts for other officers
5. ✅ Train admins on using the dashboard
6. ✅ Add sample events and announcements
7. ✅ Upload gallery images

---

**🎉 Congratulations! Your website is now live! 🎉**

Share: `https://your-domain.com`

---

Built with ❤️ for TSROA Namakkal by **Xeve Tech**
