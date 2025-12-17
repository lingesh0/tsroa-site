# தமிழ் மாநில வருவாய்ததுறை அலுவலர் சங்கம் - நாமக்கல் மாவட்டம்

## Tamil Nadu State Revenue Department Officers Association - Namakkal District

A complete, production-ready portfolio website built with React, TypeScript, Tailwind CSS, Framer Motion, and Firebase.

---

## 🎯 Features

- ✅ **Fully Mobile Responsive** - Mobile-first design optimized for all screen sizes (375px - 1920px+)
- ✅ **Complete Tamil Content** - Beautiful Tamil typography with Noto Sans Tamil font
- ✅ **Membership Management** - Firebase-powered application form with real-time submission
- ✅ **Admin Dashboard** - Full CRUD operations (Create, Read, Update, Delete) with CSV/PDF export
- ✅ **News & Events** - Dynamic content display with formatted news cards
- ✅ **Document Management** - 28 downloadable PDFs (government orders, circulars, notifications)
- ✅ **Image Gallery** - Touch-friendly gallery with lightbox modal
- ✅ **Smooth Animations** - Framer Motion transitions for enhanced UX
- ✅ **Production Optimized** - Chunk-split bundles for fast loading (~365 KB gzipped)
- ✅ **Vercel Ready** - Complete deployment configuration included

---

## 🛠️ Tech Stack

- **Frontend:** React 18.2 + Vite 5.0
- **Language:** TypeScript 5.2
- **Styling:** Tailwind CSS 3.4 (JIT mode)
- **Animations:** Framer Motion 10.16
- **Backend:** Firebase v10.7.1
  - Authentication (Email/Password)
  - Firestore Database (Real-time)
  - Cloud Storage
  - Analytics
- **Routing:** React Router DOM v6.20
- **PDF Export:** jsPDF 3.0.4 + jspdf-autotable 5.0.2
- **Font:** Noto Sans Tamil (Google Fonts)
- **Deployment:** Vercel (optimized)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Responsive navigation with hamburger menu
│   ├── Footer.tsx          # Footer with contact info and links
│   └── ProtectedRoute.tsx  # Auth guard for admin routes
├── layouts/
│   └── Layout.tsx          # Main layout wrapper with Navbar/Footer
├── pages/
│   ├── Home.tsx           # Hero section with office building background
│   ├── About.tsx          # About page with leadership info
│   ├── Events.tsx         # News announcements + Events from Firestore
│   ├── Announcements.tsx  # 28 downloadable documents + Firestore announcements
│   ├── Gallery.tsx        # Image gallery (4 images) with lightbox modal
│   ├── Contact.tsx        # Contact information and office address
│   ├── Membership.tsx     # 11-field membership application form
│   ├── Login.tsx          # Firebase email/password authentication
│   └── Admin.tsx          # Admin dashboard with approval workflow & deletion
├── firebase.ts            # Firebase configuration and initialization
├── App.tsx                # Routes and app structure
└── main.tsx               # Application entry point
public/
├── images/
│   ├── tsroa-logo.png     # Circular organization logo
│   ├── office-building.png # Hero background image
│   └── gallery/           # 4 gallery images
├── documents/             # 24 PDF documents
└── new/                   # 4 DocScanner PDFs (recently added)
```

---
│   ├── Contact.tsx        # Contact information & map
│   ├── Membership.tsx     # Tamil membership application form
│   ├── Login.tsx          # Admin login page
│   └── Admin.tsx          # Admin dashboard
├── layouts/
│   └── Layout.tsx         # Main layout wrapper
├── firebase.ts            # Firebase configuration
├── App.tsx                # Main app with routing
└── main.tsx              # Entry point
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)

2. Enable the following services:
   - **Authentication** → Email/Password
   - **Firestore Database** → Create database in production mode
   - **Storage** → Create storage bucket

3. Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Firestore Collections

Create the following collections in Firestore:

#### `membershipApplications`
```json
{
  "fullName": "string",
  "employeeId": "string",
  "email": "string",
  "phone": "string",
  "department": "string",
  "designation": "string",
  "district": "string",
  "officeAddress": "string",
  "homeAddress": "string",
  "status": "pending" | "approved" | "rejected",
  "createdAt": "timestamp"
}
```

#### `events`
```json
{
  "title": "string",
  "description": "string",
  "date": "string",
  "location": "string",
  "imageUrl": "string (optional)",
  "createdAt": "timestamp"
}
```

#### `announcements`
```json
{
  "title": "string",
  "content": "string",
  "date": "string",
  "priority": "high" | "medium" | "low",
  "createdAt": "timestamp"
}
```

### 4. Create Admin User

In Firebase Console → Authentication, manually create an admin user:
- Email: `admin@tsroa-namakkal.org`
- Password: (set a strong password)

### 5. Storage Setup

In Firebase Storage, create a folder called `gallery` for image uploads.

### 6. Add Logo

Place your organization logo as `logo.png` in the `public/` folder.

### 7. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🌐 Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Home | Public |
| `/about` | About | Public |
| `/events` | Events | Public |
| `/announcements` | Announcements | Public |
| `/gallery` | Gallery | Public |
| `/contact` | Contact | Public |
| `/membership` | Membership Form | Public |
| `/login` | Admin Login | Public |
| `/admin` | Admin Dashboard | Protected (Auth Required) |

---

## 📝 Membership Form Fields

### தனிப்பட்ட தகவல்கள் (Personal Information)
- முழுப் பெயர் (Full Name) *
- ஊழியர் ஐடி (Employee ID) *
- மின்னஞ்சல் (Email) *
- மொபைல் எண் (Mobile Number) *

### பணியிடத் தகவல்கள் (Work Information)
- துறை (Department) *
- பதவி (Designation) *
- மாவட்டம் (District) *
- அலுவலக முகவரி (Office Address) *

### இருப்பிடத் தகவல்கள் (Address Information)
- வீட்டு முகவரி (Home Address) *

### Consent Checkbox
நான் தமிழ்நாடு அரசு ஊழியர்கள் சங்கத்தின் விதிமுறைகள் மற்றும் நிபந்தனைகள் மற்றும் தனியுரிமைக் கொள்கை ஆகியவற்றை படித்தும், ஒப்புக்கொள்கிறேன்.

---

## 👨‍💼 Leadership Structure

### முக்கிய பதவியாளர்கள்
- **மாவட்ட தலைவர்:** ரா.சரவணகுமார்
- **மாவட்ட செயலாளர்:** க.சதீஸ்குமார்
- **மாவட்ட பொருளாளர்:** ச.மனோஜ்

(See `About.tsx` for complete leadership list)

---

## 🎨 Design Features

- **Color Scheme:**
  - Primary: Blue (#1e40af)
  - Secondary: Red (#dc2626)
  - Accent: Amber (#f59e0b)
  
- **Typography:**
  - Tamil: Noto Sans Tamil
  - English: System fonts
  
- **Animations:**
  - Page transitions
  - Card hover effects
  - Smooth scroll animations
  - Modal animations

---

## 🔐 Admin Features

### Admin Dashboard (`/admin`)
- View all membership applications
- Filter by status (All, Pending, Approved, Rejected)
- View full application details
- Approve/Reject applications
- Real-time updates from Firestore

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📦 Deployment

### ⚡ Quick Deploy to Vercel (Recommended)

**Production-ready in 5 minutes!**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Visit https://vercel.com/new
   - Click "Continue with GitHub"
   - Select your repository
   - Add environment variables (see `.env.example`)
   - Click "Deploy" 🚀

3. **Your site is live!**
   - URL: `https://<project-name>.vercel.app`
   - Automatic HTTPS & CDN
   - Zero downtime deployments

