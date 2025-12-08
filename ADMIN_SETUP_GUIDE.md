# 🔐 ADMIN ACCESS SETUP GUIDE

The Firebase permission error means your user account doesn't have the `admin: true` custom claim. Follow these steps to gain admin access.

## ✅ STEP 1: Get Your User UID

1. **Log in** to your app at http://localhost:5174/login
2. Open **Chrome DevTools** → **Console** tab
3. Paste this command:
```javascript
import { auth } from './src/firebase';
console.log("Your UID:", auth.currentUser?.uid);
```
4. **Copy the UID** that appears in console

---

## ✅ STEP 2: Set Admin Claim (Choose ONE Method)

### **Method A: Firebase Console (Easiest - No coding required)**

1. Go to [Firebase Console](https://console.firebase.google.com/project/tsroa-2a5b1/authentication/users)
2. Click **Authentication** → **Users** tab
3. Find your user email in the list
4. Click on it to open user details
5. Scroll down to **Custom Claims**
6. Add this JSON:
```json
{
  "admin": true
}
```
7. Click **Save**
8. **Log out and log back in** from your app

---

### **Method B: Firebase CLI (PowerShell)**

Run this command in your terminal (replace `YOUR_UID_HERE`):

```powershell
cd d:\tsroa
firebase functions:config:get > .runtimeconfig.json
```

Then create this file: `set-admin.ps1`

```powershell
# Install Firebase Admin SDK
npm install -g firebase-tools

# Use Firebase CLI to set custom claim
firebase auth:import --hash-algo=scrypt --hash-key=yourkey --hash-rounds=8 --hash-memory-cost=14 --csv users.csv

# OR use Node.js script below (Method C)
```

---

### **Method C: Node.js Script (If you have Node installed)**

Create file: `d:\tsroa\setAdmin.js`

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./tsroa-2a5b1-firebase-adminsdk-xxxx.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = 'YOUR_UID_HERE'; // Replace with your actual UID

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('✅ Admin claim set for UID:', uid);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
```

Run:
```powershell
node d:\tsroa\setAdmin.js
```

---

### **Method D: Google Cloud Console (Most Official)**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project: **tsroa-2a5b1**
3. Go to **Cloud Functions**
4. Create a new function:
   - Name: `setAdminClaim`
   - Runtime: Node.js 18
   - Trigger: HTTPS
   - Paste this code:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.setAdminClaim = functions.https.onRequest(async (req, res) => {
  const { uid } = req.body;
  
  if (!uid) {
    return res.status(400).send({ error: 'UID required' });
  }
  
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.send({ success: true, message: `Admin claim set for ${uid}` });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
```

5. Deploy and call the function with your UID

---

## ✅ STEP 3: Verify Admin Access

1. **Log out** of the app completely
2. **Log back in** with the same email
3. Navigate to **Admin** page
4. If you see the table with applications → ✅ **Success!**

---

## 🛑 TROUBLESHOOTING

**Still getting "permission-denied" error?**

1. ✅ Clear browser cache: `Ctrl+Shift+Delete`
2. ✅ Hard refresh: `Ctrl+F5`
3. ✅ Check console for UID (make sure it's correct)
4. ✅ Wait 2-3 minutes after setting claim (Firebase takes time to sync)
5. ✅ Log out completely, close browser, log back in

**Can't find your user in Firebase Console?**
- Make sure you created account via the Login page
- Check if the email exists under Authentication → Users

---

## 📝 Your Firebase Project Details

- **Project ID**: tsroa-2a5b1
- **Auth Domain**: tsroa-2a5b1.firebaseapp.com
- **Firestore**: cloud.firestore
- **Admin Pages**: `/admin`

---

## 🔑 Remember:

- **Never share your UID publicly**
- Admin claims give full access to membershipApplications
- Only set admin=true for trusted accounts