📖 **Detailed Guide:** See [`VERCEL_DEPLOYMENT.md`](./VERCEL_DEPLOYMENT.md)  
📱 **Mobile Optimization:** See [`MOBILE_RESPONSIVENESS.md`](./MOBILE_RESPONSIVENESS.md)

### Alternative: Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login and initialize:
```bash
firebase login
firebase init hosting
```

3. Build and deploy:
```bash
npm run build
firebase deploy --only hosting
```

### Alternative: Netlify

1. Push to GitHub
2. Connect repository at https://app.netlify.com
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy!

---

## 🔧 Environment Variables

**Required for deployment:**

```env
# Firebase Configuration (Get from Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Setup:**
1. Copy `.env.example` to `.env`
2. Fill in your Firebase credentials
3. For Vercel: Add in Settings → Environment Variables
4. For Netlify: Add in Site Settings → Environment Variables

---

## 📊 Performance Metrics

### Bundle Size (Production Build)
- **Total (gzipped): ~365 KB** ✅ Excellent
- Initial load: < 2 seconds on 4G
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

### Optimization Features
✅ Code splitting by vendor/feature  
✅ Lazy loading for images  
✅ CSS purging (Tailwind JIT)  
✅ Minification & compression  
✅ Tree shaking enabled  
✅ Responsive images  

---

## 📄 License

© 2025 தமிழ் மாநில வருவாய்ததுறை அலுவலர் சங்கம், நாமக்கல் மாவட்டம். All rights reserved.

---

## 👨‍💻 Developed By

**Xeve Tech**

---

## 📞 Support

For technical support or queries, please contact the association admin.

---

## 🙏 Acknowledgments

- Tamil Nadu State Revenue Department
- All association members
- Namakkal District Administration

---

## 📝 Notes

1. Make sure to add your organization logo as `logo.png` in the `public/` folder
2. Update the Google Maps embed URL in `Contact.tsx` with your actual location
3. Create sample data in Firestore for events and announcements
4. Upload sample images to Storage/gallery for the gallery page
5. Test the membership form submission before going live
6. Set up proper Firestore security rules in production

---

**Built with ❤️ for Tamil Nadu State Revenue Department Officers Association, Namakkal District**
